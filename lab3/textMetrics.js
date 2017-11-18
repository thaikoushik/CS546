let textMetrics = (exports = module.exports);

textMetrics.simplify = (text) =>{
	try{
		if(text == null || text == undefined){
			throw "Provide valid text";
		}
		//text = "Hello, my -! This is a great day to say hello.\n\n\tHello! 2 3 4 23";
		text =  text.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s\s+/g,' ').replace(/ +(?= )/g,' ');
		return text;
	} catch(error){
		console.error("IN TextMetrics.js: No Text received to simplify");
	}
	
}

textMetrics.createMetrics = (data) =>{
	try{
		data = textMetrics.simplify(data);
		let totalWords = data.split(' ');
		let totalWordsCount = data.split(' ').length;
		let totalLettersCount = totalWordsCount-1;
		let wordOccurances = {};
		let uniqueCount = 0;
		let longWords = 0;
		for(let i=0;i<totalWordsCount;i++){
			totalLettersCount += totalWords[i].length;
			let words = totalWords[i];
			//wordOccurances[words] = (wordOccurances[words] || 0) +1;
			wordOccurances[words] = (isNaN(wordOccurances[words]) ? 1 : wordOccurances[words] + 1);
			if(totalWords[i].length >= 6) longWords++;
		}
		for(let i=0;i<totalWordsCount;i++){
			let word = totalWords[i];
			if(wordOccurances[word] == 1) {uniqueCount++;}
		}
		let averageWordLength = (totalLettersCount/totalWordsCount);
		let metrics = {
			totalLetters: totalLettersCount,
			totalWords: totalWordsCount,
			uniqueWords: uniqueCount,
			longWords: longWords,
			averageWordLength: averageWordLength.toFixed(1),
			wordOccurrences: wordOccurances
		};
		let JSONMetricsObject = JSON.stringify(metrics,null,4);
		return JSONMetricsObject;
	} catch(error){
		console.error(error);
	}
	
}


