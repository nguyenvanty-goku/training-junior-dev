// Module thực thi fetch dữ liệu tuần tự (Sequential Fetching)

import { fetchUser } from './api.js';

export async function fetchUsersSequential(userIds) {
  const startTime = Date.now();
  const results = [];

  for (const id of userIds) {
    try {
      const user = await fetchUser(id);
      results.push(user);
    } catch (error) {
      results.push({ id, error: error.message });
    }
  }

  const duration = Date.now() - startTime;
  return { results, duration };
}
