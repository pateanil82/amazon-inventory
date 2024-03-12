/**
 * Application wide configuration
 */
const config = {
  baseURI: 'https://ovistock.vancotech.com/api',
  apiEndPoint: {
    products: {
      getProducts: '/products'
    },
    forecasting: {
      postCalculatedDays: '/saveSelectedForecastConfig',
    },
    activities: {
      getActivities: '/activities',
      saveActivity: '/saveUserActivity'
    },
    marketplaces:{
      getMarketPlaces : '/marketplace'
    }
  },
};

export default config;
