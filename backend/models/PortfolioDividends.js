const mongoose = require('mongoose');

const portfolioDividendsSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    status: { type: String, required: true, enum: ['Open', 'Closed', 'Pending'] },
    shares: { type: Number, required: true, min: 0 },
    lastPrice: { type: Number, required: true, min: 0 },
    avgCost: { type: Number, required: true, min: 0 },
    totalDividendIncome: { type: String, default: "--" },
    todaysGain: { type: String, required: true },
    totalGain: { type: String, required: true },
    totalReturn: { type: String, default: "--" },
    divPaymentDate: {
        type: String,
        required: true
    },
    exDivDate: {
        type: String,
        required: true
    },
    divPerShare: {
        type: String,
        required: true
    },
}, { timestamps: true });

const PortfolioDividends = mongoose.model('PortfolioDividends', portfolioDividendsSchema);

module.exports = PortfolioDividends;
