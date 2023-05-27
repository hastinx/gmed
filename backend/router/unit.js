const router = require('express').Router()
const { c_unit } = require('../controller')

router.post('/unit/defaultUnit', c_unit.addDefaultUnit)
router.post('/unit/conversionUnit', c_unit.addConversionUnit)
router.post('/unit/updateDefaultUnit', c_unit.updateDefaultUnit)
router.post('/unit/updateConversionUnit', c_unit.updateConversionUnit)
router.get('/unit/defaultUnit', c_unit.getDefaultUnit)
router.get('/unit/conversionUnit', c_unit.getConversionUnit)
router.get('/unit/defaultUnit/:id', c_unit.getDefaultUnitById)
router.get('/unit/conversionUnit/:id', c_unit.getConversionUnitById)

module.exports = router