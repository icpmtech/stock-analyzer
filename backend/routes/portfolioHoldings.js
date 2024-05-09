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
 *   put:
 *     summary: Update an existing portfolio holding
 *     tags: [Portfolio Holdings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio holding ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PortfolioHolding'
 *     responses:
 *       200:
 *         description: Portfolio holding updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioHolding'
 *   delete:
 *     summary: Delete a portfolio holding
 *     tags: [Portfolio Holdings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio holding ID to delete
 *     responses:
 *       204:
 *         description: Portfolio holding deleted
 */

router.get('/', async (req, res) => {
    try {
        const holdings = await PortfolioHolding.find();
        res.json(holdings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const holding = new PortfolioHolding(req.body);
    try {
        const newHolding = await holding.save();
        res.status(201).json(newHolding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedHolding = await PortfolioHolding.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHolding) {
            return res.status(404).json({ message: 'Holding not found' });
        }
        res.json(updatedHolding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await PortfolioHolding.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Holding not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
