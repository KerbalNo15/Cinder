let output = []
let variableMap = new Map; //memory map

let program = "a=10;b=1;b=a;".split(";")
for(let i = 0; i < program.length; i++){
  let element = program[i]
  //number assignment
  if(element.match("[a-zA-Z]=[0-9]")){
    let statement = element.split("=")
    variableMap.set(statement[0], output.length)
    output.push(statement[1])
  }
  //number assignment by variable
  if(element.match("[a-zA-Z]=[a-zA-Z]")){
    let statement = element.split("=")
    output.push("load")
    output.push(variableMap.get(statement[1]))
    output.push("store")
    output.push(variableMap.get(statement[0]))
  }
  if(element.match("if([a-zA-Z])")){
    console.log("If statement")
  }

}
  console.log(output.join(" "))
