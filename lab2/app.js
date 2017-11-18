var m = require('./printShape.js');

for(let i=2;i<12;i++){
	m.makeTriangle(i);
	//m.printSquare(i);
}
for(let i=2;i<12;i++){
	//m.makeTriangle(i);
	m.printSquare(i);
}

for(let i=2;i<=20;i+=2){
	m.rhombus(i);	
}

//Error Testing 
//m.makeTriangle("2");
//m.printSquare(4.5);
//m.rhombus(7);