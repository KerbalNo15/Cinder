runThis = "5 5 * 0 load *"

program = [];
memory = [];

program = runThis.split(" ");
for(let i = 0; i < program.length; i++) {
  //push numbers directly into the stack
  if(program[i].match("[0-9]") != null){
    memory.push(program[i])
  }
  //addition
  if(program[i] == "+"){
    a = +memory[memory.length - 1]
    b = +memory[memory.length - 2]
    memory.push(a+b+"")
  }
  //subtration
  if(program[i] == "-"){
    a = +memory[memory.length - 1]
    b = +memory[memory.length - 2]
    memory.push(a-b+"")
  }
  //multiplication
  if(program[i] == "*"){
    a = +memory[memory.length - 1]
    b = +memory[memory.length - 2]
    memory.push(a*b+"")
  }
  //division
  if(program[i] == "/"){
    a = +memory[memory.length - 1]
    b = +memory[memory.length - 2]
    memory.push(a/b+"")
  }
  //load from stack index
  if(program[i]=="load") {
    a = +memory[memory.length - 1]
    memory.splice(memory.length - 1, 1)
    loadItem = memory[a]
    memory.push(loadItem)
  }
}
console.log(memory)
