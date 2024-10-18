import Tree from "./bst.mjs";

// Print the tree in the console.
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Get a random integer between min and max
function getRandomInt(min = 0, max = 100) {
  // Ensure the min and max are inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// Test script
//

// 1. Create a binary search tree from an array of random numbers < 100.
const randArray = [];

for (let i = 0; i < getRandomInt(); i++) {
  randArray.push(getRandomInt());
}

console.log("Array of random numbers: ", randArray);
console.log("");

const tree = new Tree(randArray);
console.log("Balanced BST: ");
prettyPrint(tree.root);
console.log("");

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log("This tree is balanced: ", tree.isBalanced());
console.log("");

// 3. Print out all elements in level, pre, post, and in order.
const levelOrder = [];
tree.levelOrder((node) => levelOrder.push(node.data));
console.log("All elements in level: ", levelOrder);
console.log("");

const preOrder = [];
tree.preOrder((node) => preOrder.push(node.data));
console.log("All elements in preOrder: ", preOrder);
console.log("");

const inOrder = [];
tree.inOrder((node) => inOrder.push(node.data));
console.log("All elements in inOrder: ", inOrder);
console.log("");

const postOrder = [];
tree.postOrder((node) => postOrder.push(node.data));
console.log("All elements in postOrder: ", postOrder);
console.log("");

// 4. Unbalance the tree by adding several numbers > 100.
const newNodes = [];
for (let i = 0; i < getRandomInt(3, 5); i++) {
  newNodes.push(getRandomInt(100, 200));
}

console.log("New nodes to add: ", newNodes);
console.log("");

newNodes.forEach((value) => tree.insert(value));
console.log("Updated BST: ");
prettyPrint(tree.root);
console.log("");

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log("This tree is balanced: ", tree.isBalanced());
console.log("");

// 6. Balance the tree by calling rebalance.
tree.rebalance();
console.log("Rebalanced BST: ");
prettyPrint(tree.root);
console.log("This tree is balanced: ", tree.isBalanced());
console.log("");
