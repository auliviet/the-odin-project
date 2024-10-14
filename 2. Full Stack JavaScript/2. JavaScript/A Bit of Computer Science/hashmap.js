export default class HashMap {
  constructor() {
    this.size = 16;
    this.loadfactor = 0.75;
    this.length = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new Array());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  bucket(key) {
    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[index];
  }

  entry(key, bucket) {
    for (let entry of bucket) {
      if (key === entry.key) {
        return entry;
      }
    }

    return null;
  }

  set(key, value) {
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
    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      return entry.value;
    } else {
      return null;
    }
  }

  has(key) {
    let bucket = this.bucket(key);
    let entry = this.entry(key, bucket);

    if (entry) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
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
    return this.length;
  }

  clear() {
    this.length = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new Array());
  }

  keys() {
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
    let entries = [];
    let keys = this.keys();
    let values = this.values();

    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], values[i]]);
    }

    return entries;
  }

  grow() {
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
