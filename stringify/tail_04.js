
function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  let _length = 0; // 리스트에 담긴 데이터의 개수
  let _head = null; // 연결이 시작되는 지점 참조
}

LinkedList.prototype.append = function(data) {
  let node = new Node(data);
  let curr;

  if(this._head==null){ // 헤드가 null이면 _head가 새로 생성한 node를 가리키게 한다.
    this._head = node;
  }else { // 리스트가 비어있지 않은 격우에는 현재 node는 curr에 담아두고 next가 null이 되는 지점에서 루프를 끝낸다.
    curr = this._head;
    while(curr.next) {
      curr = this._head;
    }
    curr.next=node;
  }
  this._length++;
}

const arrStringify = (arr) => {

  let i = 0;
  let acc = "";
  //let stack = [];
  //let list = [];
  let prev = null;
  const _elStringify = (arr, i, acc, prev) => {
  //console.log("arr ",arr ,  "i"  , i  ,  "acc", acc);
  //   console.log("prev 3..", prev); //여까지 잘나왕..,,,,,
    let t = new Target(arr,i,acc,prev);
    console.log("t",    t);
    if (arr.length === i) { // 다 돌았을 때
      acc = acc.substr(0,acc.length-1);
      acc = "[" + acc + "]"; // 대괄호 더하기

      if (prev!==null) { // 돌아갈곳이 있을 때
      //  console.log("prev!=null");
       // console.log("prev2..", prev);
        let {arr, i, outerAcc} = prev || {}; // prev를 쪼갠다.
        outerAcc += acc;
        outerAcc += ",";
      //  console.log("outerAcc  ,, ", outerAcc);
        return _elStringify(arr, i, outerAcc,null );
      } else {
        //console.log("zz");
        return acc;
      }

    } else { // 다 안돌았을 때

      if (arr[i] instanceof Array) { // 요소가 배열일 때
        t.prev = {arr:arr, i:i+1, outerAcc:acc};
        return _elStringify(arr[i], 0, "", t);
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
        return _elStringify(arr, i, acc, prev);
      }
    }
  }
  return _elStringify(arr, i, acc, prev);
}

const arr = [1,'ㄹㄹ',[2,3,['룰루',5,6],7,8]];
console.log(arrStringify(arr));
//console.log(JSON.stringify(arr)===arrStringify(arr));
