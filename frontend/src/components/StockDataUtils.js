import axios from 'axios';

const fetchStockData = async (symbol) => {
  const apiKey = '8d817453-4629-4de5-a13d-3e9130fbd020'; // Your API key stored in environment variables
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data['Time Series (Daily)'];
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};
export { fetchStockData };

const prepareChartData = (data) => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Close Price',
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
   if(data)
    Object.entries(data).forEach(([key, value]) => {
      chartData.labels.unshift(key); // Add date to labels array
      chartData.datasets[0].data.unshift(value['4. close']); // Add close price to dataset
    });
  
    return chartData;
  };
  export { prepareChartData };