const express = require('express');
const router = express.Router();

// root index for all api filex
router.use('/v1',require('./v1'));
module.exports = router;