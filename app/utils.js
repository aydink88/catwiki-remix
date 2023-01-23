export function getRandomNumbers(howMany, range) {
  const nums = [];
  do {
    let n = Math.floor(Math.random() * range);
    if (!nums.includes(n)) {
      nums.push(n);
    }
  } while (nums.length < howMany);
  return nums;
}

//generate cat properties rating html
export function generateRating(score) {
  const el = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      el.push(true);
    } else {
      el.push(false);
    }
  }
  return el;
}
