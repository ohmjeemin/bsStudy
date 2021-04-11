



//"{"4":44,"a":1,"b":"bb","c":false}"
let obj = {
  a:1,
  b:"bb",
  c:false,
  4:44
}

const stringify = (() =>{
  const objStringify=(()=>{
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
    return (obj,i,acc)=>{
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let data = obj[key];
          console.log(vToString(key, data));
          acc.push(vToString(key, data))
        }
      }
      return finalize(acc);
    }
  })();
  const stringify=obj=>objStringify(obj,0,[]);
  return stringify;
})();

console.log(stringify(obj)===JSON.stringify(obj));
