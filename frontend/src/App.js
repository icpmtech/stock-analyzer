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

function App() {
  

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/finance" element={<FinanceWidget />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/stock-chart" element={<StockDashboard symbol="AAPL" />} />
        <Route path="/holdings" element={<StockHoldings  />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
