import HashMap from "./hashmap.mjs";

// 1. Create a new instance of your hash map
const test = new HashMap();

// 2. Populate your hash map using the set(key, value) method.
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Hashmap: ", test.buckets);
console.log("Capacity: ", test.length / test.size);
console.log("");

// 3. Overwrite a few nodes using set(key, value). By right, this should only over-write the existing values of your nodes and not add new ones.
test.set("jacket", "crimson");
test.set("kite", "navy blue");
test.set("lion", "orange");

console.log("Hashmap: ", test.buckets);
console.log("Capacity: ", test.length / test.size);
console.log("");

// 4. Populate your hash map with the node below. Doing this will make your hash map exceed your current load factor, hence expanding your buckets and growing your hash map.
test.set("moon", "silver");

console.log("Hashmap: ", test.buckets);
console.log("Capacity: ", test.length / test.size);
console.log("");

// 5. Test each function.

console.log("Gettting the value associated with 'lion': ", test.get("lion"));
console.log("");

console.log("The hashmap contains 'jacket':", test.has("jacket"));
console.log("The hashmap contains 'panther':", test.has("panther"));
console.log("The hashmap contains 'jacket'", test.has("jacket"));
console.log("");

console.log("Remvoing the entry {'hat': 'black'}");
test.remove("hat");
console.log("Hashmap: ", test.buckets);
console.log("Capacity: ", test.length / test.size);
console.log("");

console.log("Number of stored keys in the hash map: ", test.length);
console.log("");

console.log("List of keys stored in the hashmap: ", test.keys());
console.log("");

console.log("List of values stored in the hashmap: ", test.values());
console.log("");

console.log("List of entries stored in the hashmap: ", test.entries());
console.log("");

console.log("Clearing the hashmap: ", test.clear());
console.log("Hashmap: ", test.buckets);
console.log("Capacity: ", test.length / test.size);
console.log("");
