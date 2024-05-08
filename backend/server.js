require('dotenv').config();

const express = require('express');

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

const tiingoRouter = require('./routes/tiingo');
const holdingsRouter = require('./routes/holdings');
const portfolioHoldingsRouter = require('./routes/portfolioHoldings');
const nasdaqRouter = require('./routes/nasdaq');
const newsapiRouter = require('./routes/newsapi');
const newsRouter = require('./routes/news');
const { options } = require('./options');
const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

app.use('/', holdingsRouter);
app.use('/api/tiingo', tiingoRouter);
app.use('/api/datasets', nasdaqRouter);
app.use('/api/articles', newsapiRouter);
app.use('/api/news', newsRouter);
app.use('/portfolioHoldings', portfolioHoldingsRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3001}`);
});
