const express = require('express')
const router = express.Router()
const { getClinic, addClinic, modifyClinic, modifyClinicProps, deleteClinic } = require('../controllers/userController')

/*
    router.get('/', getClinic)
    router.post('/', addClinic)
    router.put('/:id', modifyClinic)
    router.patch('/:id', modifyClinic)
    router.delete('/:id', deleteClinic)
*/

router.route('/').get(getClinic).post(addClinic)
router.route('/:id').delete(deleteClinic).put(modifyClinic).patch(modifyClinicProps)


module.exports = router