let sumOfSquares = (x,y,z) =>{
	if ((typeof x === "number") && (typeof y === "number") && (typeof z === "number")){
        return ((x*x)+(y*y)+(z*z));
    }else{
        throw ("TPlease provide valid numbers");
    }
};

let sayHelloTo = (firstName, lastName, title) =>{
	if(firstName == undefined && lastName == undefined && title == undefined){
        throw new UserException("Please provide valid inputs!!");    
    }else if(lastName == undefined && title==undefined){
		console.log (`Hello, ${firstName}!`);	
	} else if(title == undefined){
		console.log (`Hello, ${firstName}, ${lastName}. I hope you are having a good day!`);
	} else {
		console.log (`Hello, ${title} ${firstName}, ${lastName}!. Have a good evening!`);
	}
	
};

let cupsOfCoffee = (x) => {
	if (typeof x !== "number"  && x < 1){
        throw (" Please provide an positive integer ");
    }	let a = "";
			while(x>1){
				a = a+`${x} cups of coffee on the desk! ${x} cups of coffee!\nPick one up, drink the cup, ${x-1} cups of coffee on the desk!\n`;
				x--;		
			}
			return a+`1 cup of coffee on the desk! 1 cup of coffee!\nPick it up, drink the cup, no more coffee left on the desk!\n`;
};

let occurrencesOfSubstring = (x,y) => {
	 if (typeof x !== "string" && y !== "string"){
        throw  ("Please provide the input of type String");
    }
	let count = 0;
	let pos = x.indexOf(y);
	while(pos > -1){
	    count++;
	    pos = x.indexOf(y,++pos);

	}
	return count;

};

let randomizeSentences = (paragraph) => {
	if (typeof paragraph !== "string"){
        throw ("Provide the input of type String \n");
    }
	let sentences = paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
	let text = "";
	 for (var i = sentences.length; i;i--){
	 	let j = Math.floor(Math.random() * i);
	 	let x = sentences[i-1];
	 	sentences[i-1] = sentences[j];
	 	sentences[j] = x;
	 	
	 }
	 for(var x = 0;x<sentences.length;x++){
	 	text += sentences[x]+" ";
	 }
	return text;
}





console.log(sumOfSquares(5,3,10));
sayHelloTo("Phil"); // logs: Hello, Phil! 
sayHelloTo("Phil", "Barresi"); //logs: Hello, Phil Barresi. I hope you are having a good day!
sayHelloTo("Phil", "Barresi", "Mr."); // logs: Hello, Mr. Phil Barresi! Have a good evening!
console.log(cupsOfCoffee(5));
console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));
var paragraph1 = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences(paragraph1));

// TESTING ERROR HANDLING:
 
 //console.log(sumOfSquares(5,3,"10"));
 
  //sayHelloTo();
 
 // console.log(cupsOfCoffee("5"));
 
 // console.log(occurrencesOfSubstring(5, "o"));
//  console.log(occurrencesOfSubstring("hello world", 4));
 
  //let errorParagraph = undefined;
  //console.log(randomizeSentences(errorParagraph));