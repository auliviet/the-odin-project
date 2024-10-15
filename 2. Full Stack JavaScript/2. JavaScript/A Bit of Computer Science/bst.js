class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    // Remove duplicates and sort the array
    this.array = Array.from(new Set(arr)).sort((a, b) => {
      return a - b;
    });
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    let midArray = Math.floor(array.length / 2);
    let root = new Node(array[midArray]);

    if (midArray > 0) {
      let left = array.slice(0, midArray);
      root.left = left.length > 0 ? this.buildTree(left) : null;

      let right = array.slice(midArray + 1);
      root.right = right.length > 0 ? this.buildTree(right) : null;
    }
    return root;
  }
}

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

// Test values

/* let array = [1, 2, 3];

let midArray = Math.floor(array.length / 2);
let left = array.slice(0, midArray);
let right = array.slice(midArray + 1);

console.log("Mid array = ", midArray);
console.log("Left = ", left);
console.log("Right = ", right); */

let arr = [13, 2, 33, 3, 33];

let tree = new Tree(arr);
prettyPrint(tree.root);
console.log(tree.buildTree([]));
