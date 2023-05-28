const db = require('../config/db.js');
const { countConversionQty } = require('../helper/index..js');
const dbPromise = db.promise();
// const helper = require('../helper')

module.exports = {
    addDefaultUnit: async (req, res) => {
        try {
            const { unit } = req.body
            const [data] = await dbPromise.query(`SELECT * FROM default_unit`);
            if (data.length > 0) return res.status(400).json({ status: 'failed', message: 'Unit already exist' })
            await dbPromise.query(`INSERT INTO default_unit (default_unit) VALUES ('${unit}')`)
            return res.status(200).json({ status: 'success', message: 'add unit successfully' })
        } catch (error) {
            res.status(400).json({ status: 'failed' })
        }
    },
    addConversionUnit: async (req, res) => {
        try {
            const { unit } = req.body
            const [data] = await dbPromise.query(`SELECT * FROM conversion_unit`);
            if (data.length > 0) return res.status(400).json({ status: 'failed', message: 'Unit already exist' })
            await dbPromise.query(`INSERT INTO conversion_unit (conversion_unit) VALUES ('${unit}')`)
            res.status(200).json({ status: 'success', message: 'add unit successfully' })
        } catch (error) {
            res.status(400).json({ status: 'failed' })
        }
    },
    getDefaultUnit: async (req, res) => {
        try {
            const [data] = await dbPromise.query(`SELECT * FROM default_unit`);
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data: data[0] })
            } else {
                return res.status(400).json({ status: 'failed', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    getConversionUnit: async (req, res) => {
        try {
            const [data] = await dbPromise.query(`SELECT * FROM conversion_unit`);
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data: data[0] })
            } else {
                return res.status(400).json({ status: 'failed', message: 'data not found', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    getDefaultUnitById: async (req, res) => {
        let id = req.params.id
        try {
            const [data] = await dbPromise.query(`SELECT * FROM default_unit WHERE id=${id}`);
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data: data[0] })
            } else {
                return res.status(400).json({ status: 'failed', message: 'data not found', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    getConversionUnitById: async (req, res) => {
        let id = req.params.id
        try {
            const [data] = await dbPromise.query(`SELECT * FROM conversion_unit WHERE id=${id}`);
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data: data[0] })
            } else {
                return res.status(400).json({ status: 'failed', message: 'data not found', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    updateDefaultUnit: async (req, res) => {
        let id = req.params.id
        const { unit } = req.body
        try {
            await dbPromise.query(`UPDATE default_unit SET default_unit='${unit}' WHERE id=${id}`);
            return res.status(200).json({ status: 'success', message: 'update unit successfully' })
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    updateConversionUnit: async (req, res) => {
        let id = req.params.id
        const { unit } = req.body
        try {
            await dbPromise.query(`UPDATE default_unit SET conversion_unit='${unit}' WHERE id=${id}`);
            return res.status(200).json({ status: 'success', message: 'update unit successfully' })
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    },
    addProductUnit: async (req, res) => {
        const { product, defaultUnitQty, defaultUnit, convertionUnitQty, conversionUnit } = req.body
        try {
            const [data] = await dbPromise.query(`SELECT * FROM stock`);
            if (data.length > 0) {
                return res.status(400).json({ status: 'failed', message: 'Product already in stock' })
            }

            let qty = countConversionQty(convertionUnitQty, defaultUnitQty)

            await dbPromise.query(`INSERT INTO stock (product_id, default_unit_id, default_unit_qty, conversion_unit_id, conversion_unit_qty, qty) vALUES (${product},${defaultUnit},${defaultUnitQty},${conversionUnit},${convertionUnitQty},${qty})`)

            return res.status(200).json({ status: 'success', message: 'add product unit successfully' })
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    }
}