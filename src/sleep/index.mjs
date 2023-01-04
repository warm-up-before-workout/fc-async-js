/**
 * setTimeout 대신 사용할 Promise 기반의 sleep 함수
 * setTimeout은 실패하지 않기 때문에 Promise에 reject 사용하지 않음
 */
// setTimeout(() => callback(), ms);

// callback -> 비동기
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const date1 = new Date();
await sleep(5000);
const date2 = new Date();
console.log(`Hello ${date2.getSeconds() - date1.getSeconds()}`);
