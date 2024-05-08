const mongoose = require('mongoose');

const portfolioHoldingSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    status: { type: String, required: true, enum: ['Open', 'Closed', 'Pending'] },
    shares: { type: Number, required: true, min: 0 },
    lastPrice: { type: Number, required: true, min: 0 },
    avgCost: { type: Number, required: true, min: 0 },
    totalDividendIncome: { type: String, default: "--" },
    todaysGain: { type: String, required: true },
    totalGain: { type: String, required: true },
    totalReturn: { type: String, default: "--" },
    marketValueTrend: [{ type: Number }]
}, { timestamps: true });

const PortfolioHolding = mongoose.model('PortfolioHolding', portfolioHoldingSchema);

module.exports = PortfolioHolding;
