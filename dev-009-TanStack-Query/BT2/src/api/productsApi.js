import axios from 'axios';

let networkRequestsCount = 0;
const requestedPagesMap = {};

export const getNetworkStats = () => ({
  totalRequests: networkRequestsCount,
  pagesFetched: Object.keys(requestedPagesMap).map(Number),
});

export const resetNetworkStats = () => {
  networkRequestsCount = 0;
  for (const key of Object.keys(requestedPagesMap)) {
    delete requestedPagesMap[key];
  }
};

export const fetchProducts = async (page = 1, limit = 8) => {
  networkRequestsCount += 1;
  requestedPagesMap[page] = (requestedPagesMap[page] || 0) + 1;

  const skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
};
