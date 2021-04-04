const arrStringify = (()=>{
  const elStringify=(()=>{
    const valueForType = v=>{
      switch (typeof v) {
        case "string" : return '\"'+v+'\"';
        case "number" : return v;
        case "undefined" : return null;
        default : throw new Error("type error...");
      }
    };
    const finalize = acc => {
      acc = acc.reduce((result,v)=>result+v+',', "");
      acc = acc.substr(0,acc.length-1);
      return acc;
    }
    return (arr, i, acc, stack)=>{
      if (arr.length === i) { // 다 돌았을 때
        if (stack.length > 0) {  // 돌아갈곳이 있을 때
          let {arr, i, outerAcc} = stack.pop(); // stack에서 꺼내서
          outerAcc.push('['+finalize(acc)+']')
          return elStringify(arr, i, outerAcc, stack);
        } else {
          return '['+finalize(acc)+']';
        }
      } else { // 다 안돌았을 때
        if (arr[i] instanceof Array) { // 요소가 배열일 때
          stack.push({arr: arr, i: i+1, outerAcc: acc});
          return elStringify(arr[i], 0, [], stack);
        } else { // 요소가 배열이 아닐 때
          acc.push(valueForType(arr[i]));
          return elStringify(arr, i+1, acc, stack);
        }
      }
    };
  })();
  const arrStringify = arr=>elStringify(arr, 0, [], []);
  return arrStringify;
})();

// let a = new Array(100)
const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(JSON.stringify(arr)===arrStringify(arr));
