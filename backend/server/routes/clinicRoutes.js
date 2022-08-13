const express = require('express')
const router = express.Router()
const { getClinic, addClinic, modifyClinic, deleteClinic } = require('../controllers/clinicController')

router.route('/').get(getClinic).post(addClinic)
router.route('/:id').delete(deleteClinic).put(modifyClinic)


module.exports = router