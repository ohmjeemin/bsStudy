//1. 배열인지 아닌지
//2. 배열의 끝인지 아닌지
//3. 완전 끝인지, 돌아갈 곳이 있는지

const arrStringify = arr => {
  let stack=[];
  let i =0;
  let acc="";
  let prev=null;

  const elStringify= (arr,i,acc,prev)=> {
    //console.log(acc);
    //let el = arr[i];

    if(arr.length-1===i) { //마지막 요소 일 때

      if(stack.length>0) { //stack 에 뭔가 담겨 있음:: 완전 끝은 아님
        console.log("11")

        acc+=arr[i];
        let {arr, i, outAcc} = stack.pop(); //stack pop해서 객체구조분해
        outAcc += acc; //acc를 상위 acc에게 더함
        prev=stack.pop();
        return elStringify(arr, i, outAcc, prev); // 그 다음꺼를 진행한다.

      }else { //stack에 담겨있지 않음:: 완전 끝
        console.log("22")
       // console.log("끝..")
        //console.log("acc", acc);
        return acc;
      }

    }else { //마지막 요소가 아닐 때
        //console.log(arr[i]);
        if(arr[i] instanceof Array) { // 배열
          console.log("33")
          stack.push({arr:arr, i:i+1, outAcc:acc}); // 현재 상태를 넣는다.
          prev = arr; // 현재 배열을 prev에 넣는다.

          return elStringify(arr[i],0,"", prev); // 배열을 만나서 재귀 호출할 때 상위 배열을 갖고 간다.

        }else { // 배열이 아님
          console.log("44");
          switch (typeof (arr[i])) {
            case "string": acc += '\"' +arr[i]+ 'dadasdsdasdsads\"';
              break;
            case "boolean" :
            case "number": acc += arr[i];
              break;
            case "undefined" : acc += null;
              break;
            default:
              throw new Error("invalid value...")
          }

          i++; // index 증가하기

          return elStringify(arr, i, acc, prev);
        }
    }
  } //end of elStringify
  return elStringify(arr,i,acc,prev);
} //end of stringify


const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
