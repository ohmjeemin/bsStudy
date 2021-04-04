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

  let stack = [];
  let curr = {arr:array, i:0, acc:[]}; // 현재 배열

  do {
    let {arr, i, acc} = curr;
    if(arr.length===i){ // 다 돌았을 때
      if(stack.length>0){ // 돌아갈 데가 있을 때
        let {arr, i, acc:outerAcc} = stack.pop();
        outerAcc.push('['+finalize(acc)+']');
        stack.push({arr,i:i+1,acc:outerAcc})
      }else { // 완전 끝일 때
        return '['+finalize(acc)+']';
      }

    }else{ // 아직 도는중일때
      if(arr[i] instanceof Array) { // 배열일때
        stack.push({arr:arr, i:i, acc:acc});
        stack.push({arr:arr[i], i:0, acc:[]});
      }else { // 배열이 아닐 때
        acc.push(valueForType(arr[i]));
        stack.push({arr:arr, i:i+1, acc:acc})
      }
    }
    curr = stack.pop();
  } while(curr)

}



// const arr = new Array(10);
//const arr = [1,2,3,4,5]
const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
