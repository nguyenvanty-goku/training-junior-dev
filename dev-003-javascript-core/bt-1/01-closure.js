// Bài 1: Closure trong JavaScript

// 1.1 Counter đóng gói state
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getValue() {
      return count;
    },
    reset() {
      count = initialValue;
      return count;
    }
  };
}

const counter = createCounter(10);
console.log('Initial value:', counter.getValue());
console.log('Increment:', counter.increment());
console.log('Increment:', counter.increment());
console.log('Decrement:', counter.decrement());
console.log('Reset:', counter.reset());
console.log('Direct access (count):', counter.count);


// 1.2 Quản lý giỏ hàng
function createCart() {
  let items = [];

  return {
    addItem(product) {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        items.push({ ...product, quantity: product.quantity || 1 });
      }
      return `Đã thêm "${product.name}" vào giỏ hàng.`;
    },
    removeItem(id) {
      const initialLength = items.length;
      items = items.filter((item) => item.id !== id);
      return items.length < initialLength
        ? `Đã xóa sản phẩm id ${id}.`
        : `Không tìm thấy sản phẩm id ${id}.`;
    },
    getTotal() {
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    getItems() {
      return items.map((item) => ({ ...item }));
    }
  };
}

const myCart = createCart();
console.log(myCart.addItem({ id: 1, name: 'Áo sơ mi', price: 250000, quantity: 2 }));
console.log(myCart.addItem({ id: 2, name: 'Quần Jeans', price: 450000, quantity: 1 }));
console.log(myCart.addItem({ id: 1, name: 'Áo sơ mi', price: 250000, quantity: 1 }));

console.log('Danh sách giỏ hàng:', myCart.getItems());
console.log('Tổng tiền:', myCart.getTotal());

console.log(myCart.removeItem(2));
console.log('Tổng tiền sau khi xóa:', myCart.getTotal());


// 1.3 Memoization
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log(`Cache hit cho input ${key}`);
      return cache[key];
    }
    console.log(`Tính toán mới cho input ${key}...`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5, 10));
console.log(memoizedAdd(5, 10));
console.log(memoizedAdd(10, 20));


// 1.4 ID Generator
function createIdGenerator(prefix = 'ID') {
  let currentId = 0;

  return function () {
    currentId += 1;
    return `${prefix}-${String(currentId).padStart(3, '0')}`;
  };
}

const generateTaskId = createIdGenerator('TASK');
const generateUserId = createIdGenerator('USER');

console.log('Task ID:', generateTaskId());
console.log('Task ID:', generateTaskId());
console.log('User ID:', generateUserId());
