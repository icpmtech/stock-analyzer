const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    lastPrice: {
        type: String,
        required: true
    },
    marketCap: {
        type: String,
        required: true
    },
    avgVol: {
        type: String,
        required: true
    },
    epsNextYear: {
        type: String,
        required: true
    },
    forwardPE: {
        type: String,
        required: true
    },
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
    forwardAnnualDivRate: {
        type: String,
        required: true
    },
    forwardAnnualDivYield: {
        type: String,
        required: true
    },
    trailingAnnualDivRate: {
        type: String,
        required: true
    },
    trailingAnnualDivYield: {
        type: String,
        required: true
    },
    priceBook: {
        type: String,
        required: true
    },
    trendData: {
        type: [Number], // Array of numbers
        required: true
    }
});

const Holding = mongoose.model('Holding', holdingSchema);
module.exports = Holding;
