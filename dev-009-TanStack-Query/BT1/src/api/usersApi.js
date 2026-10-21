import axios from 'axios';

let networkCallCount = 0;

export const getNetworkCallCount = () => networkCallCount;

export const resetNetworkCallCount = () => {
  networkCallCount = 0;
};

export const fetchUsers = async () => {
  networkCallCount += 1;
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};
