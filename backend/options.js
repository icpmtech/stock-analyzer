const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Stock Analizer Data Link API",
            version: "1.0.0",
            description: "A simple Express API to fetch data to by used by Stock Analizer React App"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ], components: {
            schemas: {
                Holding: {
                    type: "object",
                    properties: {
                        symbol: {
                            type: "string",
                            description: "The stock symbol for the holding."
                        },
                        lastPrice: {
                            type: "number",
                            description: "The last trading price of the stock."
                        },
                        marketCap: {
                            type: "string",
                            description: "Market capitalization of the stock."
                        },
                        avgVol: {
                            type: "string",
                            description: "Average volume of shares traded over the last three months."
                        },
                        epsNextYear: {
                            type: "string",
                            description: "Estimated earnings per share for the next fiscal year."
                        },
                        forwardPE: {
                            type: "string",
                            description: "Forward Price to Earnings ratio based on next year's earnings estimates."
                        },
                        divPaymentDate: {
                            type: "string",
                            description: "The next scheduled dividend payment date."
                        },
                        exDivDate: {
                            type: "string",
                            description: "The ex-dividend date, or the date on which the stock starts trading without the subsequent dividend value."
                        },
                        divPerShare: {
                            type: "string",
                            description: "Dividend per share."
                        },
                        forwardAnnualDivRate: {
                            type: "string",
                            description: "The forward annual dividend rate."
                        },
                        forwardAnnualDivYield: {
                            type: "string",
                            description: "The forward annual dividend yield expressed as a percentage."
                        },
                        trailingAnnualDivRate: {
                            type: "string",
                            description: "The trailing annual dividend rate."
                        },
                        trailingAnnualDivYield: {
                            type: "string",
                            description: "The trailing annual dividend yield expressed as a percentage."
                        },
                        priceBook: {
                            type: "string",
                            description: "Price to book ratio, a measure of market valuation of a company."
                        },
                        trendData: {
                            type: "array",
                            items: {
                                type: "number"
                            },
                            description: "Historical trend data points for the stock's performance."
                        }
                    },
                    required: ["symbol", "lastPrice"] // Add any other required fields
                }, PortfolioHolding: {
                    type: 'object',
                    properties: {
                        symbol: {
                            type: 'string',
                            description: 'Stock symbol, uniquely identifies the stock.'
                        },
                        status: {
                            type: 'string',
                            description: 'Current status of the holding (e.g., Open, Closed, Pending).',
                            enum: ['Open', 'Closed', 'Pending']
                        },
                        shares: {
                            type: 'number',
                            description: 'Number of shares held.',
                            minimum: 0
                        },
                        lastPrice: {
                            type: 'number',
                            description: 'The last recorded trading price of the stock.',
                            minimum: 0
                        },
                        avgCost: {
                            type: 'number',
                            description: 'Average cost per share paid for the holdings.',
                            minimum: 0
                        },
                        totalCost: {
                            type: 'number',
                            description: 'Total cost of the holdings (shares * avgCost).',
                            minimum: 0
                        },
                        marketValue: {
                            type: 'number',
                            description: 'Current market value of the holdings (shares * lastPrice).',
                            minimum: 0
                        },
                        totalDividendIncome: {
                            type: 'string',
                            description: 'Total dividend income received, if any.',
                            default: "--"
                        },
                        todaysGain: {
                            type: 'string',
                            description: 'Today\'s gain or loss on the holdings, expressed as a string with percentage.'
                        },
                        totalGain: {
                            type: 'string',
                            description: 'Total gain or loss on the holdings since purchase, expressed as a string with percentage.'
                        },
                        totalReturn: {
                            type: 'string',
                            description: 'Total return on the investment, typically expressed as a percentage.',
                            default: "--"
                        },
                        marketValueTrend: {
                            type: 'array',
                            description: 'Historical trend of market value, typically used for graphing.',
                            items: {
                                type: 'number'
                            }
                        }
                    },
                    required: ['symbol', 'status', 'shares', 'lastPrice', 'avgCost', 'totalCost', 'marketValue', 'todaysGain', 'totalGain'] // Adjust based on your requirements
                },
                PortfolioDividend: {
                    type: "object",
                    required: [
                        "symbol",
                        "status",
                        "shares",
                        "lastPrice",
                        "avgCost",
                        "todaysGain",
                        "totalGain",
                        "divPaymentDate",
                        "exDivDate",
                        "divPerShare"
                    ],
                    properties: {
                        symbol: {
                            type: "string",
                            example: "AAPL"
                        },
                        status: {
                            type: "string",
                            enum: ["Open", "Closed", "Pending"],
                            example: "Open"
                        },
                        shares: {
                            type: "number",
                            example: 50
                        },
                        lastPrice: {
                            type: "number",
                            example: 150.00
                        },
                        avgCost: {
                            type: "number",
                            example: 145.00
                        },
                        totalDividendIncome: {
                            type: "string",
                            default: "--",
                            example: "500.00"
                        },
                        todaysGain: {
                            type: "string",
                            example: "5%"
                        },
                        totalGain: {
                            type: "string",
                            example: "10%"
                        },
                        totalReturn: {
                            type: "string",
                            default: "--",
                            example: "15%"
                        },
                        divPaymentDate: {
                            type: "string",
                            example: "2021-06-15"
                        },
                        exDivDate: {
                            type: "string",
                            example: "2021-06-01"
                        },
                        divPerShare: {
                            type: "string",
                            example: "0.82"
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};
exports.options = options;
