const express = require('express');
const router = express.Router();
const axios = require('axios');
const puppeteer = require('puppeteer');
const yahooFinance = require('yahoo-finance2').default;
const Holding = require('../models/Holding');
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const NASDAQ_API_KEY = process.env.NASDAQ_API_KEY;
/**
 * @swagger
 * /api/holdings:
 *   get:
 *     summary: Get all holdings
 *     tags: [Holdings]
 *     responses:
 *       200:
 *         description: List of all holdings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Holding'
 */

router.get('/holdings', async (req, res) => {
    try {
        const holdings = await Holding.find();
        res.json(holdings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/holdings:
 *   post:
 *     summary: Create a new holding
 *     tags: [Holdings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Holding'
 *     responses:
 *       201:
 *         description: The holding was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Holding'
 */

router.post('/holdings', async (req, res) => {
    const newHolding = new Holding({
        symbol: req.body.symbol,
        lastPrice: req.body.lastPrice,
        marketCap: req.body.marketCap,
        avgVol: req.body.avgVol,
        epsNextYear: req.body.epsNextYear,
        forwardPE: req.body.forwardPE,
        divPaymentDate: req.body.divPaymentDate,
        exDivDate: req.body.exDivDate,
        divPerShare: req.body.divPerShare,
        forwardAnnualDivRate: req.body.forwardAnnualDivRate,
        forwardAnnualDivYield: req.body.forwardAnnualDivYield,
        trailingAnnualDivRate: req.body.trailingAnnualDivRate,
        trailingAnnualDivYield: req.body.trailingAnnualDivYield,
        priceBook: req.body.priceBook,
        trendData: req.body.trendData
    });
    try {
        const savedHolding = await newHolding.save();
        res.status(201).json(savedHolding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});








  /**
     * @swagger
     * /api/stock/{symbol}:
     *   get:
     *     summary: Retrieve stock details from IEX Cloud
     *     description: Returns stock details including latest price, volume etc.
     *     tags: [Stock Details from IEX Cloud]
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
router.get('/stock/:symbol', async (req, res) => {
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
/**
 * @swagger
 * /api/openai/chat:
 *   post:
 *     summary: Generate chat completion using OpenAI.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userMessage:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response with chat completion.
 *       '500':
 *         description: Internal server error.
 */
router.post('/openai/chat', async (req, res) => {
    try {
      const { userMessage } = req.body;
  
      // Constructing the messages array
      const messages = [
        {
          "role": "user",
          "content": userMessage
        }
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      res.json(response);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  });

/**
 * @swagger
 * /api/search-dividends:
 *   get:
 *     summary: List all dividends for a stock
 *     description: Retrieves a list of all dividend payments for a specified stock ticker, optionally from a specified start date.
 *     parameters:
 *       - in: query
 *         name: ticker
 *         schema:
 *           type: string
 *         required: true
 *         description: Stock ticker symbol to retrieve dividends for
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: '2000-01-01'
 *         required: false
 *         description: Start date to filter dividends from (inclusive)
 *     responses:
 *       200:
 *         description: A list of dividends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: '2024-01-15'
 *                   dividend:
 *                     type: number
 *                     example: 0.22
 *       400:
 *         description: Bad request, ticker symbol is missing
 *       404:
 *         description: No dividend information found
 *       500:
 *         description: Server error or unable to fetch data from the API
 */
router.get('/search-dividends', async (req, res) => {
    const { ticker,from  } = req.query;
    if (!ticker) {
        return res.status(400).json({ error: 'Ticker symbol is required' });
    }
     // Defaulting to a specific date if 'from' is not provided
     const startDate = from || '2000-01-01';
    const EODHD_API_KEY = process.env.EODHD_API_KEY;
    const EODHD_BASE_URL = 'https://eodhd.com/api/div';
    try {
        const response = await axios.get(`${EODHD_BASE_URL}/${ticker}.US`, {
            params: {
                api_token: 'demo',
                fmt: 'json',
                from: startDate
            }
        });
        const dividends = response.data;
        if (dividends && dividends.length > 0) {
            res.json(dividends);  // Returns the latest dividend entry
        } else {
            res.status(404).json({ error: 'No dividend information found for the specified ticker' });
        }
    } catch (error) {
        res.status(500).json({ errorCall: 'Failed to fetch data from EOD Historical Data API'+ error });
    }
});

/**
 * @swagger
 * /api/stock-price/{symbol}:
 *   get:
 *     summary: Retrieve the current stock price
 *     description: Fetches the current market price of a stock based on the stock symbol provided in the URL path. This endpoint scrapes the price directly from Yahoo Finance.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock symbol for which the current market price is being retrieved, such as 'AAPL' for Apple Inc.
 *     responses:
 *       200:
 *         description: Successfully retrieved the stock price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                   example: 'AAPL'
 *                 price:
 *                   type: string
 *                   example: '150.10'
 *       400:
 *         description: Bad request, symbol is missing or invalid
 *       500:
 *         description: Server error or unable to fetch the stock price
 */
router.get('/stock-price/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const url = `https://finance.yahoo.com/quote/${symbol}`;
  
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const price = await page.evaluate(() => {
        const priceElement = document.querySelector('fin-streamer[data-field="regularMarketPrice"]');
        return priceElement ? priceElement.innerText : 'No price found';
      });
      await browser.close();
      res.send({ symbol, price });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Failed to fetch stock price' });
    }
  });


  /**
 * @openapi
 * /api/stock-quote/{symbol}:
 *   get:
 *     summary: Retrieve stock quotes
 *     description: Fetches stock quotes by symbol using the yahoo-finance2 library.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Stock symbol to retrieve the quote for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved stock quote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 price:
 *                   type: number
 *       500:
 *         description: Error fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

  router.get('/stock-quote/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
      const quote = await yahooFinance.quote(symbol);
      res.json(quote);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  });


module.exports = router;
