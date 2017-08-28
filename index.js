'use strict'

const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const round = require('lodash.round')
const statistics = require('statistics')
const distributions = require('distributions')

const main = (id) =>
    fetch(`https://api.luftdaten.info/grafana/api/datasources/proxy/3/query?db=feinstaub&q=SELECT mean("sds011_p1") AS "PM10", mean("sds011_p2") AS "PM2.5", count("sds011_p1") AS "M", count("sds011_p2") AS "N" FROM "feinstaub" WHERE "type" = 'sds011' AND "node" = '${+id}' AND time > now() - 30m GROUP BY time(5m) fill(null)&epoch=ms`)
    .then((res) => res.json())
    .then((res) => res.results[0].series[0].values)
    .then((res) => res.filter((x) => x[3] > 0 && x[4] > 0))
    .then((res) => ({
        pm10: res.map((x) => x[1]).reduce(statistics),
        pm25: res.map((x) => x[2]).reduce(statistics)
    }))
    .then((res) => {
        if(round(res.pm10.stdev, 2) === 0 || round(res.pm25.stdev, 2) === 0) throw new Error('deviation = 0, suspicious')
        return res
    })
    .then((res) => {
        const dist10 = distributions.Studentt(res.pm10.count - 1)
        const dist25 = distributions.Studentt(res.pm25.count - 1)
        return ({
            'PM10': {
                'lower': (res.pm10.mean - dist10.inv(0.8) * res.pm10.stdev * Math.sqrt(1 + (1 / res.pm10.count))),
                'upper': (res.pm10.mean + dist10.inv(0.8) * res.pm10.stdev * Math.sqrt(1 + (1 / res.pm10.count))),
                'expected': res.pm10.mean
            },
            'PM2.5': {
                'lower': (res.pm25.mean - dist25.inv(0.8) * res.pm25.stdev * Math.sqrt(1 + (1 / res.pm25.count))),
                'upper': (res.pm25.mean + dist25.inv(0.8) * res.pm25.stdev * Math.sqrt(1 + (1 / res.pm25.count))),
                'expected': res.pm25.mean
            }
        })
    })
    .catch((res) => {throw new Error(`error at sensor ${id}`)})

module.exports = main
