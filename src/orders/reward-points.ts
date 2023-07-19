export function rewardPoints(price: number) {
  let points = 0;

  if (price > 100) {
    points = Math.round(price * 0.05);
  } else if (price > 1000) {
    points = Math.round(price * 0.1);
  }
  return points;
}
