require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NASDAQ Data Link API",
            version: "1.0.0",
            description: "A simple Express API to fetch data from NASDAQ"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ],
    },
    apis: ["./server.js"],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3001;
const NASDAQ_API_KEY = process.env.NASDAQ_API_KEY;
/**
 * @swagger
 * /api/datasets/{datasetCode}:
 *   get:
 *     summary: Retrieve data for a given dataset code from Nasdaq.
 *     description: Returns data from Nasdaq based on the provided dataset code.
 *     tags: [NASDAQ Data]
 *     parameters:
 *       - in: path
 *         name: datasetCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Dataset code to retrieve data for.
 *     responses:
 *       200:
 *         description: Successfully retrieved data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataset:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     dataset_code:
 *                       type: string
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *       500:
 *         description: Failed to fetch data
 */

app.get('/api/datasets/:datasetCode', async (req, res) => {
    const { datasetCode } = req.params;
    const apiUrl = `https://data.nasdaq.com/api/v3/datasets/${datasetCode}.json?api_key=${NASDAQ_API_KEY}`;
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data from Nasdaq", details: error.message });
    }
});

/**
 * @swagger
 * /api/tiingo/daily/{symbol}:
 *   get:
 *     summary: Retrieve daily stock data from Tiingo
 *     description: Provides daily stock data for a specified symbol using Tiingo's API.
 *     tags: [Tiingo Data]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Stock symbol to retrieve the data for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved daily stock data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticker:
 *                   type: string
 *                 last:
 *                   type: number
 *                 prevClose:
 *                   type: number
 *                 open:
 *                   type: number
 *                 high:
 *                   type: number
 *                 low:
 *                   type: number
 *                 volume:
 *                   type: integer
 *                 date:
 *                   type: string
 *       400:
 *         description: Bad request if the symbol is invalid
 *       500:
 *         description: Internal server error
 */

app.get('/api/tiingo/daily/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const url = `https://api.tiingo.com/tiingo/daily/${symbol}?token=${process.env.TIINGO_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Forward the status code from the Tiingo API
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: "Failed to fetch data from Tiingo", details: error.message });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
