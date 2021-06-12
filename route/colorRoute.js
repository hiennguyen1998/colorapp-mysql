const express = require('express')
const colorCtrl = require('./../controller/colorCtrl.js')
const router = express.Router()

router.route('/').get(colorCtrl.getColorName)

module.exports = router