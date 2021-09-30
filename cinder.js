//fibbonacci number generator
let runThis = "19 0 1 2 0 load 1 - 0 store 2 load 3 load + 2 del 4 0 1 notjump 3 print"

let program = [];
let memory = [];
let debug = false

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
    memory.splice(memory.length - 2, 2)
    memory.push(b+a+"")
    if(debug) console.log(b + " plus " + a + " is " + (b+a+""))
  }
  //subtration
  if(program[i] == "-"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.splice(memory.length - 2, 2)
    memory.push(b-a+"")
    if(debug) console.log(b + " minus " + a + " is " + (b-a+""))
  }
  //multiplication
  if(program[i] == "*"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.splice(memory.length - 2, 2)
    memory.push(b*a+"")
    if(debug) console.log(b + " times " + a + " is " + (b*a+""))
  }
  //division
  if(program[i] == "/"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.splice(memory.length - 2, 2)
    memory.push(b/a+"")
    if(debug) console.log(b + " divided by " + a + " is " + (b/a+""))
  }
  //change value at stack index. This one is kind of weird. "A B X 0 store" would push X to A
  if(program[i]=="store") {
    let a = +memory[memory.length - 1]
    if(debug) console.log("changing address " + a + " to " + memory[memory.length - 2])
    memory.splice(a, 1, memory[memory.length - 2])
    memory.splice(memory.length - 2, 2)
  }
  //load from stack index
  if(program[i]=="load") {
    let a = +memory[memory.length - 1]
    memory.splice(memory.length - 1, 1)
    memory.push(memory[a])
    if(debug) console.log("Loaded " + memory[a] + " from index " + a)
  }
  //delete stack item at index
  if(program[i]=="del") {
    let a = +memory[memory.length - 1]
    memory.splice(memory.length - 1, 1)
    memory.splice(a, 1)
    if(debug) console.log("deleted item at address " + a)
  }
  //print value at memory location
  if(program[i] == "print") {
    let a = +memory[memory.length - 1]
    memory.splice(memory.length - 1, 1)
    console.log(memory[a])
    if(debug) console.log("Printed value")
  }
  //jump to instruction number if the value at index is 0
  if(program[i] == "jump") {
    let index = +memory[memory.length - 1]
    let otherIndex = +memory[memory.length - 2]
    let instruction = +memory[memory.length - 3]
    memory.splice(memory.length - 3, 3)
    if(memory[index] == memory[otherIndex]){
      i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
    if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
  } else {
    if(debug) console.log("Did not jump")
  }
  }
  //jump to instruction number if the value at index is not 0
  if(program[i] == "notjump") {
    let index = +memory[memory.length - 1]
    let otherIndex = +memory[memory.length - 2]
    let instruction = +memory[memory.length - 3]
    memory.splice(memory.length - 3, 3)
    if(memory[index] != memory[otherIndex]){
      i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
      if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
    } else {
      if(debug) console.log("Did not jump")
    }
  }

  if(debug){
    console.log(memory)
  }

}
