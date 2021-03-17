

//[1,2,3,가]
const loopStringify = arr => {

  let acc="";
  let stack= arr;
  let stack2=[];

  let result=""

  for(let i=0; i<arr.length; i++){

   if(stack2.length>0) {
     console.log("ff", result);
     console.log("stackc에 먼가이따")
     // console.log(stack2.pop());
       let acc2 =checkType(acc, stack2.pop(), stack2);
       console.log(acc2, "acc2")
       result+=acc2;

   }else {
     console.log("업따")
     if (arr.length - 1 === i) result += checkType(acc, arr[i], stack2);
     else result += checkType(acc, arr[i], stack2) + ",";
   }
   // if(stack.pop()===arr[i]) {console.log("같다")}
  //  else {console.log("ㄷㅏ르다다")}
    //  // 배열의 마지막 요소일 때
    //  // 배열의 마지막 요소가 아닐 때
  }
  return "["+result+"]";
}

const checkType = (acc, el, stack2) =>  {

  console.log(stack2);
  switch (typeof(el)) {

    case "string" :
      acc += '\"' + el + '\"';
      break;
    case "number" :
    case "boolean" :
      acc += el;
      break;
    case "object" :
      if (Array.isArray(el)) {
        if(stack2.length>1) {
          checkType()
        }else {
        stack2.push(el);
        }
        acc += el;
        acc= "["+acc+"]"
        console.log(stack2);
       //  console.log("kk", acc);
       // acc= "["+acc+"]"
       //  console.log("kk22", acc);
       //  stack2.pop()
      }
      if (el === null) acc += null;
      break;
    case "undefined" :
      acc += null;
      break;
    default:
      throw new Error("invalid value..")
    }

  return acc;
}

const arr = [1,2,[3,4,[5]],'가','나'];
console.log(loopStringify(arr));
