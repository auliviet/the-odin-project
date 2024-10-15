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
    // Build a balanced Binary Search Tree
    let midArray = Math.floor(array.length / 2);
    let root = new Node(array[midArray]);

    if (midArray > 0) {
      // Check if the array is not empty before calling the recursive method to avoid having Undefined nodes in the tree

      let left = array.slice(0, midArray);
      root.left = left.length > 0 ? this.buildTree(left) : null;

      let right = array.slice(midArray + 1);
      root.right = right.length > 0 ? this.buildTree(right) : null;
    }

    return root;
  }

  insert(value, currentNode = this.root) {
    // Insert the value as a leaf node by recursively finding the appropriate position.

    if (value < currentNode.data) {
      if (currentNode.left == null) {
        currentNode.left = new Node(value);
      } else {
        this.insert(value, currentNode.left);
      }
    }
    if (value > currentNode.data) {
      if (currentNode.right == null) {
        currentNode.right = new Node(value);
      } else {
        this.insert(value, currentNode.right);
      }
    }

    return;
  }

  deleteItem(value) {
    // Delete the given value from the tree.
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

let arr = [13, 2, 33, 3, 33, 22, 12, 41, 8];

let tree = new Tree(arr);
prettyPrint(tree.root);

tree.insert(21);
tree.insert(23);
prettyPrint(tree.root);
