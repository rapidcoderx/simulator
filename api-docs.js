// api-docs.js

/**
 * @openapi
 * tags:
 *   - name: OS Info
 *     description: Operations about operating system information
 *   - name : Exchange Rate
 *     description: Fetch exchange rate for given currency pair
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     OSInfo:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *         type:
 *           type: string
 *         release:
 *           type: string
 *         uptime:
 *           type: integer
 *         hostname:
 *           type: string
 *         arch:
 *           type: string
 *         cpus:
 *           type: integer
 *           example: 8
 *
 * @openapi
 * /osinfo:
 *   get:
 *     summary: Returns operating system information
 *     description: Retrieve information about the server's operating system.
 *     operationId: getOSInfo
 *     tags:
 *       - OS Info
 *     responses:
 *       200:
 *         description: An object containing the operating system information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OSInfo'
 */