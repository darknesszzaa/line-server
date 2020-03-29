const { account } = require('../controllers/account');
let express = require('express');
let router = express.Router();

router.post('/account', account);

module.exports = router;
