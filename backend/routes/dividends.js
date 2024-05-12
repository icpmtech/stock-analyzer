const express = require('express');
const router = express.Router();
const PortfolioDividends = require('../models/PortfolioDividends');

/**
 * @openapi
 * /api/dividends:
 *   post:
 *     summary: Create a new dividend entry
 *     description: Add a new dividend to the portfolio.
 *     tags: [Dividends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PortfolioDividend'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioDividend'
 *       500:
 *         description: Server error
 */
router.post('/dividends', async (req, res) => {
  try {
    const dividend = req.body; // Data from client
    // Using Mongoose's create method to insert a new document
    const result = await PortfolioDividends.create(dividend);
    res.status(201).json(result);
  } catch (error) {
    // It's good to log the error for debugging purposes
    console.error("Failed to insert dividend:", error);
    // Sending a 500 status code for internal server errors
    res.status(500).json({ error: error.message });
  }
});
  
  /**
 * @openapi
 * /api/dividends:
 *   get:
 *     summary: Retrieve all dividend entries
 *     description: Returns a list of all dividends in the portfolio.
 *     tags: [Dividends]
 *     responses:
 *       200:
 *         description: A list of dividends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioDividend'
 *       500:
 *         description: Server error
 */
  router.get('/dividends', async (req, res) => {
    try {
      const dividends = await PortfolioDividends.find();
      res.status(200).json(dividends);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
/**
 * @openapi
 * /api/dividends/{id}:
 *   put:
 *     summary: Update a specific dividend entry
 *     description: Modify an existing dividend in the portfolio.
 *     tags: [Dividends]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the dividend to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PortfolioDividend'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioDividend'
 *       500:
 *         description: Server error
 */

  router.put('/dividends/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await PortfolioDividends.updateOne(
        { _id: new require('mongodb').ObjectId(id) },
        { $set: req.body }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * @openapi
   * /api/dividends/{id}:
   *   delete:
   *     summary: Delete a specific dividend entry
   *     description: Remove a dividend from the portfolio.
   *     tags: [Dividends]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: MongoDB ID of the dividend to delete
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Deleted successfully
   *       500:
   *         description: Server error
   */
  router.delete('/dividends/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await PortfolioDividends.deleteOne({ _id: new require('mongodb').ObjectId(id) });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
