const arrStringify =array=> {
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

  let arr = array;
  let i = 0;
  let acc = [];
  let stack = [];

  while(true) {
    if (arr.length === i) { // 다 돌았을 때
      if (stack.length > 0) {
        let {sArr, sI, sAcc} = stack.pop();
        sAcc.push('['+finalize(acc)+']');
        i = sI;
        arr = sArr;
        acc = sAcc;
      } else {
        return '['+finalize(acc)+']';
      }
    } else { // 다 안돌았을 때
      if (arr[i] instanceof Array) { // 요소가 배열일 때
          stack.push({sArr: arr, sI: i+1, sAcc: acc});
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
