/*
Edgars Spira es22027
*/

//function to capitalize the first letter of every word in str
function capitalize (str) {
    if(str === undefined) return;
    let arr = str.split("-");
    for (let word in arr) arr[word] = arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
	    return arr.join(" ");
}

//display polling select function
function displayAllPolling (polling_s) {
    
    //add first empty option
    let opt = document.createElement("option");
    let text_add = "All";
    opt.innerHTML = text_add;
    opt.value = text_add;
    polling_s.appendChild(opt);
    
    //add all other options
    for (let obj in activities) {
        opt = document.createElement("option");
        text_add = capitalize(activities[obj].Location.Id);
        opt.innerHTML = text_add;
        opt.value = text_add;
        polling_s.appendChild(opt);
    }
}

//function for user Voter inputs validation
function voterValidation () {
    if (this.value == "" || this.value == 0) {
        this.value = "";
        this.style.removeProperty("border");
    } else if (this.value < 1 || !Number.isInteger(parseFloat(this.value))) {
        this.value = "";
        alert("Wrong input, only positive integers allowed.");
        this.style.border = "thick solid #FF0000";
    } else {
        this.style.removeProperty("border");
    }
}

function changeValid () {
    this.style.removeProperty("border");
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

	// now let's get regions for the first select element
	var regions = Object.keys(lookup).sort(); // get the list of keys in the lookup and sort it

	var region_s = document.getElementById("region-list"); // get region select element
	
	for (let i in regions) { // for every region
		let opt = document.createElement('option'); // create a new option
		opt.innerHTML = regions[i]; // fill the text with the region name
		opt.value = regions[i]; // fill the value with the region name
		region_s.appendChild(opt); // add newly created option to the region select
	}

	//polling station update on change of value
	//variables
    var polling_s = document.getElementById("polling-list"); // get polling select element
    region_s.addEventListener("change", pollingUpdate);// add onchange listener to the region select element, update polling list on change
    
    displayAllPolling(polling_s); //set initial polling stations to All
    
    function pollingUpdate() { //polling list update function
        let selected_text = region_s.options[region_s.selectedIndex].text.toLowerCase().replace(" ", "-"); //store selected region option
        
        //before each update, cleanup the dropdown list
        let i, l = polling_s.options.length - 1;
        for(i = l; i >= 0; i--) polling_s.remove(i);
        
        //display needed polling stations
        //if All region is chosen, display all polling station
        if (selected_text == "all") displayAllPolling(polling_s);
        else { //compare selected region's ParentIds and display only needed polling stations
            
            //set first option as empty
            let opt = document.createElement("option");
            let text_add = "All";
            opt.innerHTML = text_add;
            opt.value = text_add;
            polling_s.appendChild(opt);
            
            //set other options as required polling stations
            for (let obj in activities) {
                if (selected_text === activities[obj].Location.ParentId) {
                    opt = document.createElement("option");
                    text_add = capitalize(activities[obj].Location.Id);
                    opt.innerHTML = text_add;
                    opt.value = text_add;
                    polling_s.appendChild(opt);
                }
            }
        }
    }

    //function for table head creation
    function tablehead(table) {
        let tableh = ["Region", "Name", "Address", "Total Voters", "Vote Count", "Percentage Voted"];
        let thead = table.createTHead();
        let trow = thead.insertRow();
        for (let name of tableh) {
          let th = document.createElement("th");
          let text = document.createTextNode(name);
          th.appendChild(text);
          trow.appendChild(th);
        }
    }
    
    var table = document.querySelector("table"); //find table element from in html
    
    //set variables for different elements and add listeners to them
    let data_button = document.getElementById("show-stats");
    data_button.addEventListener("click", displayData);
    
    //add data validation to voters from / until
    let voters_from = document.getElementById("vote-from");
    voters_from.type = "number";
    voters_from.addEventListener("change", voterValidation);
    voters_from.addEventListener("mouseleave", changeValid);
    
    let voters_until = document.getElementById("vote-until");
    voters_until.type = "number";
    voters_until.addEventListener("change", voterValidation);
    voters_from.addEventListener("mouseleave", changeValid);
    
    //find search element
    let search = document.getElementById("search");
    search.addEventListener("keyup", searchTable);
    search.setAttribute("placeholder", "Search...");
    
    function searchTable() {
        let tr, td, txtValue, filter;
        filter = search.value.replaceAll(" ", "").toUpperCase();
        tr = table.getElementsByTagName("tr");
        
        for (let i = 0; i < tr.length; i++) {//reset table display property
            tr[i].style.display = "";
        }
        if(search.value.length > 2) { //filter table by inputted text
            for (let i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent.replaceAll(" ", "") || td.innerText.replaceAll(" ", "");
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    //fucntion to display data by pressing Show stats button
    function displayData() {
        search.value = "";
        //clear the table first
        for (let i = table.rows.length; i > 0; i--) {
            table.deleteRow(i-1);
        }
        
        //create and fill table head elements
        tablehead(table);

        //variables for selected value by user
        let selected_r = region_s.options[region_s.selectedIndex].text.toLowerCase().replaceAll(" ", "-");
        let selected_p = polling_s.options[polling_s.selectedIndex].text.toLowerCase().replaceAll(" ", "-");
        let selected_i = document.querySelector('input[name="indicator"]:checked').value;
        
        //console.log(voters_from.value);
        //console.log(voters_until.value);
        
        //algorithm to create and fill row elements
        function addRows (act, type) { //input 1 to show Total Votes, 0 to show Election day Results
            let activ = activities[act];
            let datarr;
            if (type) datarr = [capitalize(activ.Location.ParentId), activ.Location.Name, activ.Location.Address, activ.Location.VoterCount, activ.TotalStatistic.Count, activ.TotalStatistic.Percentage];
            else if(!type) datarr = [capitalize(activ.Location.ParentId), activ.Location.Name, activ.Location.Address, activ.Location.VoterCount, activ.ElectionDayTotalStatistic.Count, activ.ElectionDayTotalStatistic.Percentage];
            
            //logic to sort by voter count
            if (voters_from.value != "" && voters_until.value != "") { //for both inputs
                if (datarr[4] < voters_from.value || datarr[4] > voters_until.value) return;
            } else if (voters_from.value != "" && datarr[4] < voters_from.value) return;//for from input
            else if (voters_until.value != "" && datarr[4] > voters_until.value) return;//for until input
            
            //some Region names are undefined, set them equal to Location.Name
            if (activ.Location.Address === undefined) datarr[2] = datarr[1];
            
            let row = table.insertRow(-1);
            for (let n = 0; n < datarr.length; n++) {
                let td = row.insertCell(n);
                td.innerHTML = datarr[n];
            }
        }
        
        //function with logic of what to show to user
        function infoLogic (type) { //input 1 to show Total Votes, 0 to show Election day Results
            if (selected_r == "all" && selected_p == "all") { //display all regions and all stations
                for (let act in activities) {
                    addRows(act, type);
                }
                
            } else if (selected_r == "all") {//display specific polling station
                for (let act in activities) {
                    if (selected_p == activities[act].Location.Id) {
                        addRows(act, type);
                    }
                }
                
            } else if (selected_p == "all") { //display all polling station for specific region
                for (let act in activities) {
                    if (selected_r == activities[act].Location.ParentId) {
                        addRows(act, type);
                    }
                }
            } else { //specific region and specific station
                for (let act in activities) {
                    if (selected_r == activities[act].Location.ParentId && selected_p == activities[act].Location.Id) {
                        addRows(act, type);
                    }
                }
            }
        }
        
        if (selected_i == "total") {//display only total data
            infoLogic(1);
        } else { //display voted on election date data
            infoLogic(0);
        }
    }
});
