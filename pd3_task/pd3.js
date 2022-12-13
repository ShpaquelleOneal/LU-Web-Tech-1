/*
 * Work in this file.
 *
 */

// Task 1

function compare(a, b) {
	return Number(a.id)-Number(b.id);
}

let arr = [ {id : "4", name : "Joe"}, {id : "1", name : "Mary"}, {id : "100", name : "Jane"} ];
let result = arr.sort(compare);

console.log("Result of sorting (task #1):");
console.log(result);


// Task 2
// defining the necessary global variables
var words = [];
var word_select = document.getElementById("word-select"); 
var word_output = document.getElementById("word-output"); 
var translate_button = document.getElementById("translate-button"); 
var text_input = document.getElementById("text-input"); 
var text_output = document.getElementById("text-output"); 

/* create a list of dictionary words */
for (let i in my_dict) {
    words.push(i);
}

words.sort(); // sorting the array of words

window.onload = function () {
    /* this code gets executed when the page has loaded */

	// ---------------------------------- populating word select with words from the array ----------------------------------	
	
	for (let i in words) {
		let el = document.createElement("option"); // create a new option element
		el.textContent = words[i]; // set text of the option
		el.value = words[i]; // set the value of the option
		word_select.appendChild(el); // add the newly created option element as a child to the word select
	}
	
	// ---------------------------------- word translation functionality ----------------------------------
	
	function translate(word) { // this function must translate a word in English into Latvian
		if(my_dict[word]) {
			return my_dict[word];
		} else {
			return word;
		}
	}
	
	function showTranslation() { // this function is executed when a user chooses a word from the drop-down list
		
		let word = word_select.selectedOptions[0].value; // get the selected word
		
		let trans = translate(word); // get word translation
		
		word_output.textContent = trans; // show translated word
		
	}
	
	word_select.addEventListener('change', showTranslation);
	
	// ---------------------------------- text translation functionality ----------------------------------
	
	function translateText(text) { // this function must translate a text in English into Latvian 
		// split the text into words, translate each word ignoring case, leave words without translations available in my_dict.
		let textarr = text.split(" ");
		let newarr = [];
		
		for (word in textarr) {
			newarr.push(translate(textarr[word].toLowerCase()));
		}
		return newarr.join(" ");
	}
	
	function showTextTranslation() { // this function is executed when a user presses a button Translate
		
		let text = text_input.value; // get the text to translate
		
		let trans = translateText(text); // get text translation
		
		text_output.textContent = trans; // show translated text
		
	}
	
	translate_button.addEventListener('click', showTextTranslation);
		
}
