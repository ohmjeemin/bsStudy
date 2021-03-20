


const arrStringify = (arr) => {

  let i = 0;
  let acc = "";
  let stack = [];
  //let list = [];
  let prev = {};
  const _elStringify = (arr, i, acc, prev) => {

   console.log("pre11v..", prev); //여까지 잘나왕..,,,,,
    if (arr.length === i) { // 다 돌았을 때
      acc = acc.substr(0,acc.length-1);
      acc = "[" + acc + "]"; // 대괄호 더하기
     // console.log("prev??,,,,",prev);
      if (prev!==null) { // 돌아갈곳이 있을 때
        console.log("prev!=null");
        //console.log("prrr", prev);
        let {arr, i, outerAcc} = prev; // prev를 쪼갠다.
        outerAcc += acc;
        outerAcc += ",";
        //console.log("outerAcc  ,, ", outerAcc);
        return _elStringify(arr, i, outerAcc, null);
      } else {
        //console.log("zz");
        return acc;
      }

    } else { // 다 안돌았을 때

      if (arr[i] instanceof Array) { // 요소가 배열일 때
        //stack.push({arr: arr, i: i + 1, outerAcc: acc});
        prev = {arr:arr[i], i:i+1, outerAcc:acc}; //prev에 현재 배열 넣고 재귀호출
       //  console.log("prev...", prev);
        return _elStringify(arr[i], 0, "", prev);
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
      //  acc+= (arr.length-1===i) ? ",": "";
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
//console.log(JSON.stringify(arr)===arrStringify(arr));
