import LinkedList from "./linkedlists.mjs";

// 1. Create an instance of your LinkedList and populate it with nodes.
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

// 2. Add console.log(list.toString()); to the end of the file and run it.
console.log("Initial linked list:");
console.log(list.toString());
console.log("");

// 3. Test each function.
console.log("Append dolphin:");
list.append("dolphin");
console.log(list.toString());
console.log("");

console.log("Prepend shark:");
list.prepend("shark");
console.log(list.toString());
console.log("");

console.log("List size: ", list.size);
console.log("");

console.log("List head: ", list.head);
console.log("");

console.log("List tail: ", list.tail);
console.log("");

console.log("Node at index 4: ", list.at(4));
console.log("");

console.log("Remove the last element from the list:");
list.pop();
console.log(list.toString());
console.log("");

console.log("The list contains 'dog': ", list.contains("dog"));
console.log("The list contains 'llama': ", list.contains("llama"));
console.log("");

console.log("The item 'dog' is at index: ", list.find("dog"));
console.log("");

console.log("Insert 'llama' at index 4:");
list.insertAt("llama", 4);
console.log(list.toString());
console.log("");

console.log("Remove item at index 3:");
list.removeAt(3);
console.log(list.toString());
console.log("");
