//1. 배열인지 아닌지
//2. 배열의 끝인지 아닌지
//3. 완전 끝인지, 돌아갈 곳이 있는지

const arrStringify = arr => {
  let stack=[];
  let i =0;
  let acc="";
  let prev=null;

  const elStringify= (arr,i,acc,prev)=> {
    console.log(i, acc);
    console.log(stack);
    if(arr.length>i) { // i가 arr.length보다 작을때 5.4까지 되고 5.5는 안됨

      if (arr[i] instanceof Array) { // 요소가 배열인 경우

        if(arr.length-1===i){ //마지막일 때
          if(stack.length>0){ // 가짜 마지막
            acc+=arr[i];
            let {arr, i, outAcc} = stack.pop(); //stack pop해서 객체구조분해
            outAcc += acc; //acc를 상위 acc에게 더함
            prev=stack.pop();
            return elStringify(arr, i, outAcc, prev); // 그 다음꺼를 진행한다.
          }else{ //진짜 마지막
            return arr[i]+=acc;
          }
        }else{ // 마지막이 아닐 때
          stack.push({arr:arr, i:i+1, outAcc:acc}); // 현재 상태를 넣는다.
          prev = arr; // 현재 배열을 prev에 넣는다.
          return elStringify(arr[i],0,"", prev); // 배열을 만나서 재귀 호출할 때 상위 배열을 갖고 간다.
        }

      } else { // 요소가 배열이 아닌 경우
        console.log(stack);
        switch (typeof (arr[i])) {
          case "string":
            acc += '\"' + arr[i] + '\"';
            break;
          case "boolean" :
          case "number":
            acc += arr[i];
            break;
          case "undefined" :
            acc += null;
            break;
          default:
            throw new Error("invalid value...")
        }
        acc+=","
        i++;
        return elStringify(arr, i, acc, prev); // 왜 인자에 증가하면 안되니?
      }
    } else throw new Error("invalid")
  } //end of elStringify
  return elStringify(arr,i,acc,prev);
} //end of stringify


const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
