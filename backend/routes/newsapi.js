const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.get('/', async (req, res) => {
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




module.exports = router;