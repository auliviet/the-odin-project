class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
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

  // Traverse the tree in depth-first level order, visiting the left node first, then the root and then the right node, and call the callback on each node as it traverses, passing the whole node as an argument.
  inOrder(callback, node = this.root) {
    // Throw an error if no callback is provided
    if (!callback) {
      throw new Error("Callback function required as a parameter");
    }

    // Base case for the recursive function
    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  // Traverse the tree in depth-first level order, visiting the root node first, then the left node and then the right, and call the callback on each node as it traverses, passing the whole node as an argument.
  preOrder(callback, node = this.root) {
    // Throw an error if no callback is provided
    if (!callback) {
      throw new Error("Callback function required as a parameter");
    }

    // Base case for the recursive function
    if (node === null) {
      return;
    }

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  // Traverse the tree in depth-first level order, visiting the left node first, then the right node and then the root, and call the callback on each node as it traverses, passing the whole node as an argument.
  postOrder(callback, node = this.root) {
    // Throw an error if no callback is provided
    if (!callback) {
      throw new Error("Callback function required as a parameter");
    }

    // Base case for the recursive function
    if (node === null) {
      return;
    }

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  // Return the given node’s height, the number of edges in the longest path from a given node to a leaf node.
  height(node = this.root) {
    // Base case, return when a leave node is found.
    if (!node.left && !node.right) {
      return 0;
    }

    // Compare the height of the left subtree to the right subtree, returns the highest and add 1.
    else {
      let left = node.left ? this.height(node.left) : 0;
      let right = node.right ? this.height(node.right) : 0;

      return left > right ? 1 + left : 1 + right;
    }
  }

  // Return the given node's depth, the number of edges in the path from a given node to the tree’s root node.
  depth(node, currentNode = this.root) {
    // Throw an error if no node is provided
    if (!node) {
      throw new Error("Node required as a parameter");
    }

    // Base case, return -1 when reaching an empty node.
    if (currentNode === null) {
      return -1;
    }

    // If the current node corresponds to the given node, return 0.
    if (currentNode === node) {
      return 0;
    }

    // Check if the given node is in the left or right subtree. Add 1 for each node in the path between the root and the given node.
    else {
      let left = this.depth(node, currentNode.left);
      let right = this.depth(node, currentNode.right);

      let depth = left > right ? left : right;

      // If depth >= 0, the given node has been found.
      return depth >= 0 ? depth + 1 : -1;
    }
  }

  // Check if the tree is balanced (the difference between heights of the left subtree and the right subtree of every node is not more than 1).
  isBalanced(node = this.root) {
    // Check height of left and right subtrees
    let leftHeight = node.left ? this.height(node.left) : 0;
    let rightHeight = node.right ? this.height(node.right) : 0;

    // If height difference > 2, return false.
    if (leftHeight - rightHeight < -1 || leftHeight - rightHeight > 1) {
      return false;
    }

    return true;
  }

  // Rebalances an unbalanced tree.
  rebalance() {
    // If the tree is already balanced, stops the execution.
    if (this.isBalanced()) {
      return;
    }

    // Create a sorted array from the nodes of the current tree.
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));

    // Re-build a Tree with this array.
    this.root = this.buildTree(nodes);
  }
}
