// Module minh họa thứ tự thực thi Event Loop & Closure

export function runEventLoopDemo() {
  console.log('--- Event Loop Log Order Demo ---');

  console.log('1. Synchronous Start');

  setTimeout(() => {
    console.log('2. Macrotask (setTimeout 0ms)');
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log('3. Microtask 1 (Promise.then)');
    })
    .then(() => {
      console.log('4. Microtask 2 (Chained Promise)');
    });

  queueMicrotask(() => {
    console.log('5. Microtask 3 (queueMicrotask)');
  });

  console.log('6. Synchronous End');
}

export function runClosureLoopDemo() {
  console.log('--- Closure Loop Demo (var vs let) ---');

  // Vấn đề với var (dùng chung biến i trong function scope)
  console.log('Vòng lặp var:');
  for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log('var i =', i); // In ra 4, 4, 4
    }, 10);
  }

  // Khắc phục với let (Block scope tạo binding mới cho mỗi vòng lặp)
  setTimeout(() => {
    console.log('Vòng lặp let:');
    for (let j = 1; j <= 3; j++) {
      setTimeout(() => {
        console.log('let j =', j); // In ra 1, 2, 3
      }, 10);
    }
  }, 50);
}
