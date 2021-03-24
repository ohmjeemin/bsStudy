
const arrStringify =arr=> {

  let i = 0;
  let acc = "";
  let prev = {arr:arr, i:i, outerAcc:acc, prev2:null};

  const _elStringify = (arr, i, acc, prev) => {

    if (arr.length === i) { // 다 돌았을 때
      acc = acc.substr(0,acc.length-1);
      acc = "[" + acc + "]"; // 대괄호 더하기

      if (prev.prev2!==null) { // 완전 끝
        let {arr, i, outerAcc, prev2} = prev;
        outerAcc += acc;
        outerAcc += ",";
        return _elStringify(arr, i, outerAcc, prev2);
      } else { // 완전 끝이 아닐 때
       return acc;
      }

    } else { // 다 안돌았을 때

      if (arr[i] instanceof Array) { // 요소가 배열일 때
        prev = {arr:arr, i:i+1, outerAcc:acc, prev2:prev}; // 현재 상황을 넣어놓고
        return _elStringify(arr[i], 0, "", prev); // 이걸 다음 호출에 넣어줘
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
        return _elStringify(arr, i, acc, prev);
      }
    }
  }
  return _elStringify(arr, i, acc, prev);
}

const arr = [1,'ㄹㄹ',[2,3,['룰루',1,2,[3,[],4,5],6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
