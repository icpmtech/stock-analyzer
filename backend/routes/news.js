const express = require('express');
const router = express.Router();
const axios = require('axios');


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

router.get('/', async (req, res) => {
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




module.exports = router;