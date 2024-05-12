const express = require('express');
const router = express.Router();
router.post('/dividends', async (req, res) => {
  try {
      const dividend = req.body;
      const result = await dividendsCollection.insertOne(dividend);
      res.status(201).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
router.get('/dividends', async (req, res) => {
  try {
      const dividends = await dividendsCollection.find({}).toArray();
      res.status(200).json(dividends);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.put('/dividends/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const result = await dividendsCollection.updateOne(
          { _id: new MongoClient.ObjectId(id) },
          { $set: req.body }
      );
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.delete('/dividends/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const result = await dividendsCollection.deleteOne({ _id: new MongoClient.ObjectId(id) });
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
