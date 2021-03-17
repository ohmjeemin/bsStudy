
const arrStringify = arr => {

  if(Array.isArray(arr)) { // 인자가 배열인지 체크

    const elStringify = (arr, i, acc) => {
      if (arr.length === 0) { //빈 배열일 때
        return acc;
      } else { //빈 배열이 아닐 때
        switch (typeof (arr[i])) {
          case "string" : acc += '\"' + arr[i] + '\"';
            break;
          case "number" :
          case "boolean" : acc += arr[i];
            break;
          case "object" : if (Array.isArray(arr[i])) acc += arrStringify(arr[i]);
            if (arr[i]===null) acc += null;
            break;
          case "undefined" : acc += null;
            break;
          default: throw new Error("invalid value..")
        }

        if (arr.length - 1 === i) return acc; // 배열의 마지막 요소일 때
        else acc += ","; // 배열의 마지막 요소가 아닐 때

        i++;

        return elStringify(arr, i, acc);
      }
    }

    return  "["+ elStringify(arr, 0, '') + "]";

  } else throw new Error("error");
}

// NaN, null
let arr = [1,2,3,4,'가','나','다', true, null, undefined, [2,[3,4,'하잉']], []];
console.log(arrStringify(arr));

console.log( JSON.stringify(arr)===arrStringify(arr) );
