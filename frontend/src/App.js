// src/App.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import WeatherWidget from "./components/WeatherWidget";
import FinanceWidget from "./components/FinanceWidget";
import Footer from "./components/Footer";
import Home from './components/Home';
import StockDashboard  from './components/dashboards/StockDashboard';
import StockHoldings from './components/StockHoldings';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
const holdingsData = [
  {
    symbol: "NOS.LS",
    status: "Open",
    shares: 100,
    lastPrice: 3.2850,
    avgCost: 3.2750,
    totalCost: 337.8,
    marketValue: 328.5,
    totalDividendIncome: "--",
    todaysGain: "+0.5000 (+0.1524%)",
    totalGain: "-9.3000 (-2.7531%)",
    totalReturn: "--",
    marketValueTrend: [7200, 7300, 7400, 7450, 7500] 
  },
  // Add more holdings as needed...
];
function App() {
 
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/finance" element={<FinanceWidget />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/stock-chart" element={<StockDashboard  symbol="AAPL" />} />
        <Route path="/holdings" element={  <StockHoldings holdingsData={holdingsData} /> } />
        <Route path="/login" element={  <LoginForm /> } />
        <Route path="/register" element={  <RegisterForm /> } />
       
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
