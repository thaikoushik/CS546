
let = makeTriangle = (x) => {
	if(!(typeof x === "number")  ||  !(isInteger(x))) {
		throw ("Please provide valid number");
	}
	for(let i=x;i>0;i--){
		let a = "";
		let n = " ".repeat(i);
		a=n+"/";
		let m = Math.abs(i-x);
		let b ="";
		if(i==x){
			b = " ".repeat(m);	
		} else if(i!==x){
			m=m*2;
			b = " ".repeat(m);
		}
		if(i!==1){
			a+=b+"\\";	
		} else {
			let z = "-".repeat(i*m);
			z+="\\";
			a+=z;
		}
		console.log(a);
	}	
}

let printSquare = (x) =>{
	if(!(typeof x === "number") ||  !(isInteger(x))){
		throw ("Please provide valid number");
	}
	for(let i=1;i<=x;i++){
		let a = "";
		a+="|";
		if(i===1 || i===x){
			let d = "-".repeat(x);
			a+=d;
		}else {
			let e = " ".repeat(x);
			a+=e;
		}
		a+="|";
		console.log(a);
	}
}

let rhombus = (x) => {
	if(x%2 !== 0  ||  !(isInteger(x))) {
		throw " please provide even number"
	}
	let mid = x/2;
	let count = 1;
	for(let i = mid;i>=1;i--){
		count++;
		let a = "";
		if(i===mid){
			a = " ".repeat(i)+"/-\\";
			console.log(a);
		} else{
			a = " ".repeat(i) + "/" + " ".repeat(count) + "\\";
			console.log(a);
			count++;
		}
	}
	let nCount = count;
	for(let i = 1;i<=mid;i++){
		nCount--;
		let a = "";
		if(i===mid){
			a = " ".repeat(i)+"\\-/";
			console.log(a);
		} else{
			a = " ".repeat(i) + "\\" + " ".repeat(nCount) + "/";
			console.log(a);
			nCount--;
		}
	}
}

let isInteger = (x) => {
    return Math.round(x) === x;
}


module.exports = {
    makeTriangle: makeTriangle,
    printSquare: printSquare,
    rhombus: rhombus,
};
 	