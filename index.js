const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const apiRoutes = require('./apiRoutes');
require('dotenv').config();
const basePath = process.env.BASE_PATH || '/demoapp'; // Use the environment variable or a default

// Express application setup
const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
const options = {
    definition: {
        openapi: '3.0.3',
        info: { title: 'OS Info API', version: '1.0.0', description: 'A simple API to get OS information' },
        servers: [{ url: `http://localhost:${port}${basePath}` }] // Add your base path here
    },
    apis: ['./api-docs.js']
};

const openApiSpecification = swaggerJsdoc(options);
app.use(basePath + '/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.use(basePath + '/api', apiRoutes);
app.listen(port, () => console.log(`Server listening on port ${port}`));