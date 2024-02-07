const express = require('express');
const router = express.Router();
const { handleOsInfoEndpoint, handleCurrencyExchangeRate } = require('./routeHandlers');

router.get('/osinfo', handleOsInfoEndpoint);
router.get('/exchange/:pair', handleCurrencyExchangeRate);

module.exports = router;