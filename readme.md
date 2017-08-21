# airrohr-prediction

Predicts the next observation made by a given [airrohr sensor](https://luftdaten.info) using the lower bound of the [prediction interval](https://en.wikipedia.org/wiki/Prediction_interval#Unknown_mean.2C_unknown_variance) in order to provide a more robust threshold monitoring, e. g. in [feinstaub-bot](https://github.com/juliuste/feinstaub-bot). *Work in progress.*

[![npm version](https://img.shields.io/npm/v/airrohr-prediction.svg)](https://www.npmjs.com/package/airrohr-prediction)
[![Build Status](https://travis-ci.org/juliuste/airrohr-prediction.svg?branch=master)](https://travis-ci.org/juliuste/airrohr-prediction)
[![dependency status](https://img.shields.io/david/juliuste/airrohr-prediction.svg)](https://david-dm.org/juliuste/airrohr-prediction)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/airrohr-prediction.svg)](https://david-dm.org/juliuste/airrohr-prediction#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/airrohr-prediction.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save airrohr-prediction
```

## Usage

```js
const prediction = require('airrohr-prediction')

prediction(1438) // sensor ID
.then(…)
```

Returns a `Promise` that will resolve in something like this:

```json
{
    "PM10": 2.754918127006258,
    "PM2.5": 2.241109620013921
}
```

## See also

- [feinstaub-bot](https://github.com/juliuste/feinstaub-bot) -  Twitter bot that monitors fine dust pollution for a given site or area via airrohr sensors.

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/airrohr-prediction/issues).
