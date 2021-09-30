let runThis = "5 7 -"

let program = [];
let memory = [];

program = runThis.split(" ");
for(let i = 0; i < program.length; i++) {
  //push numbers directly into the stack
  if(program[i].match("[0-9]") != null){
    memory.push(program[i])
  }
  //addition
  if(program[i] == "+"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.push(a+b+"")
  }
  //subtration
  if(program[i] == "-"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.push(a-b+"")
  }
  //multiplication
  if(program[i] == "*"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.push(a*b+"")
  }
  //division
  if(program[i] == "/"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.push(a/b+"")
  }
  //load from stack index
  if(program[i]=="load") {
    let a = +memory[memory.length - 1]
    memory.splice(memory.length - 1, 1)
    memory.push(memory[a])
  }
}
console.log(memory)
