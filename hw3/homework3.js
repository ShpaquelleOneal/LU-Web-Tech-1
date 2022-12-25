﻿/*
Edgars Spira es22027
*/

function capitalize (str) { // implement a function to capitalize the first letter of every word in str
  let arr = str.split("-");

  for (word in arr) {
    arr[word] = arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
  }

	return arr.join(" ");
}

//polling station update on change of value
function pollingUpdate(sel) {
  let selText = sel.options[sel.selectedIndex].text;
  let newlist = [];
  let stations = Object.keys(lookup[regions[0]]).sort(); // if you need to process polling stations in the loop, use loop counter instead of index 0

  let polling_s = document.getElementById("polling-list"); // get region select element
  for (let i in activities) { // for every region
    let opt = document.createElement('option'); // create a new option
    opt.innerHTML = activities[i][1]; // fill the text with the region name
    opt.value = activities[i][1][i]; // fill the value with the region name
    polling_s.appendChild(opt); // add newly created option to the region select
  }

}

window.addEventListener('DOMContentLoaded', (event) => { // execute the code when the initial HTML document has been completely loaded, we need the regions select to be loaded

	var lookup = {};

	for (let i in activities) { // for every item in the activities - every piece of statistic info
		let region;
		if (activities[i].Location.ParentId)
			region = capitalize(activities[i].Location.ParentId); // read region from an activity
		else
			region = capitalize(activities[i].Location.Id); // read polling station Id from an activity
		let station = activities[i].Location.Name; // read polling station from an activity
		if (region && !(region in lookup)) { // if the region hasn't been previously processed
			lookup[region] = {}; // add a new region to the lookup
		}
		lookup[region][station] = 1; // add a station to the lookup. lookup is a two-dimensional associative array/object
	}

	//console.log(lookup); // uncomment this line if you want to see the result in the console


	// now let's get regions for the first select element
	var regions = Object.keys(lookup).sort(); // get the list of keys in the lookup and sort it

	console.log(regions); // uncomment this line if you want to see the result in the console

	var region_s = document.getElementById("region-list"); // get region select element
	for (let i in regions) { // for every region
		let opt = document.createElement('option'); // create a new option
		opt.innerHTML = regions[i]; // fill the text with the region name
		opt.value = regions[i]; // fill the value with the region name
		region_s.appendChild(opt); // add newly created option to the region select
	}

  //polling stations algorithms
	// to get polling stations for the first region and sort it

	//console.log(stations); // uncomment this line if you want to see the result in the console





  //function for table head creation
  function tablehead(table, datarr) {
    let thead = table.createTHead();
    let trow = thead.insertRow();
    for (let name of datarr) {
      let th = document.createElement("th");
      let text = document.createTextNode(name);
      th.appendChild(text);
      trow.appendChild(th);
    }
  }
  let tableh = ["Region", "Name", "Address", "Total Voters", "Vote Count", "Percentage Voted", "Election Day Vote Count", "Percentage Voted on Election Day"];
  let table = document.querySelector("table");
  tablehead(table, tableh);

  //function for table row creation
  function tablerow(table, datarr) {
    let thead = table.createTHead();
    let trow = thead.insertRow();
    for (let name of datarr) {
      let th = document.createElement("th");
      let text = document.createTextNode(name);
      th.appendChild(text);
      trow.appendChild(th);
    }
  }



});
