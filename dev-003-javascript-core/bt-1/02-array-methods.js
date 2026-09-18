// Bài 2: Array Methods trong JavaScript

const users = [
  { id: 1, name: 'Nguyễn Văn A', age: 24, role: 'developer', active: true, score: 85 },
  { id: 2, name: 'Trần Thị B', age: 19, role: 'designer', active: false, score: 92 },
  { id: 3, name: 'Lê Văn C', age: 29, role: 'developer', active: true, score: 78 },
  { id: 4, name: 'Phạm Minh D', age: 32, role: 'pm', active: true, score: 95 },
  { id: 5, name: 'Hoàng Quốc E', age: 21, role: 'tester', active: false, score: 64 },
  { id: 6, name: 'Vũ Thị F', age: 26, role: 'developer', active: true, score: 88 },
];

const orders = [
  { orderId: 'ORD-001', category: 'Laptop', price: 1500, status: 'completed' },
  { orderId: 'ORD-002', category: 'Phone', price: 800, status: 'completed' },
  { orderId: 'ORD-003', category: 'Tablet', price: 600, status: 'cancelled' },
  { orderId: 'ORD-004', category: 'Laptop', price: 2200, status: 'completed' },
  { orderId: 'ORD-005', category: 'Monitor', price: 350, status: 'pending' },
];

// 2.1 So sánh for loop vs Array methods (filter + map)
// Lấy danh sách tên Developer đang active và có tuổi >= 25

// Vòng lặp for
function getActiveSeniorDevsFor(userList) {
  const result = [];
  for (let i = 0; i < userList.length; i++) {
    const u = userList[i];
    if (u.role === 'developer' && u.active && u.age >= 25) {
      result.push(u.name);
    }
  }
  return result;
}

// Array methods
function getActiveSeniorDevs(userList) {
  return userList
    .filter((user) => user.role === 'developer' && user.active && user.age >= 25)
    .map((user) => user.name);
}

console.log('For loop:', getActiveSeniorDevsFor(users));
console.log('Array methods:', getActiveSeniorDevs(users));


// 2.2 Gom nhóm & tổng hợp dữ liệu với reduce
// a) Tính tổng doanh thu đơn thành công
const totalRevenue = orders
  .filter((order) => order.status === 'completed')
  .reduce((sum, order) => sum + order.price, 0);

console.log('Tổng doanh thu:', totalRevenue);

// b) Gom nhóm đơn hàng theo category
const ordersByCategory = orders.reduce((acc, order) => {
  const cat = order.category;
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push(order);
  return acc;
}, {});

console.log('Đơn hàng theo danh mục:', ordersByCategory);

// c) Tính điểm trung bình của active users
const activeUsers = users.filter((user) => user.active);
const averageScore = activeUsers.reduce((sum, user) => sum + user.score, 0) / activeUsers.length;

console.log('Điểm trung bình active users:', averageScore.toFixed(2));


// 2.3 Kiểm tra & tìm kiếm với find, some, every
// a) User có điểm cao nhất
const highestScoreUser = users.slice().sort((a, b) => b.score - a.score)[0];
console.log('User điểm cao nhất:', highestScoreUser.name);

// b) Kiểm tra xem có đơn bị hủy không
const hasCancelledOrder = orders.some((order) => order.status === 'cancelled');
console.log('Có đơn hủy không:', hasCancelledOrder);

// c) Kiểm tra xem tất cả user có >= 18 tuổi không
const allAdults = users.every((user) => user.age >= 18);
console.log('Tất cả từ 18 tuổi trở lên:', allAdults);


// 2.4 Trích xuất danh sách tag duy nhất (flatMap & Set)
const articles = [
  { id: 101, title: 'Học ReactJS', tags: ['react', 'javascript', 'frontend'] },
  { id: 102, title: 'Làm quen Tailwind CSS', tags: ['css', 'tailwind', 'frontend'] },
  { id: 103, title: 'NodeJS & Express', tags: ['javascript', 'backend', 'nodejs'] },
];

const uniqueSortedTags = Array.from(
  new Set(articles.flatMap((article) => article.tags))
).sort();

console.log('Unique tags:', uniqueSortedTags);
