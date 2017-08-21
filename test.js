'use strict'

const tape = require('tape')
const airrohr = require('./index')
const isNumber = require('lodash.isnumber')

tape('airrohr-prediction', (t) => {
	airrohr(1438)
	.then((res) => {
		t.plan(2)
		t.ok(isNumber(res.PM10) && res.PM10 !== 0, 'PM10')
		t.ok(isNumber(res['PM2.5']) && res['PM2.5'] !== 0, 'PM2.5')
	})
})
