const express = require('express');
const router = express.Router();
const axios = require('axios');
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

router.get('/:datasetCode', async (req, res) => {
    const { datasetCode } = req.params;
    const apiUrl = `https://data.nasdaq.com/api/v3/datasets/${datasetCode}.json?api_key=${NASDAQ_API_KEY}`;
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data from Nasdaq", details: error.message });
    }
});




module.exports = router;