'use strict';

const express = require('express'),
    router = express.Router();
    

router.get('/fetchData/:id',require('./getData'))
router.post('/submitData',require('./saveData'))



module.exports = router;