export default function analyzeArray(array) {
  function getAverage() {
    let sum = 0;
    array.forEach((element) => {
      sum += element;
    });
    return sum / array.length;
  }

  return {
    min: Math.min(...array),
    max: Math.max(...array),
    average: getAverage(),
    length: array.length,
  };
}
