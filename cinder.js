
export function execute(runThis, debug = false){

  let program = [];
  let memory = [];

  program = runThis.split(" "); //split the input into instructions.
  //A side effect of using whitespace as a divisor is that strings and arrays cannot contain spaces. To work around this,
  //the pipe character "|" will be replaced with a space when strings get printed

  //The instuction loop. This is essentially one clock cycle per iteration.
  for(let i = 0; i < program.length; i++) { //iterate through the instruction loop

    //push numbers directly into the stack
    if(program[i].match("[0-9]") != null){
      memory.push(program[i])
    }

    //ignore memory labels. Memory labels are used to tell if statements where to jump to.
    else if(program[i].match(":[A-Z]")){}

    //push strings directly to the stack with their quotation marks removed
    else if(program[i].match('"[^"]*"')) {
      memory.push(program[i].substr(1, program[i].length-2))
      if(debug) console.log("Pushed an array")
    }

    //push arrays directly to the stack with their brackets removed
    else if(program[i].match('\[[^"]*\]')) {
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
      let b = +memory[memory - 2]
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

    //change value at stack index. This one is kind of weird. "A 15 store 0" would push 15 to A
    if(program[i]=="store" || program[i]=="s") {
      let a = +memory[memory.length - 1]
      if(a < 0) {
        a = memory.length + a
      }
      if(debug) console.log("changing address " + a + " to " + memory[memory.length - 2])
      memory.splice(a, 1, memory[memory.length - 2])
      memory.splice(memory.length - 2, 2)

    }

    //load from stack index and place on top of the stack
    if(program[i]=="load" || program[i]=="l") {
      let a = +memory[memory.length - 1]
      if(a < 0) {
        a = memory.length + a
      }
      memory.push(memory[a])
      memory.splice(memory.length - 2, 1)
      if(debug) console.log("Loaded " + memory[a] + " from index " + a)
    }

    //delete stack item at index.
    if(program[i]=="del" || program[i]=="d") {
      let a = +memory[memory.length - 1]
      memory.splice(memory.length - 1, 1)
      if(a < 0) {
        a = memory.length + a
      }
        memory.splice(a, 1)
      if(debug) console.log("deleted item at address " + a)
    }

    //print value at memory location
    if(program[i] == "print" || program[i]=="p") {
      let a = +memory[memory.length - 1]
      memory.splice(memory.length - 1, 1)
      if(a < 0) {
        a = memory.length + a
      }
      let result = ""

      if((memory[a] + "").includes("|")) {
        result = memory[a].split("|").join(" ")
      } else {
        result = memory[a]
      }

      console.log(result)
      if(debug) console.log("Printed value at index " + a)
    }

    //Copy the length of the memory to the top of the stack. Essentially calling memory.length()
    if(program[i] == "memlen" || program[i]=="ml") {
      memory.push(memory.length)
      if(debug) console.log("Copied the memory length to the top of the stack")
    }

    //jump to instruction number if the values in the two specified regisers are equal
    if(program[i] == "jump" || program[i]=="j") {
      //really bad workaround to make sure we get the correct memory label
      let tempCopyOfTag = program[i-1]
      program[i-1] = " "
      let instruction = program.indexOf(tempCopyOfTag)
      program[i-1] = tempCopyOfTag
      let index = +memory[memory.length - 2]
      let otherIndex = +memory[memory.length - 1]
      memory.splice(memory.length - 2, 2)

      if(memory[index] == memory[otherIndex]){
        i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
      if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
    } else {
      if(debug) console.log("Did not jump")
      }
    }

    //jump to instruction number if the values in the two specified regisers are not equal
    if(program[i] == "notjump" || program[i]=="!j") {
      //really bad workaround to make sure we get the correct memory label
      let tempCopyOfTag = program[i-1]
      program[i-1] = " "
      let instruction = program.indexOf(tempCopyOfTag)
      program[i-1] = tempCopyOfTag
      let index = +memory[memory.length - 2]
      let otherIndex = +memory[memory.length - 1]
      memory.splice(memory.length - 2, 2)
      if(memory[index] != memory[otherIndex]){
        i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
        if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
      } else {
        if(debug) console.log("Did not jump")
      }
    }

    //jump to instruction if {instruction, a, b} register a < register b
    if(program[i] == "ltjump" || program[i]=="<") {
      //really bad workaround to make sure we get the correct memory label
      let tempCopyOfTag = program[i-1]
      program[i-1] = " "
      let instruction = program.indexOf(tempCopyOfTag)
      program[i-1] = tempCopyOfTag
      let index = +memory[memory.length - 2]
      let otherIndex = +memory[memory.length - 1]
      memory.splice(memory.length - 2, 2)
      if(debug) console.log("ltjump: " + memory[index]+" < " + memory[otherIndex] + " this is " + (memory[index] < memory[otherIndex]))
      if(+memory[index] < +memory[otherIndex]){
        i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
        if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
      } else {
        if(debug) console.log("Did not jump")
      }
    }

    //jump to instruction if {instruction, a, b} register a > register b
    if(program[i] == "gtjump" || program[i]==">") {
      //really bad workaround to make sure we get the correct memory label
      let tempCopyOfTag = program[i-1]
      program[i-1] = " "
      let instruction = program.indexOf(tempCopyOfTag)
      program[i-1] = tempCopyOfTag
      let index = +memory[memory.length - 2]
      let otherIndex = +memory[memory.length - 1]
      memory.splice(memory.length - 2, 2)
      if(debug) console.log("gtjump: " + memory[index]+" > " + memory[otherIndex] + " this is " + (memory[index] > memory[otherIndex]))
      if(+memory[index] > +memory[otherIndex]){
        i = instruction - 1 //one less because i gets incremented at the end of the instruction loop
        if(debug) console.log("jumped to instruction at address " + instruction + ", which is " + program[instruction])
      } else {
        if(debug) console.log("Did not jump")
      }
    }

    //pull an element from an array and push it onto the stack
    if(program[i] == "loadelement" || program[i] == "le") {
      let array = +memory[memory.length - 2]
      let index = +memory[memory.length - 1]
      memory.splice(memory.length - 2, 2)
      let requestedArray = memory[array].substr(1, memory[array].length-2)
      let convertedArray = requestedArray.split(',')
      if(index < 0) {
        index = convertedArray.length + index
      }
      memory.push(convertedArray[index])
      if(debug) console.log("Pulled element from array at index " + array)
    }

    //pop the last element off of the stack and push it to the index of an array(replace the element if it exists.)
    //If you give it an index that is out of bounds of the array, it will try to fit it in by adding empty elements.
    //I have not tested whether or not this works in the negative direction.
    if(program[i] == "storeelement" || program[i] == "se") {
      let array = +memory[memory.length - 2]
      let index = +memory[memory.length - 1]
      let requestedArray = memory[array].substr(1, memory[array].length-2)
      //arghhh immutable strings making my life difficult. This has got to be sooo slow.
      let convertedArray = requestedArray.split(',')
      if(index < 0) {
        index = convertedArray.length + index
      }
      convertedArray[index] = memory[memory.length - 3]
      memory.splice(array, 1, "[" + convertedArray.join(',') + "]")
      memory.splice(memory.length - 3, 3)
      if(debug) console.log("Modified the array located at memory index " + array)
    }

    //get the length of an array
    if(program[i] == "arrlen" || program[i] == "al") {
      let array = +memory[memory.length - 1]
      memory.splice(memory.length - 1, 1)
      let requestedArray = memory[array].substr(1, memory[array].length-2)
      let convertedArray = requestedArray.split(',')
      let arrayLength = convertedArray.length
      memory.push(arrayLength)
      if(debug) console.log("The requested array's length is " + arrayLength)
    }

    //delete an element from an array
    if(program[i] == "delelement" || program[i] == "de") {
      let array = +memory[memory.length - 2]
      let index = +memory[memory.length - 1]
      let requestedArray = memory[array].substr(1, memory[array].length-2)
      //arghhh immutable strings making my life difficult. This has got to be sooo slow.
      let convertedArray = requestedArray.split(',')
      if(index < 0) {
        index = convertedArray.length + index
      }
      convertedArray.splice(index, 1)
      memory.splice(array, 1, "[" + convertedArray.join(',') + "]")
      memory.splice(memory.length - 3, 3)
      if(debug) console.log("Modified the array located at memory index " + array)
    }


    if(debug){
      console.log(memory) //dump the memory after each instruction
    }

  }
}
