
const textMetrics = require('./textMetrics');
const fileRead = require('./fileData.js');
const prompt = require('prompt');

async function perform(fileName1){
	let name = fileName1.split(".")[0];
	let text = "";
	let check = "";
	let checkJSON = "";
	let returnO = ""
	let JSONMetricsFile = "";
	const dat = await (fileRead.getFileAsJSON(name));
	if(dat){
		console.log("File Present already");
		return dat;
		} else {
			try{
				text =  await (fileRead.getFileAsString(fileName1));
				if(!text){
					throw "In App.js: No text received to simplify";
				}
				check = await fileRead.saveStringToFile("./../files/"+name+".debug.",textMetrics.simplify(text));
				if(check){
					JSONMetricsFile = textMetrics.createMetrics(text);
					checkJSON = await fileRead.saveJSONToFile("./../files/"+name+".result.",JSONMetricsFile);
					if(checkJSON){
						returnO = await fileRead.getFileAsJSON(name);
					}
				}
				return returnO;
			} catch(error){
			console.error(error);
		}
	}
		
}

let getFileName = () => {
	prompt.start();
	const getFile = {
		name: "getFile",
		description: "Enter the name of the file (chapter1.txt, chapter2.txt, chapter3.txt)",
		type: "string",
		required: true
	};

	prompt.get([getFile], (err,result) => {
		if(result){
			if(result.getFile != "chapter1.txt" && result.getFile != "chapter2.txt" && result.getFile != "chapter3.txt" ){
				console.log("Enter again");
				getFileName();
			} else{
					let data =  (perform(result.getFile)).then((getResult) =>{
					if(!getResult){
						console.log("In App.js: Please check the file Exists in the Path");
					} else{
						console.log(getResult);
					}	
				});
			}
		}
	});
}

getFileName();

