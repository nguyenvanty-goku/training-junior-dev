// Module giả lập API với độ trễ (latency)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUser(id) {
  await delay(300);
  if (id === 999) {
    throw new Error(`User ${id} không tồn tại`);
  }
  return { id, name: `User ${id}`, email: `user${id}@example.com` };
}

export async function fetchPosts(userId) {
  await delay(400);
  return [
    { id: 101, userId, title: `Bài viết 1 của User ${userId}` },
    { id: 102, userId, title: `Bài viết 2 của User ${userId}` }
  ];
}

export async function fetchComments(postId) {
  await delay(200);
  return [
    { id: 1, postId, content: `Bình luận 1 cho post ${postId}` },
    { id: 2, postId, content: `Bình luận 2 cho post ${postId}` }
  ];
}
