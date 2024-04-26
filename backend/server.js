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
            title: "Stock Analizer Data Link API",
            version: "1.0.0",
            description: "A simple Express API to fetch data to by used by Stock Analizer React App"
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
app.get('/api/stocks', async (req, res) => {
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

app.get('/api/stock-details/:symbol', async (req, res) => {
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

app.get('/api/search-stocks', async (req, res) => {
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


/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Retrieves articles based on query
 *     description: Fetches articles using an external News API.
 *     tags: [News API Org]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search for in articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       source:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       author:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       url:
 *                         type: string
 *                       urlToImage:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                       content:
 *                         type: string
 */

app.get('/api/articles', async (req, res) => {
    const query = req.query.query || 'default';  // Default query if none provided
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });
    }
});

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Retrieves news articles based on a search query.
 *     description: Fetches articles from an external news source.
 *     tags: [News API AI]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Keyword to search for in the news articles, defaults to 'stock markets'.
 *     responses:
 *       200:
 *         description: An array of news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       url:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *       500:
 *         description: Failed to fetch news articles.
 */

app.get('/api/news', async (req, res) => {
    const searchQuery = req.query.search || 'stock markets'; // Default to 'stock markets' if no search query provided
    const apiKeyNews = process.env.NEWS_AI_API_KEY; // Assume you have your API key stored in an environment variable

    const params = {
        query: JSON.stringify({
            "$query": {
                "$and": [
                    {"keyword": searchQuery, "keywordLoc": "body"},
                    {"lang": "eng"}
                ]
            },
            "$filter": {"forceMaxDataTimeWindow": "31"}
        }),
        resultType: "articles",
        articlesSortBy: "date",
        includeArticleImage: true,
        apiKey: apiKeyNews
    };

    try {
        const response = await axios.get("https://www.newsapi.ai/api/v1/article/getArticles", { params });
        res.json(response.data); // Send response back to client
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Failed to fetch news', error: error.toString() });
    }
});


  /**
     * @swagger
     * /api/stock/{symbol}:
     *   get:
     *     summary: Retrieve stock details from IEX Cloud
     *     description: Returns stock details including latest price, volume etc.
     *     parameters:
     *       - in: path
     *         name: symbol
     *         required: true
     *         description: Stock symbol to fetch details for (e.g. AAPL, GOOGL, etc.)
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: A successful response with stock data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 symbol:
     *                   type: string
     *                 companyName:
     *                   type: string
     *                 primaryExchange:
     *                   type: string
     *                 latestPrice:
     *                   type: number
     *                 latestSource:
     *                   type: string
     *                 latestTime:
     *                   type: string
     *       404:
     *         description: Stock not found
     *       500:
     *         description: Internal server error
     */
app.get('/api/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const token = process.env.IEX_API_TOKEN;
    try {
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch stock data:', error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send("Error connecting to IEX Cloud");
        }
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
