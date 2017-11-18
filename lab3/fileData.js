const fileData = (exports = module.exports);

const bluebird = require('bluebird');
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require('fs'));

module.exports = { 
	getFileAsString: async function (path) { 
		if(!path) throw "Please give valid path";
		try{
			const files = await fs.readFileAsync("./../files/"+path,"utf-8");
			if(files){
				return files;	
			}
		} catch(error){
			console.error("In FileData.js: There is error getting text file: File may be Missing");
		}		
	},

	getFileAsJSON: async function(fileName){
		if(!fileName) throw "Please provide valid Name";
		try{
			const files =  await fs.readFileAsync("./../files/"+fileName+".result.json","utf-8");
			if(files){
				return files;
			} 
		} catch (error){
			//console.error("In FileData.js:There is Error getting JSON file");
		}
	},

	saveStringToFile: async function (path, text){
		if(!path || !text){	throw "Please provide valid data";}
		try{
			return await fs.writeFileAsync(path+"txt", text).return(true);
		} catch(error){
			console.error("In FileData.js: There is error writing text file");
		}
	},

	saveJSONToFile: async function(path, obj){
		if(!path) throw "provide path";
		try{
			return await fs.writeFileAsync(path+"json", obj).return(true);
		} catch(error){
			console.error("In FileData.js: There is error writing JSON");
		}
	}
} 	