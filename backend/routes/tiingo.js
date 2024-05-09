const express = require('express');
const router = express.Router();
const axios = require('axios');
const NASDAQ_API_KEY = process.env.NASDAQ_API_KEY;
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

router.get('/tiingo/daily/:symbol', async (req, res) => {
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

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Retrieve a list of stocks
 *     description: Fetches a list of stocks from the Tiingo API based on the optional search query.
 *     tags: [Stocks]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional search query to filter stocks
 *     responses:
 *       200:
 *         description: A list of stocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticker:
 *                     type: string
 *                     description: The ticker symbol of the stock
 *                   name:
 *                     type: string
 *                     description: The name of the company
 *                   exchange:
 *                     type: string
 *                     description: The stock exchange on which the stock is listed
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/stocks', async (req, res) => {
    const query = req.query.query || ''; // Default to an empty string if no query is provided
    const url = `https://api.tiingo.com/tiingo/utilities/search?query=${query}&token=${process.env.TIINGO_API_KEY}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stock data", details: error.message });
    }
});

/**
 * @swagger
 * /api/stock-details/{symbol}:
 *   get:
 *     summary: Get detailed information and news for a stock
 *     tags: [Stock Information]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Stock symbol to retrieve details and news for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information and news about the stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: object
 *                 news:
 *                   type: array
 *       500:
 *         description: Failed to fetch data
 */

router.get('/stock-details/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const detailsUrl = `https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=${process.env.TIINGO_API_KEY}`;
    const newsUrl = `https://api.tiingo.com/tiingo/news?tickers=${symbol}&token=${process.env.TIINGO_API_KEY}`;

    try {
        const detailsPromise = axios.get(detailsUrl);
        const newsPromise = axios.get(newsUrl);

        const [detailsResponse, newsResponse] = await Promise.all([detailsPromise, newsPromise]);

        res.json({
            details: detailsResponse.data[0], // Assuming the API returns an array and we need the first element
            news: newsResponse.data
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stock data", details: error.message });
    }
});


/**
 * @swagger
 * /api/search-stocks:
 *   get:
 *     summary: Search for stock symbols
 *     description: Returns a list of stocks matching the search query.
 *     tags: [Stock Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search string to query for stock symbols
 *     responses:
 *       200:
 *         description: A list of matching stocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   name:
 *                     type: string
 *       400:
 *         description: Missing query parameter
 *       500:
 *         description: Error fetching data
 */

router.get('/search-stocks', async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const url = `https://api.tiingo.com/tiingo/utilities/search?query=${searchQuery}&token=${process.env.TIINGO_API_KEY}`;

    try {
        const response = await axios.get(url);
        const stocks = response.data.map(stock => ({
            symbol: stock.ticker,
            name: stock.name
        }));
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stock data", details: error.message });
    }
});




module.exports = router;