import { mergeSort } from "./merge";

function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(array) {
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) {
      console.log("null!!!");
      return null;
    }

    let mid = parseInt((end + start) / 2);

    console.log(`start ${start} value ${arr[start]}`);
    console.log(`end ${end} value ${arr[end]}`);
    console.log(`mid ${mid} value ${arr[mid]}`);

    let newNode = Node(arr[mid]);
    newNode.left = buildTree(arr, start, mid - 1);
    newNode.right = buildTree(arr, mid + 1, end);

    console.log(`new node data is ${newNode.data}`);
    return newNode;
  };

  const removeDupes = (arrayray) => {
    for (let i = 0; i < arrayray.length; i++) {
      if (arrayray[i] == arrayray[i + 1]) {
        arrayray.splice(i, 1);
      }
    }
    return arrayray;
  };

  let sortedArray = mergeSort(array);
  let noDupesArray = removeDupes(sortedArray);
  let root = buildTree(noDupesArray);
  let rebalanceArray = [];

  const insert = (value, checkNode = root) => {
    if (checkNode == null) {
      checkNode = Node(value);
      console.log(
        `inserting ${value}... checkNode.data is ${checkNode.data} and left is ${checkNode.left}`
      );
      return checkNode;
    }
    if (value < checkNode.data) {
      checkNode.left = insert(value, checkNode.left);
    } else if (value > checkNode.data) {
      checkNode.right = insert(value, checkNode.right);
    } else if (value == checkNode.data) {
      console.log("sorry can't insert, it already exists");
    }

    return checkNode;
  };

  const findLeftLeaf = (startingNode) => {
    if (startingNode.left == null) {
      console.log(`leftmost leaf is ${startingNode.data}`);
      return startingNode;
    }
    return findLeftLeaf(startingNode.left);
  };

  const find = (value, startingNode = root) => {
    if (startingNode == null) {
      //do nothing
    } else if (startingNode.data == value) {
      return startingNode;
    } else if (value < startingNode.data) {
      return find(value, startingNode.left);
    } else if (value > startingNode.data) {
      return find(value, startingNode.right);
    }
  };

  const treeToArray = (node) => {
    let newArray = [];
    console.log(node.data);
    if (node.left == null && node.right == null) {
      newArray = newArray.concat(node.data);

      return newArray;
    }
    if (node.left != null) newArray = newArray.concat(treeToArray(node.left));
    newArray = newArray.concat(node.data);
    if (node.right != null) newArray = newArray.concat(treeToArray(node.right));

    console.log(newArray);
    return newArray;
  };

  const deleteItem = (
    value,
    currentNode = root,
    prevNode = root,
    direction = ""
  ) => {
    console.log(
      `DeleteItem (${value},${currentNode.data},${prevNode.data},${direction})`
    );

    //which path did the previous node come
    // let direction = "left";
    // if (prevNode.data < currentNode.data) {
    //   direction = "right";
    // }

    //found the value
    if (currentNode.data == value) {
      //it's a leaf, just delete it
      if (currentNode.left == null && currentNode.right == null) {
        console.log("its a leaf! lets delete it");
        console.log(`direction is ${direction}`);
        console.log(`prevNode is ${prevNode.data}`);
        if (direction == "right") {
          prevNode.right = null;
        } else {
          prevNode.left = null;
        }
        return root;
      }

      //it only has left subtree
      else if (currentNode.left != null && currentNode.right == null) {
        console.log("only has left subtree");
        if (direction == "right") {
          prevNode.right = currentNode.left;
        } else {
          prevNode.left = currentNode.left;
        }
      }

      //it only has right subtree
      else if (currentNode.left == null && currentNode.right != null) {
        console.log("only has right subtree");
        if (direction == "right") {
          prevNode.right = currentNode.right;
          console.log(`${prevNode.data}.right = ${currentNode.data}.right`);
        } else {
          prevNode.left = currentNode.right;
        }
      }

      //it has two subtrees
      else if (currentNode.left != null && currentNode.right != null) {
        console.log("it has two subtrees!");
        //find next biggest node
        let foundLeaf = findLeftLeaf(currentNode.right);
        currentNode.data = foundLeaf.data;
        foundLeaf.data = value;
        prettyPrint(root);
        deleteItem(value, currentNode.right, currentNode, "right");
      }
      return root;
    }

    //traverse the left tree
    else if (value < currentNode.data) {
      deleteItem(value, currentNode.left, currentNode, "left");
    }

    //traverse right tree
    else if (value > currentNode.data) {
      deleteItem(value, currentNode.right, currentNode, "right");
    }
  };

  const levelOrder = (callback, queue = [root]) => {
    if (callback == null) {
      throw new Error("you need a callback function");
    }
    //use push and shift
    if (queue.length == 0) {
      return;
    }
    if (queue != []) {
      let node = queue[0];
      callback(node);
      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
      queue.shift();
      levelOrder(callback, queue);
    }
  };

  const preOrder = (callback, queue = [root]) => {
    if (queue.length == 0) {
      return;
    } else {
      let node = queue[0];
      callback(node);
      queue.shift();
      if (node.left != null) {
        queue.push(node.left);
        preOrder(callback, queue);
      }
      if (node.right != null) {
        queue.push(node.right);
        preOrder(callback, queue);
      }
      return;
    }
  };

  const inOrder = (callback, stack = [root]) => {
    let top = stack.length - 1;
    let node = stack[top];
    if (node.left == null && node.right == null) {
      callback(node);
      stack.pop();
      return;
    }
    if (node.left != null) {
      stack.push(node.left);
      inOrder(callback, stack);
    }
    callback(node);
    stack.pop();
    if (node.right != null) {
      stack.push(node.right);
      inOrder(callback, stack);
    }
    return;
  };

  const postOrder = (callback, stack = [root]) => {
    let top = stack.length - 1;
    let node = stack[top];
    if (node.left == null && node.right == null) {
      callback(node);
      stack.pop();
    } else {
      if (node.left != null) {
        stack.push(node.left);
        postOrder(callback, stack);
      }
      if (node.right != null) {
        stack.push(node.right);
        postOrder(callback, stack);
      }
      callback(node);
      stack.pop();
    }
  };

  const height = (node, count = 0, maxcount = 0) => {
    console.log(
      `count is ${count} maxcount is ${maxcount} node is ${node.data}`
    );
    if ((node.left == null) & (node.right == null)) {
      if (count > maxcount) {
        maxcount = count;
      }
      count = 0;
      return maxcount;
    } else {
      if (node.left != null) {
        count++;
        maxcount = height(node.left, count, maxcount);
        count = 0;
      }
      if (node.right != null) {
        count++;
        maxcount = height(node.right, count, maxcount);
        count = 0;
      }

      return maxcount;
    }
  };

  const depth = (node, pointer = root, count = 0) => {
    if (pointer == node) {
      return count;
    } else {
      if (node.data > pointer.data) {
        count++;
        return depth(node, pointer.right, count);
      } else if (node.data < pointer.data) {
        count++;
        return depth(node, pointer.left, count);
      }
    }
  };

  const isBalanced = () => {
    console.log(`root.data ${root.data}`);
    let diff = Math.abs(height(root.right) - height(root.left));
    if (diff > 1) return false;
    else return true;
  };

  const rebalance = () => {
    rebalanceArray = [];
    inOrder(addToArray);
    //console.log(rebalanceArray);
    console.log(rebalanceArray);
    let newRoot = buildTree(rebalanceArray);
    root.data = newRoot.data;
    root.left = newRoot.left;
    root.right = newRoot.right;
  };

  const addToArray = (node) => {
    rebalanceArray.push(node.data);
  };

  return {
    root,
    insert,
    findLeftLeaf,
    find,
    treeToArray,
    deleteItem,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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

//TESTING///////////////////////////////////////
let newArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newTree = Tree(newArray);
// prettyPrint(newTree.root);
newTree.insert(54);
newTree.insert(55);
newTree.insert(56);
newTree.insert(57);
newTree.insert(58);
prettyPrint(newTree.root);
// console.log(newTree.findLeftLeaf(newTree.root));
// console.log(newTree.find(67));
// console.log(newTree.treeToArray(newTree.root));

newTree.deleteItem(4);
prettyPrint(newTree.root);
//  prettyPrint(newTree.find(9));

function printNode(node) {
  console.log(node.data);
}
// newTree.levelOrder(printNode);
//newTree.preOrder(printNode);
//newTree.inOrder(printNode);
//newTree.postOrder(printNode);
// let myNode = newTree.find(6345);
// prettyPrint(myNode);
// console.log(`height ${newTree.height(myNode)}`);
// console.log(`depth ${newTree.depth(myNode)}`);
console.log(`is balanced ${newTree.isBalanced()}`);
newTree.rebalance();
prettyPrint(newTree.root);
console.log(`is balanced ${newTree.isBalanced()}`);
