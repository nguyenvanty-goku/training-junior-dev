// Main entry point - Tổng hợp và chạy kiểm thử các module

import { fetchUsersSequential } from './modules/fetchSequential.js';
import { fetchUsersParallelAll, fetchUsersParallelSettled } from './modules/fetchParallel.js';
import { runEventLoopDemo, runClosureLoopDemo } from './modules/eventLoopExamples.js';

async function main() {
  console.log('=== BÀI TẬP VỀ NHÀ: DEV-FE-003 BT-2 ===\n');

  // 1. So sánh Fetch Tuần Tự vs Song Song
  const userIds = [1, 2, 3, 4];
  console.log(`Đang lấy thông tin cho danh sách ID: [${userIds.join(', ')}]...\n`);

  // Fetch Tuần tự
  console.log('1. Chạy Fetch Tuần Tự (Sequential)...');
  const seqResult = await fetchUsersSequential(userIds);
  console.log(`-> Kết quả: ${seqResult.results.length} users | Thời gian: ${seqResult.duration}ms\n`);

  // Fetch Song song (Promise.all)
  console.log('2. Chạy Fetch Song Song (Promise.all)...');
  const parAllResult = await fetchUsersParallelAll(userIds);
  console.log(`-> Kết quả: ${parAllResult.results.length} users | Thời gian: ${parAllResult.duration}ms\n`);

  // Fetch Song song xử lý lỗi (Promise.allSettled)
  console.log('3. Chạy Fetch Song Song có ID lỗi (Promise.allSettled)...');
  const mixedIds = [1, 2, 999, 4];
  const parSettledResult = await fetchUsersParallelSettled(mixedIds);
  console.log('-> Kết quả từng item:', parSettledResult.results);
  console.log(`-> Thời gian: ${parSettledResult.duration}ms\n`);

  // 2. Chạy Demo Event Loop & Closure
  console.log('=== DEMO EVENT LOOP & CLOSURE ===\n');
  runEventLoopDemo();

  // Đợi microtask và macrotask hoàn thành trước khi chạy demo closure
  setTimeout(() => {
    runClosureLoopDemo();
  }, 100);
}

main();
