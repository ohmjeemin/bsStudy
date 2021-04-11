const objStringify =object=> {
  const vToString=(k,v)=>{
    switch (typeof v) {
      case "string" : return `"${k}":"${v}"`;
      case "number" : return `"${k}":${v}`
      case "undefined" : return `"${k}":null`
      case "boolean" : return `"${k}":${v}`
      default :
        throw new Error("type error...");
    }
  }
  const finalize=v=>{
    v = v.reduce((sum,str) =>sum+str+",",'{');
    v = v.substr(0,v.length-1)+'}';
    return v
  }

  let obj = object;
  let i = 0;
  let acc = [];
  let stack = [];

  while(true) {
    if (obj.keys.length=== i) { // 다 돌았을 때
      if (stack.length > 0) {
        let {sObj, sI, sAcc} = stack.pop();
        sAcc.push('['+finalize(obj)+']');
        i = sI;
        obj = sOv;
        acc = sAcc;
      } else {
        return '['+finalize(acc)+']';
      }
    } else { // 다 안돌았을 때
      if (arr[i] instanceof Array) { // 요소가 배열일 때
          stack.push({sObj: arr, sI: i+1, sAcc: acc});
          arr = arr[i];
          i = 0;
          acc = [];
      } else { // 요소가 배열이 아닐 때
          acc.push(valueForType(arr[i]));
          i = i+1;
      }
    }

  }

}



// const arr = new Array(10);
//const arr = [1,2,3,4,5]
const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
