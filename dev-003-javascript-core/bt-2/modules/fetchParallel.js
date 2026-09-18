// Module thực thi fetch dữ liệu song song (Parallel Fetching)

import { fetchUser } from './api.js';

// Song song dùng Promise.all (Toàn bộ thành công hoặc thất bại chung)
export async function fetchUsersParallelAll(userIds) {
  const startTime = Date.now();
  const promises = userIds.map((id) => fetchUser(id));
  const results = await Promise.all(promises);
  const duration = Date.now() - startTime;
  return { results, duration };
}

// Song song dùng Promise.allSettled (An toàn khi có request lỗi)
export async function fetchUsersParallelSettled(userIds) {
  const startTime = Date.now();
  const promises = userIds.map((id) => fetchUser(id));
  const responses = await Promise.allSettled(promises);

  const results = responses.map((res, index) => {
    if (res.status === 'fulfilled') {
      return res.value;
    }
    return { id: userIds[index], error: res.reason.message };
  });

  const duration = Date.now() - startTime;
  return { results, duration };
}
