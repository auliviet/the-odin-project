export default class HashMap {
  constructor() {
    this.size = 16;
    this.loadfactor = 0.75;
    this.length = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new Array());
  }

  hash(key) {
    // Return a hash code based on an input key.

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  bucket(key) {
    // Return the bucket to store the key and value pair based on the hash code.

    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[index];
  }

  entry(key, bucket) {
    // Return the key value pair associated with a key.

    for (let entry of bucket) {
      if (key === entry.key) {
        return entry;
      }
    }

    return null;
  }

  set(key, value) {
    // Add a new key value pair to the HashMap.

    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      entry.value = value;
      return;
    } else {
      bucket.push({ key, value });
      this.length++;
      this.grow();
    }
  }

  get(key) {
    // Return the value associated with a key.

    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      return entry.value;
    } else {
      return null;
    }
  }

  has(key) {
    // Check if a key is present in the HashMap.

    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    // Remove a key value pair from the HashMap.

    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      let index = bucket.indexOf(key);
      bucket.splice(index, 1);
      this.length--;
      return true;
    } else {
      return false;
    }
  }

  length() {
    // Return the number of entries in the HashMap.
    return this.length;
  }

  clear() {
    // Remove all key value pairs from the HashMap but conserves its size.

    this.length = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new Array());
  }

  keys() {
    // Return the list of keys present in the HashMap.

    let keys = [];

    for (let bucket of this.buckets) {
      bucket.map((entry) => {
        if (entry.key) {
          keys.push(entry.key);
        }
      });
    }

    return keys;
  }

  values() {
    // Return the list of values present in the HashMap.

    let values = [];

    for (let bucket of this.buckets) {
      bucket.map((entry) => {
        if (entry.value) {
          values.push(entry.value);
        }
      });
    }

    return values;
  }

  entries() {
    // Return the list of key value pairs present in the HashMap.

    let entries = [];
    let keys = this.keys();
    let values = this.values();

    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], values[i]]);
    }

    return entries;
  }

  grow() {
    // Doubles the size of the HashMap when the load factor is reached.

    if (this.length / this.size > this.loadfactor) {
      let entries = this.entries();
      this.size *= 2;
      this.clear();

      for (let entry of entries) {
        this.set(entry[0], entry[1]);
      }
    }
  }
}
