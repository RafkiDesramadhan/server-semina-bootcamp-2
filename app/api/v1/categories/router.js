const express = require('express')
const { create, index, find, update } = require('./controller')
const router = express()

router.get('/categories', index)
router.get('/categories/:id', find)
router.put('/categories/:id', update)

router.post('/categories', create)

module.exports = router;