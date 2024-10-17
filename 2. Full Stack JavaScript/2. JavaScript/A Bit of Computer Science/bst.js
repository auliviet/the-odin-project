class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    // Build a balanced Binary Search Tree from an array.

    // Remove duplicates and sort the array.
    this.array = Array.from(new Set(arr)).sort((a, b) => {
      return a - b;
    });
    this.root = this.buildTree(this.array);
  }

  // Build a balanced Binary Search Tree.
  buildTree(array) {
    // Calculate the middle index of the array to ensure the tree is balanced.
    let midArray = Math.floor(array.length / 2);

    // Create a new node with the middle element of the array as its value.
    let root = new Node(array[midArray]);

    // Split the array into two parts: left and right.
    let left = array.slice(0, midArray);
    let right = array.slice(midArray + 1);

    // Recursively build the left and right subtrees.
    root.left = left.length > 0 ? this.buildTree(left) : null;
    root.right = right.length > 0 ? this.buildTree(right) : null;

    return root;
  }

  // Insert a new value in the tree.
  insert(value, currentNode = this.root) {
    // Check if the value already exists in the tree to avoid duplicates.
    if (value === currentNode.data) {
      return false;
    }
    // If the value is less than the current node's value, insert it into the left subtree.
    else if (value < currentNode.data) {
      if (currentNode.left === null) {
        currentNode.left = new Node(value);
        return true;
      } else {
        return this.insert(value, currentNode.left);
      }
    }
    // If the value is greater than the current node's value, insert it into the right subtree.
    else {
      if (currentNode.right === null) {
        currentNode.right = new Node(value);
        return true;
      } else {
        return this.insert(value, currentNode.right);
      }
    }
  }

  // Delete the given value from the tree.
  deleteItem(value) {
    // Find the node to delete and its parent node.
    let nodeToDelete = this.find(value);

    // Stop the function is the node to delete is not in the tree.
    if (!nodeToDelete) {
      return null;
    }

    // If node to delete has no child node, remove it from its parent.
    // If node to delete has one child node, replace the node with its child.
    if (!nodeToDelete.left) {
      return this.shiftNodes(nodeToDelete, nodeToDelete.right);
    } else if (!nodeToDelete.right) {
      this.shiftNodes(nodeToDelete, nodeToDelete.left);
    }

    // If node to delete has two children nodes, find the next biggest node in the right sub-tree and replace the node to delete with this node.
    else {
      let successor = this.findSuccessor(nodeToDelete.right);

      if (nodeToDelete.right !== successor) {
        this.shiftNodes(successor, successor.right);
        successor.right = nodeToDelete.right;
      }

      this.shiftNodes(nodeToDelete, successor);
      successor.left = nodeToDelete.left;
    }
  }

  // Find a node with a given value in the tree.
  find(value, currentNode = this.root) {
    // Return the current node if its value matches the given value.
    if (value === currentNode.data) {
      return currentNode;
    }

    // If the value is less than the current node's value, search the left subtree.
    if (currentNode.left && value < currentNode.data) {
      return this.find(value, currentNode.left);
    }
    // If the value is greater than the current node's value, search the right subtree.
    if (currentNode.right && value > currentNode.data) {
      return this.find(value, currentNode.right);
    }

    // Return null if no node was found.
    return null;
  }

  // Find the parent of a node with a given value in the tree.
  findParent(value, currentNode = this.root) {
    // Return the current node if the value appears in its left or right children.
    if (
      (currentNode.left && currentNode.left.data === value) ||
      (currentNode.right && currentNode.right.data === value)
    ) {
      return currentNode;
    }

    // If the value is less than the current node's value, search the left subtree.
    if (currentNode.left && value < currentNode.data) {
      return this.findParent(value, currentNode.left);
    }
    // If the value is greater than the current node's value, search the right subtree.
    if (currentNode.right && value > currentNode.data) {
      return this.findParent(value, currentNode.right);
    }

    // Return null if no node was found.
    return null;
  }

  // Find the next biggest node in the tree by finding the leftmost leaf node.
  findSuccessor(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findSuccessor(node.left);
    }
  }

  // Shift nodes in the tree by replacing the nodeToDelete with the nodeToShift.
  shiftNodes(nodeToDelete, nodeToShift) {
    let parentNode = this.findParent(nodeToDelete.data);

    if (!parentNode) {
      return (this.root = nodeToShift);
    }

    if (parentNode.left === nodeToDelete) {
      return (parentNode.left = nodeToShift);
    } else {
      return (parentNode.right = nodeToShift);
    }
  }

  // Traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument.
  levelOrder(callback) {
    // Throw an error if no callback is provided
    if (!callback) {
      throw new Error("Callback function required as a parameter");
    }

    let queue = [this.root];

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }

      callback(currentNode);
    }
  }

  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
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
tree.levelOrder();
