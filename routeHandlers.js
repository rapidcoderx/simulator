// routeHandlers.js
const axios = require('axios');
require('dotenv').config();

// Constants for messages
const HEADER_LOG_MESSAGE = 'Incoming request headers:';
const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}`;
const RATES_ERROR_MESSAGE = 'Exchange rate data is not available.';
const FETCHING_ERROR_MESSAGE = 'Error fetching exchange rate:';

// Function to log request headers
function logRequestHeaders(req) {
    console.log(HEADER_LOG_MESSAGE);
    Object.entries(req.headers).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
    });
}

// Function to get the OS information
const getOsInfo = () => ({
    platform: os.platform(),
    type: os.type(),
    release: os.release(),
    uptime: os.uptime(),
    hostname: os.hostname(),
    arch: os.arch(),
    cpus: os.cpus().length
});

// Function to calculate exchange rate
const calculateExchangeRate = (rates, from, to) => {
    const baseToTargetRate = rates[to];
    const fromToBaseRate = 1 / rates[from];
    return baseToTargetRate * fromToBaseRate;
};

// Function to get exchange rate from API
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(API_URL);
        const { rates } = response.data;
        if (!rates) throw new Error(RATES_ERROR_MESSAGE);
        return calculateExchangeRate(rates, from, to);
    } catch (error) {
        console.error(`${FETCHING_ERROR_MESSAGE} ${error}`);
        throw error;
    }
};

// Endpoint handlers
const handleOsInfoEndpoint = (req, res) => {
    logRequestHeaders(req);
    res.json(getOsInfo());
};

const handleCurrencyExchangeRate = async (req, res) => {
    try {
        const { pair } = req.params;
        const [from, to] = pair.split('_');
        if (!from || !to) res.status(400).json({ message: 'Invalid currency pair format.' });

        const rate = await getExchangeRate(from, to);
        res.status(200).json({ from, to, rate, timestamp: new Date().toISOString() });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Currency pair not found.' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

// Export the handlers
module.exports = {
    handleOsInfoEndpoint,
    handleCurrencyExchangeRate
};