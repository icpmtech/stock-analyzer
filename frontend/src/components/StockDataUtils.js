import axios from 'axios';

const API_KEY = '8d817453-4629-4de5-a13d-3e9130fbd020'; // This should ideally be stored in environment variables

const fetchStockData = async (symbol, timeFrame = 'daily') => {
  let functionType = 'TIME_SERIES_DAILY';
  switch (timeFrame) {
    case '1D':
    case 'daily':
      functionType = 'TIME_SERIES_DAILY';
      break;
    case '1M':
    case 'monthly':
      functionType = 'TIME_SERIES_MONTHLY';
      break;
    case '52W':
    case 'weekly': // Assuming you want weekly data for 52 weeks
      functionType = 'TIME_SERIES_WEEKLY';
      break;
    case 'ALL':
    case 'dailyAdjust': // Assuming you want all available daily data, adjusted
      functionType = 'TIME_SERIES_DAILY_ADJUSTED';
      break;
    default:
      console.log('Defaulting to daily time series');
  }

  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

  try {
   const labelTimeSeries= functionType.split('_')[2];
   let typeTimeSeriesLabel='Time Series (Daily)';
    switch (labelTimeSeries) {
      case 'DAILY':
        typeTimeSeriesLabel = 'Time Series (Daily)';
        break;
      case 'MONTHLY':
        typeTimeSeriesLabel = 'Monthly Time Series';
        break;
      case 'WEEKLY': // Assuming you want weekly data for 52 weeks
      typeTimeSeriesLabel = 'Weekly Time Series';
        break;
      case 'DAILY_ADJUSTED': // Assuming you want all available daily data, adjusted
      typeTimeSeriesLabel = 'Time Series (Daily)';
        break;
      default:
        console.log('Defaulting to daily time series');
    }
    const response = await axios.get(url);
    const data = response.data[`${typeTimeSeriesLabel}`];
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
        label: 'Open Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y-axis-open',
      },
      {
        label: 'High Price',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        yAxisID: 'y-axis-high',
      },
      {
        label: 'Low Price',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y-axis-low',
      },
      {
        label: 'Close Price',
        data: [],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        yAxisID: 'y-axis-close',
      },
      {
        label: 'Adjusted Close Price',
        data: [],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        yAxisID: 'y-axis-adjusted',
      },
      {
        label: 'Volume',
        data: [],
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        yAxisID: 'y-axis-volume',
      }
     
    ]
  };

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      chartData.labels.push(key);
      chartData.datasets[0].data.push(parseFloat(value['1. open']));
      chartData.datasets[1].data.push(parseFloat(value['2. high']));
      chartData.datasets[2].data.push(parseFloat(value['3. low']));
      chartData.datasets[3].data.push(parseFloat(value['4. close']));
      chartData.datasets[4].data.push(parseFloat(value['5. adjusted close']));
      chartData.datasets[5].data.push(parseFloat(value['6. volume']));
    });
  }
  chartData.labels.reverse();
  chartData.datasets[0].data.reverse();
  return chartData;
};


export { prepareChartData };
