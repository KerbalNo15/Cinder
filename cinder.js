//Fibbonacci number generator. Change the first memory value to sequence index n-2
let runThis = '1000 0 "multiple_of_3" "multiple_of_5" "end" :Z load 0 1 - store 0 print 0 load 0 3 % notjump :A 5 1 print 2 :A del 5 load 0 5 % notjump :B 5 1 print 3 :B del 5 notjump :Z 0 1 print 4'

let program = [];
let memory = [];
let debug = false

program = runThis.split(" ");
for(let i = 0; i < program.length; i++) {
  //push numbers directly into the stack
  if(program[i].match("[0-9]") != null){
    memory.push(program[i])
  }
  //ignore memory tags
  else if(program[i].match(":[A-Z]")){}
  //push arbitrary strings directly to the stack
  else if(program[i].match('"[^"]*"')) {
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
  //modulo
  if(program[i] == "%"){
    let a = +memory[memory.length - 1]
    let b = +memory[memory.length - 2]
    memory.splice(memory.length - 2, 2)
    memory.push(b%a+"")
    if(debug) console.log(b + " modulo " + a + " is " + (b%a+""))
  }
  //change value at stack index. This one is kind of weird. "A 15 store A" would push 15 to A
  if(program[i]=="store" || program[i]=="s") {
    let a = +program[i+1]
    if(debug) console.log("changing address " + a + " to " + memory[memory.length - 1])
    memory.splice(a, 1, memory[memory.length - 1])
    memory.splice(memory.length - 1, 1)
    i = i + 1
  }
  //load from stack index
  if(program[i]=="load" || program[i]=="l") {
    let a = +program[i+1]
    i = i + 1
    memory.push(memory[a])
    if(debug) console.log("Loaded " + memory[a] + " from index " + a)
  }
  //delete stack item at index
  if(program[i]=="del" || program[i]=="d") {
    let a = +program[i+1]
    i = i + 1
    memory.splice(a, 1)
    if(debug) console.log("deleted item at address " + a)
  }
  //print value at memory location
  if(program[i] == "print" || program[i]=="p") {
    let a = +program[i+1]
    i = i + 1
    console.log(memory[a])
    if(debug) console.log("Printed value at index " + a)
  }
  //jump to instruction number if the value at index is 0
  if(program[i] == "jump" || program[i]=="j") {
    //bad workaround to make sure we get the correct memory tag
    let tempCopyOfTag = program[i+1]
    program[i+1] = " "
    let instruction = program.indexOf(tempCopyOfTag)
    program[i+1] = tempCopyOfTag
    let index = +program[i+2]
    let otherIndex = +program[i+3]
    if(memory[index] == memory[otherIndex]){
      i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
    if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
  } else {
    i = i + 3
    if(debug) console.log("Did not jump")
  }
  }
  //jump to instruction number if the value at index is not 0
  if(program[i] == "notjump" || program[i]=="!jump") {
    //bad workaround to make sure we get the correct memory tag
    let tempCopyOfTag = program[i+1]
    program[i+1] = " "
    let instruction = program.indexOf(tempCopyOfTag)
    program[i+1] = tempCopyOfTag
    let index = +program[i+2]
    let otherIndex = +program[i+3]
    if(memory[index] != memory[otherIndex]){
      i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
      if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
    } else {
      i = i + 3
      if(debug) console.log("Did not jump")
    }
  }

  if(debug){
    console.log(memory)
  }

}
