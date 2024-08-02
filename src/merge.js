function fibRec(num) {
  if (num == 0) {
    return [];
  } else if (num == 1) {
    return [0];
  } else if (num == 2) {
    return [0, 1];
  }
  let array = fibRec(num - 1);
  return array.concat(array[num - 3] + array[num - 2]);
}

function mergeSort(arr) {
  console.log(`arr ${arr}`);

  if (arr.length == 0) {
    return [];
  } else if (arr.length == 1) {
    return arr;
  } else {
    let divide = Math.floor(arr.length / 2);
    let right = mergeSort(arr.slice(divide));
    let left = mergeSort(arr.splice(0, arr.length - right.length));

    console.log(`divide ${divide}`);
    console.log(`right ${right}`);
    console.log(`left ${left}`);

    let merged = [];
    let l = 0;
    let r = 0;

    for (let i = 0; i < left.length + right.length; i++) {
      console.log("in the for loop");
      if (left[l] < right[r]) {
        console.log(`${left[l]} < ${right[r]}`);
        merged[i] = left[l];
        l++;
      } else {
        merged[i] = right[r];
        console.log(`${right[r]} < ${left[l]}`);
        r++;
      }

      if (r == right.length) {
        console.log("end of right");
        merged = merged.concat(left.slice(l));
        console.log(merged);
        return merged;
      }
      if (l == left.length) {
        console.log("end of left");
        let leftover = right.slice(r);
        console.log(
          `${leftover} is left and is array? ${Array.isArray(leftover)}`
        );
        merged = merged.concat(leftover);
        console.log(merged);
        return merged;
      }
    }
    console.log(merged);
    return merged;
  }
}

export { mergeSort };
