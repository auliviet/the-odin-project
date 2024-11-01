export default function mergesort(array) {
  if (array.length > 1) {
    // Sort left half of the array.
    const left = mergesort(array.slice(0, Math.round(array.length / 2)));

    // Sort right half of the array.
    const right = mergesort(array.slice(Math.round(array.length / 2)));

    // Merge the two halves together.
    const merged = merge(left, right);

    return merged;
  } else {
    return array;
  }
}

function merge(a, b) {
  // Merge two sorted arrays in a single sorted array.

  const merged = [];

  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (a[i] < b[j] || typeof b[j] != "number") {
      merged.push(a[i]);
      i++;
    } else {
      merged.push(b[j]);
      j++;
    }
  }

  return merged;
}
