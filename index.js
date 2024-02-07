const express = require('express');
const os = require('os');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const HEADER_LOG_MESSAGE = 'Incoming request headers:';

// Extract OS information into a separate function
function getOsInfo() {
    return {
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        uptime: os.uptime(),
        hostname: os.hostname(),
        arch: os.arch(),
        cpus: os.cpus().length
    };
}

function logRequestHeaders(req) {
    console.log(HEADER_LOG_MESSAGE);
    for(let [key, value] of Object.entries(req.headers)){
        console.log(`Key: ${key}, Value: ${value}`);
    }
}

const app = express();
const port = process.env.PORT || 3000; // Configurable port

// Swagger JSDoc options
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'OS Info API',
            version: '1.0.0',
            description: 'A simple API to get OS information',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./api-docs.js'], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const openApiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.get('/osinfo', (req, res) => {
    // Print all headers to the console
    logRequestHeaders(req);

    const osInfo = getOsInfo();
    res.json(osInfo);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});