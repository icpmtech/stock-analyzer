const express = require('express');
const router = express.Router();
const PortfolioHolding = require('../models/PortfolioHolding');

/**
 * @swagger
 * /portfolioHoldings:
 *   get:
 *     summary: Returns a list of all portfolio holdings
 *     tags: [Portfolio Holdings]
 *     responses:
 *       200:
 *         description: A list of portfolio holdings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioHolding'
 *   post:
 *     summary: Create a new portfolio holding
 *     tags: [Portfolio Holdings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PortfolioHolding'
 *     responses:
 *       201:
 *         description: Portfolio holding created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioHolding'
 */

router.get('/', async (req, res) => {
    try {
        const holdings = await PortfolioHolding.find();
        res.json(holdings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new portfolio holding
router.post('/', async (req, res) => {
    const holding = new PortfolioHolding(req.body);
    try {
        const newHolding = await holding.save();
        res.status(201).json(newHolding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
