'use strict'

const tape = require('tape')
const airrohr = require('./index')
const isNumber = require('lodash.isnumber')

tape('airrohr-prediction', (t) => {
	airrohr(1438)
	.then((res) => {
		t.plan(10)
		t.ok(isNumber(res.PM10.upper) && res.PM10.upper !== 0, 'PM10 upper')
		t.ok(isNumber(res.PM10.lower) && res.PM10.lower !== 0, 'PM10 lower')
		t.ok(isNumber(res.PM10.expected) && res.PM10.expected !== 0, 'PM10 expected')
		t.ok(res.PM10.upper >= res.PM10.expected ,'PM10 upper >= expected')
		t.ok(res.PM10.expected >= res.PM10.lower ,'PM10 expected >= lower')
		t.ok(isNumber(res['PM2.5'].upper) && res['PM2.5'].upper !== 0, 'PM2.5 upper')
		t.ok(isNumber(res['PM2.5'].lower) && res['PM2.5'].lower !== 0, 'PM2.5 lower')
		t.ok(isNumber(res['PM2.5'].expected) && res['PM2.5'].expected !== 0, 'PM2.5 expected')
		t.ok(res['PM2.5'].upper >= res['PM2.5'].expected ,'PM2.5 upper >= expected')
		t.ok(res['PM2.5'].expected >= res['PM2.5'].lower ,'PM2.5 expected >= lower')
	})
})
