


const arrStringify = arr => {
  return (function _elStringify(arr, i, acc, stack){

    if (arr.length === i) { // 다 돌았을 때
      if (stack.length > 0) { // 돌아갈곳이 있을 때
        let {arr, i, outerAcc} = stack.pop(); // stack에서 꺼내서
        outerAcc.push('['+acc.join()+']');
        return _elStringify(arr, i, outerAcc, stack);
      } else {
        return '['+acc.join()+']';
      }

    } else { // 다 안돌았을 때

      if (arr[i] instanceof Array) { // 요소가 배열일 때
        stack.push({arr: arr, i: i + 1, outerAcc: acc});
        return _elStringify(arr[i], 0, [], stack);
      } else { // 요소가 배열이 아닐 때
        switch (typeof (arr[i])) {
          case "string" :
            acc.push('\"'+arr[i]+'\"');
            break;
          case "number" :
            acc.push(arr[i]);
            break;
          case "undefined" :
            acc.push(null);
            break;
          default :
            throw new Error("type error...");
        }
        return _elStringify(arr, i+1, acc, stack);
      }
    }
  })(arr, 0, [], []);
}

const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
