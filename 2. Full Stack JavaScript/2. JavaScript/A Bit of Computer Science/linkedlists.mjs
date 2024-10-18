export default class LinkedList {
  constructor() {
    this.head = new Node("Head", null);
    this.tail = new Node();
    this.size = 0;
  }

  append(value) {
    // Adds a new node containing value to the end of the list

    if (this.head.value === "Head") {
      this.head = new Node(value);
      this.tail = this.head;
      this.size++;
    } else {
      let currentNode = this.head;

      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }

      currentNode.nextNode = new Node(value);

      this.tail = currentNode.nextNode;
      this.size++;
    }
  }

  prepend(value) {
    // Adds a new node containing value to the start of the list
    let newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;
    this.size++;
  }

  insertAt(value, index) {
    // Inserts a new node with the provided value at the given index.
    let newNode = new Node(value);

    if (index < 0 || index > this.size) {
      return null;
    }

    if (index === 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
      this.size++;
    } else {
      let currentIndex = 0;
      let nodeAtIndex = this.head;

      while (currentIndex < index - 1) {
        nodeAtIndex = nodeAtIndex.nextNode;
        currentIndex++;
      }

      newNode.nextNode = nodeAtIndex.nextNode;
      nodeAtIndex.nextNode = newNode;

      if (newNode.nextNode === null) {
        this.tail = newNode;
      }
      this.size++;
    }
  }

  at(index) {
    // Returns the node at the given index

    if (index < 0 || index > this.size - 1) {
      return null;
    }

    let currentIndex = 0;
    let nodeAtIndex = this.head;

    while (currentIndex < index) {
      nodeAtIndex = nodeAtIndex.nextNode;
      currentIndex++;
    }

    return nodeAtIndex;
  }

  pop() {
    // Removes the last element from the list
    let currentNode = this.head;

    while (currentNode.nextNode != this.tail) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = null;
    this.tail = currentNode;
    this.size--;
  }

  removeAt(index) {
    // Removes the node at the given index

    if (index < 0 || index > this.size) {
      return null;
    }

    if (index === 0) {
      this.head = this.head.nextNode;
      this.size--;
    } else {
      let currentIndex = 0;
      let nodeAtIndex = this.head;

      while (currentIndex < index - 1) {
        nodeAtIndex = nodeAtIndex.nextNode;
        currentIndex++;
      }

      nodeAtIndex.nextNode = nodeAtIndex.nextNode.nextNode;

      if (nodeAtIndex.nextNode === null) {
        this.tail = nodeAtIndex;
      }
      this.size--;
    }
  }

  contains(value) {
    // Returns true if the passed in value is in the list and otherwise returns false.

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  find(value) {
    // Returns the index of the node containing value, or null if not found.
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      } else {
        currentNode = currentNode.nextNode;
        index++;
      }
    }

    return null;
  }

  toString() {
    // Represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

    let currentNode = this.head;
    let string = "";

    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    string += "(null)";

    return string;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
