


const arrStringify = arr => {

  let i = 0;
  let acc = "";
  let stack = [];

  const _elStringify = (arr, i, acc) => {

    if (arr.length === i) { // 다 돌았을 때
      acc = acc.substr(0,acc.length-1);
      acc = "[" + acc + "]"; // 대괄호 더하기

      if (stack.length > 0) { // 돌아갈곳이 있을 때
        let {arr, i, outerAcc} = stack.pop(); // stack에서 꺼내서
        outerAcc += acc;
        outerAcc += ",";
        return _elStringify(arr, i, outerAcc);
      } else {
        return acc;
      }

    } else { // 다 안돌았을 때

      if (arr[i] instanceof Array) { // 요소가 배열일 때
        stack.push({arr: arr, i: i + 1, outerAcc: acc});
        return _elStringify(arr[i], 0, "");
      } else { // 요소가 배열이 아닐 때
        switch (typeof (arr[i])) {
          case "string" :
            acc += '\"'+arr[i]+'\"';
            break;
          case "number" :
            acc += arr[i];
            break;
          case "undefined" :
            acc += null;
            break;
          default :
            throw new Error("type error...");
        }
        acc+=",";
        i++;
        return _elStringify(arr, i, acc);
      }
    }
  }
  return _elStringify(arr, i, acc);
}

const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
