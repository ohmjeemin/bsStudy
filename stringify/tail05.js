const arrStringify =array=> {

  let stack = [{arr:array, i:0, acc:[]}];

  do {
    let {arr, i, acc} = stack.pop();

    if(arr.length===i){ // 다 돌았을 때
      if(stack.length>0){ // 돌아갈 데가 있을 때
        let {arr, i, acc:outerAcc} = stack.pop();
        outerAcc.push('['+acc.join()+']');
        stack.push({arr,i:i+1,acc:outerAcc})
      }else { // 완전 끝일 때
        return '['+acc.join()+']';
      }

    }else{ // 아직 도는중일때
      if(arr[i] instanceof Array) { // 배열일때
        stack.push({arr:arr, i:i, acc:acc});
        stack.push({arr:arr[i], i:0, acc:[]});
      }else { // 배열이 아닐 때
        switch (typeof (arr[i])) {
          case "string" :
            acc.push('\"'+arr[i]+'\"');
            stack.push({arr, i:i+1, acc});
            break;
          case "number" :
            acc.push(arr[i]);
            stack.push({arr, i:i+1, acc});
            break;
          case "undefined" :
            acc.push(null);
            stack.push({arr, i:i+1, acc});
            break;
          default :
            throw new Error("type error...");
        }
      }
    }
  } while(stack.length>0)

}




//const arr = [1,2,3,4,5]
const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
console.log(JSON.stringify(arr)===arrStringify(arr));
