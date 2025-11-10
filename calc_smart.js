$(function () {
	// let entry_mode_data = [[0, [1, 0]], []], newEntry = {entryHead: {name: "", topOperator: "0"}, entryBody: []}, newCollection = ["", [createNewDataSet(newEntry)]];
	let entry_mode_data = [[0, [1, 0, []]], []], newEntry = {entryHead: {name: "", topOperator: "0"}, entryBody: []}, newCollection = ["", [createNewDataSet(newEntry)]];
	// let entry_mode_data = [[0, [1, 0, []]], [["",[{"entryHead":{"name":"","topOperator":"1"},"entryBody":[[[0,13],["Eld. David Danquah","Beatrice Abankwa's District Offering.","2025-09-11"],"0"],[[13,3],["Eld. Francis Okyere","Richard Okoh's District Offering.","2025-09-26"],"1"],[[10,2.4],["","","2025-09-26"],"1"],[[7.6,1324421],["","","2025-09-26"],"1"]]}]]]], newEntry = {entryHead: {name: "", topOperator: "0"}, entryBody: []}, newCollection = ["", [createNewDataSet(newEntry)]];
	// $("div#random-entry ul#collection-set").css("display", "block");
	//   random_entry(entry_mode_data, newEntry);
	//   console.log(checkFloat(16.10))
	
	viewModeBtn(entry_mode_data);
	$("div#random-entry a#view-table").css("display", "none");
	$("div#random-entry a#add-new-coll").click(function () {
		$("div#random-entry ul#collection-set").css("display", "block");
	  if (entry_mode_data[1].length == 0) {
		entry_mode_data[1][entry_mode_data[1].length] = createNewDataSet(newCollection);
	  } else {
		// Always prepend new Collections
		// entry_mode_data[1] = [newCollection, ...entry_mode_data[1]];
		entry_mode_data[1] = [createNewDataSet(newCollection), ...entry_mode_data[1]];
	  }
  
	  var structure = "";
	  for (let i = 0; i < entry_mode_data[1].length; i++) {
		structure += "<a id='" + (i + 1) + "' href='#' class='ordinary'>";
		structure += entry_mode_data[1][i][0] == "" ? "This Collection" : entry_mode_data[1][i][0];
		structure += "</a>";
	  }
	  $("div#random-entry div#collection-tab").html(structure);
  
	  $("div#random-entry div#collection-tab a").removeClass("selected");
	  $("div#random-entry div#collection-tab a:nth-child(" + entry_mode_data[0][1][0] + ")").addClass("selected");

	  random_entry(entry_mode_data, newEntry);
	  viewModeBtn(entry_mode_data);
  
	  $("div#random-entry div#collection-tab a").click(function () {
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$(this).addClass("selected");
  
		$("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
		$("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
  
		entry_mode_data[0][1][0] = $(this).attr("id");
  
		random_entry(entry_mode_data, newEntry);
  
		return false;
	  });
  
	  return false;
	});
		
	$("div#random-entry a#view-table, div#random-entry a#view-normal").click(function(e){
		e.preventDefault();

		if($(this).attr('id') == "view-table"){
			let tbStructure = "";
			// tbStructure += "<table border='1' style='margin-bottom: 15px;'>"
			let collections = entry_mode_data[1], highestEntry = [0, []];
			entry_mode_data[1].map(() => highestEntry[1].push(0));
			for(let i=0; i<collections.length; i++){ // Collections
				let collection = collections[i];
				for(let j=0; j<collection[1].length; j++){ // Entries
					if(j == 0){
						highestEntry[1][i] = collection[1][j].entryBody.length;
					}
					if(j >= 1){
						if(highestEntry[1][i] < collection[1][j].entryBody.length){
							highestEntry[1][i] = collection[1][j].entryBody.length;
						}
					}
				}

				if(i == 0){
					highestEntry[0] = collection[1].length;
				}
				if(i >= 1){
					if(highestEntry[0] < collection[1].length){
						highestEntry[0] = collection[1].length;
					}
				}
			}
			// let constructRows = (entries, dimensions, tbStructure, n=[0, -1]) => {
			let constructRows = (entries, dimensions, tbStructure, n=[0, -2]) => {
				let collection_i = dimensions[1];
				let bHeight = dimensions[0][1][collection_i]; // Biggest Height in the collection
			/* console.log(".......................");
					console.log(n);
					console.log("Coll Index: "+bHeight);
					console.log("Biggest Height: "+bHeight);
					console.log("No. of Entries: "+entries.length);
					// console.log("Entry Size: "+entry.entryBody.length);
					console.log(tbStructure);
					console.log(entries);
					console.log("......................."); */
				if(n[0] == 0 && bHeight > 0){
					tbStructure += "<tr>";
					// tbStructure += "<li>";
				}
				if(n[0] == 0){
				tbStructure += "<th>";
				tbStructure += (n[1] >= 0) ? (n[1]+1) : (n[1] == -1) ? "No." : "";
				tbStructure += "</th>";
				}
				if(n[1] < 0){
					if(n[1] == -2){
						if(entries.length < n[0]+1){
							tbStructure += "<td colspan=8></td>";
						}else{
					let entry = entries[n[0]];
							/* if(entry.entryBody.length == 0 || n[1] > entry.entryBody.length-1){
								tbStructure += "<td rowspan=2 colspan=5>Entry Name: </td>";
							}else{
								tbStructure += "<td colspan=5>Entry Name: "+(entry.entryHead.name)+"</td>";
							} */
								tbStructure += "<th colspan=8 align='center'>Entry Name: "+(entry.entryHead.name)+"</th>";
						}
					}else{
						for(let i=0; i<5; i++){
							tbStructure += "<td></td>";
						}
						tbStructure += "<th>Name</th>";
						tbStructure += "<th>Description</th>";
						tbStructure += "<th>Date</th>";
					}
				}else{
					if(entries.length < dimensions[0][0]){
						tbStructure += "<td colspan=5></td>";
					}else{
				let entry = entries[n[0]];
						if(entry.entryBody.length == 0 || n[1] > entry.entryBody.length-1){
							if(bHeight > 0){
							tbStructure += "<td colspan=8></td>";
							}
						}else{
							let itemData = entry.entryBody[n[1]];
				// tbStructure += "<span>Entry "+n+" => "+computation+"</span>";
							let [operatorType, topOperator, number, operands, operand_type, answer] = processEntry(itemData);
							tbStructure += "<td>"+number+"</td>";
							// tbStructure += "<td>"+number+"</td>";
							tbStructure += "<td>"+operand_type+"</td>";
							tbStructure += "<td>"+operands[1]+"</td>";
							tbStructure += "<td>=</td>";
							tbStructure += "<td>"+answer+"</td>";
							tbStructure += "<td>"+itemData[1][0]+"</td>";
							tbStructure += "<td>"+itemData[1][1]+"</td>";
							tbStructure += "<td>"+itemData[1][2]+"</td>";
						}
					}
				}

				n[0] += 1;
				if(n[0] == dimensions[0][0]){
					n[0] = 0;
					n[1] += 1;

					tbStructure += "</tr>";
					// tbStructure += "</li>";
				}
				return (n[1] < bHeight) ? constructRows(entries, dimensions, tbStructure, n) : tbStructure;

			}
			let getConstructedRows = "";
			for(let i=0; i<highestEntry[1].length; i++){ // Collections
				// console.log(">>>>>>>>>>>>>>>");
				let collection = entry_mode_data[1][i], entries = collection[1];
				getConstructedRows += "<tr><td></td><th colspan="+(entries.length*8)+" align='center'>Collection Name: "+collection[0]+"</th></tr>";
				getConstructedRows += constructRows(entries, [highestEntry, i], tbStructure)
			}
			tbStructure += getConstructedRows;
				// tbStructure += "</table>"
				$('div#table-view table#data').html(tbStructure);
				// $('div#table-view ul#data').html(tbStructure);
			entry_mode_data[0][0] = 1;
		}else{
			entry_mode_data[0][0] = 0;
		}
		viewModeBtn(entry_mode_data);
	})

	$('div#table-view a#save-data').click(function(e){
		e.preventDefault();
		saveToExcel();
	});
  });
  
  function random_entry(entry_mode_data, newEntry, extra=[""]) {
	var structure = "";
	for (var i = 0; i < entry_mode_data[1].length; i++) {
	  let thisCollection = entry_mode_data[1][i], date = new Date();
		structure += "<li id='" + i + "' class='collection'>";
			structure += "<div class='coll-body'>";
				structure += "<input type=='text' class='txt-inputs all-txtInputs' style='width: 450px;' placeholder='";
				structure += thisCollection[0] == "" ? "Name this Collection.. (Optional)" : thisCollection[0] + ". (Change here..)";
				structure += "' />";
				structure += "<a href='#' class='ordinary'>Save Name</a>";
				structure += "<a href='#' class='remove'>Remove Collection</a>";
				structure += "<a href='#' class='add'>Add New Entry</a>";
			structure += "</div>";
			structure += "<ul class='coll-entry'>";
				thisCollection[1].map((entry, j) => {
					let thisEntry = entry;

					structure += "<li id='" + j + "' class='coll-entry-body'>";
						structure += "<div class='coll-entry-name'>";
							structure += "<span class='figure'>" + (j + 1) + ".</span>";
							structure += "<input type='text' class='txt-inputs all-txtInputs' placeholder='";
							structure += thisEntry.entryHead.name == "" ? "Name this Entry.. (Optional)" : /* : "Entry Name: " + */ thisEntry.entryHead.name + ". (Change here..)";
							structure += "' />";
						structure += "</div>";
						structure += "<div class='coll-entry-name-links'>";
							structure += "<a href='#' class='ordinary'>Save Name</a>";
							structure += "<a href='#' class='ordinary'>Reset</a>";
							structure += "<a href='#' class='remove'>Remove Entry</a>";
						structure += "</div>";
						structure += "<div class='coll-action-type-wrapper'>";
							structure += "<div class='coll-action-type'>";
								let thisTOperator = thisEntry.entryHead.topOperator, selK = -1;
								if(entry_mode_data[0][1][2].length > 0){
									for(let k=0; k<entry_mode_data[0][1][2].length; k++){
										let selItem = entry_mode_data[0][1][2][k];
										if(selItem[0] == i && selItem[1] == j){
											selK = selItem[2];
											// thisTOperator = thisEntry.entryBody[entry_mode_data[0][1][2][k][2]][1];
											thisTOperator = thisEntry.entryBody[selK][2];
										}
									}
								}
								// console.log("The selected: ", thisEntry.entryBody[selK]);
								//   structure += thisEntry.entryHead.topOperator == 0 ? "selected" : "";
								structure += "<label class='";
								structure += thisTOperator == 0 ? "selected" : "";
								structure += "' title='Addition'>";
									structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=0 ";
									// structure += thisEntry.entryHead.topOperator == 0 ? "checked" : "";
									structure += thisTOperator == 0 ? "checked" : "";
									structure += " /> +";
								structure += "</label>";
								structure += "<label class='";
								//   structure += thisEntry.entryHead.topOperator == 1 ? "selected" : "";
								structure += thisTOperator == 1 ? "selected" : "";
								structure += "' title='Subtraction'>";
									structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=1 ";
									// structure += thisEntry.entryHead.topOperator == 1 ? "checked" : "";
									structure += thisTOperator == 1 ? "checked" : "";
									structure += " /> -";
								structure += "</label>";
								structure += "<label class='";
								//   structure += thisEntry.entryHead.topOperator == 2 ? "selected" : "";
								structure += thisTOperator == 2 ? "selected" : "";
								structure += "' title='Multiplication'>";
									structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=2 ";
									// structure += thisEntry.entryHead.topOperator == 2 ? "checked" : "";
									structure += thisTOperator == 2 ? "checked" : "";
									structure += " /> x";
								structure += "</label>";
								structure += "<label class='";
								//   structure += thisEntry.entryHead.topOperator == 3 ? "selected" : "";
								structure += thisTOperator == 3 ? "selected" : "";
								structure += "' title='Division'>";
									structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=3 ";
									// structure += thisEntry.entryHead.topOperator == 3 ? "checked" : "";
									structure += thisTOperator == 3 ? "checked" : "";
									structure += " /> ÷";
								structure += "</label>";
							structure += "</div>";
							structure += "<div class='coll-action-details'>";
								structure += "<textarea class='all-txtInputs' placeholder='Description (describe the item)'>";
									structure += (selK >= 0) ? thisEntry.entryBody[selK][1][1] : "";
								structure += "</textarea>";
								structure += "<span class='details extra-details'>";
									structure += "<input type='text' class='txt-inputs all-txtInputs' value='";
									structure += (selK >= 0) ? thisEntry.entryBody[selK][1][0] : "";
									structure += "' placeholder='Name (name the item)' />";
									structure += "<input type='date' class='txt-inputs all-txtInputs' value='";
									structure += (selK >= 0) ? thisEntry.entryBody[selK][1][2] : date.getFullYear()+"-"+(date.getMonth() + 1).toString().padStart(2, '0')+"-"+date.getDate().toString().padStart(2, '0');
									structure += "' />";
								structure += "</span>";
								structure += "<span class='details extra-controls'>";
									structure += "<label id='set-target'>";
										structure += "<input type='checkbox' /> Set Target";
									structure += "</label>";
									structure += "<span style='display: none;'>";
										structure += "<input type='text' class='all-txtInputs' style='width: 80px;' placeholder='0' />";
										structure += "<label id='mutable'>";
											structure += "<input type='checkbox' checked /> Mutable / Successive";
										structure += "</label>";
									structure += "</span>";
								structure += "</span>";
							structure += "</div>";
							structure += "<div class='coll-action-head'>";
								structure += "<span class='entry-total figure'></span>";
								structure += "<span class='operator figure'></span>";
								structure += "<span class='operand'></span>";
								structure += "<span class='perform'><a href='#' class='add'>Add</a></span>";
							structure += "</div>";
						structure += "</div>";
						structure += "<ul class='coll-entry-list-wrapper'>";
						thisEntry.entryBody.forEach((itemData, k) => {
							let [operatorType, topOperator, number, operands, operand_type, answer] = processEntry(itemData);
					
							structure += "<li id='" + k + "' class='";
							structure += entry_mode_data[0][1][2].map(item => (item[0] == i && item[1] == j && item[2] == k) ? "selected" : "");
							structure += "'>";
							structure += "<span class='s-n figure'>" + (k + 1) + ".</span>";
							// structure += "<span class='figure'>" + filter_currency(number) + "</span>"; // Last total itemData
							structure += "<span class='figure'>" + number + "</span>"; // Last total itemData
							structure += "<span class='operator figure'>";
					
							// console.log(mode + " " + operand_type);
							structure += operand_type;
							structure += "</span>";
							structure += "<span class='operand figure'>"+operands[1]+"</span>";
							structure += "<span class='figure'>=</span>";
							structure += "<span class='figure'>" + answer + "</span>";
							structure += "<span><a href='#' class='remove'>X</a></span>";
							structure += "</li>";
						});
						structure += "<br style='clear: both;' />";
						structure += "</ul>";
					structure += "</li>";
				});
			structure += "<br style='clear: both;' />";
			structure += "</ul>";
		structure += "</li>";
	}
	structure += "<br style='clear: both;' />";
  
	var elem_sel_init = "div#random-entry ul#collection-set", elem_sel_list = " li.collection.selected ul.coll-entry li.coll-entry-body";
	$(elem_sel_init).html(structure);
	$(elem_sel_init + " li.collection").removeClass("selected").css("display", "none");
	$(elem_sel_init + " li.collection:nth-child("+entry_mode_data[0][1][0]+")").addClass("selected").css("display", "block");
  
  


	var sel_coll = $(elem_sel_init + " li.collection.selected"), i = sel_coll.attr("id");
	sel_coll.find("ul.coll-entry li.coll-entry-body").each(function () {
	  var j = $(this).attr("id"), result = updateEntryList(0, [i, j], false), thisEntry = entry_mode_data[1][i][1][j];
  
	  /* for (var k = 0; k < thisEntry.entryBody.length; k++) {
		var data = thisEntry.entryBody[k][0];
		var sel_operator = thisEntry.entryBody[k][1];
		var lastTotal = data[0];
		var operand = data[1];
  
		result = sum_2([lastTotal, operand], sel_operator);
	  } */
	  
	let value = "", topOperator = thisEntry.entryHead.topOperator, selK = -1;
	  if(entry_mode_data[0][1][2].length > 0){
		  entry_mode_data[0][1][2].map(item => {
			  if(item[0] == i && item[1] == j){
				selK = item[2];
				let selItem = entry_mode_data[1][i][1][j].entryBody[selK];
				  value = selItem[0][1];
				  result = selItem[0][0];
				  topOperator = selItem[2];
			  }
		  });
	  }
		let [operator, sel_html] = setOperandBox(topOperator), entry_body = $(this).closest("li.coll-entry-body"), span = 'div.coll-action-type-wrapper div.coll-action-head span';
		entry_body.find(span+".operator").text(operator);
		entry_body.find(span+".operand").html(sel_html);
		if(extra[0] !== "" && selK < 0){
	//  console.log(entry_body.find(span+".operand").html());
			value = extra[0];
		}
		if(topOperator < 2)
			entry_body.find(span+".operand input").val(value)
	//  [entry_mode_data, newEntry] = updateList(value, topOperator, filteredVal, entry_mode_data[1][i][1][j], [i, j], entry_mode_data);
  
	  if (j == entry_mode_data[0][1][1]) { // Active Entry
		makeEntryActive($(this), [i, j])
	  }

	  $(this).find("div.coll-action-type-wrapper div.coll-action-head span.entry-total").text(negativeNumber(result));
	//   $(this).find("div.coll-apply-action div.coll-apply-action-head span.entry-total").text(result);
	});
	
	// Set Names on Keyup
	$(elem_sel_init + " li.collection.selected div.coll-body input, "+elem_sel_init + elem_sel_list + " div.coll-entry-name input").keyup(function (event) {
	  if (event.key == "Enter") {
		var label = $(this).val();
		if(label != ""){
		  let parentElement = $(this).closest('div').attr('class');
		  if(parentElement == "coll-body"){ // The Collection
			setCollectionName($(this), label);
		  }else{ // The Entry
			var parent = $(this).closest("li.coll-entry-body"), sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = parent.attr("id");
			setEntryName(parent, label, [i, j])
			random_entry(entry_mode_data, newEntry);
		  }
		}
	  }
	});
  
	$(elem_sel_init + " li.collection.selected div.coll-body a").click(function () {
	  // Index 0 is Collection name input field, 1 is save name btn, 2 is remove collection btn, 3 is add new entry btn
	  if($(this).index() == 1) { // Save Name
		var label = $(this).closest("div.coll-body").find("input").val();
		
		if (label != "") {
		  setCollectionName($(this), label);
		}
	  }
  
	  if($(this).index() == 2) { // Remove Collection
		var [i, j] = getIndexes($(this));
  
		entry_mode_data[1].splice(i, 1);
  
		var structure = "";
		for (var i = 0; i < entry_mode_data[1].length; i++) {
		  structure += "<a id='" + (i + 1) + "' href='#'>";
		  entry_mode_data[1][i] = collectionName(entry_mode_data[1][i])
		  structure += entry_mode_data[1][i][0];
		  structure += "</a>";
		}
		$("div#random-entry div#collection-tab").html(structure);
  
		entry_mode_data[0][1][0] = 1; // Reset to first collection
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][1][0]+")").addClass("selected");
  
		if (entry_mode_data[1].length == 0) {
		  $("div#random-entry ul#collection-set").css("display", "none");
		}
		random_entry(entry_mode_data, newEntry);
		viewModeBtn(entry_mode_data);
  
		$("div#random-entry div#collection-tab a").click(function () {
		  $("div#random-entry div#collection-tab a").removeClass("selected");
		  $(this).addClass("selected");
  
		  $("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
		  $("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
  
		  entry_mode_data[0][1][0] = $(this).attr("id");
  
		  random_entry(entry_mode_data, newEntry);
  
		  return false;
		});
	  }
  
	  if($(this).index() == 3) { // Add New Entry
		var i = $(this).closest("li.collection").attr("id");
		var j = entry_mode_data[1][i][1].length, parent = $(this).closest("li.coll-entry-body:nth-child("+(j+1)+")");
		entry_mode_data[1][i][1][j] = createNewDataSet(newEntry);
  
		makeEntryActive(parent, [i, j]);
  
		random_entry(entry_mode_data, newEntry);
	  }
  
	  return false;
	});
  
	// Entry Links
	$(elem_sel_init + elem_sel_list + " div.coll-entry-name-links a").click(function () {
	  var parent = $(this).closest("li.coll-entry-body"), entry_name = parent.find("div.coll-entry-name input").val(), sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = parent.attr("id");
  
	  if ($(this).index() == 0) { // Save Name
		setEntryName(parent, entry_name, [i, j])
	  }
	  if ($(this).index() == 1) { // Reset
		entry_mode_data[1][i][1][j].entryBody.length = 0;
  
		$(elem_sel_init + elem_sel_list).removeClass("active");
		parent.addClass("active");
  
		entry_mode_data[0][1][1] = j;
	  }
	  if ($(this).index() == 2) { // Remove Entry
		if (entry_mode_data[1][i][1].length > 1) {
		  entry_mode_data[1][i][1].splice(j, 1);
  
		  if(entry_mode_data[1][i][1].length > 0){
			$(elem_sel_init + elem_sel_list).removeClass("active");
			j = (j-1 == -1 || entry_mode_data[1][i][1].length > j) ? j : j-1;
			$(this).closest("li.coll-entry-body:nth-child("+(j)+")").addClass("active");
			
			entry_mode_data[0][1][1] = j;
		  }
		}
	  }
  
	  random_entry(entry_mode_data, newEntry);
  
	  return false;
	});
	
	// Change Entry Operation Type
	$(elem_sel_init + elem_sel_list + " div.coll-action-type label input[type=radio]").change(function () {
	  $(this).closest("div.coll-action-type").find("label").removeClass("selected");
	  $(this).closest("label").addClass("selected");
	  
	  let [i, j] = getIndexes($(this));
	  
	  let thisK = 0;
	  if(entry_mode_data[0][1][2].length > 0){
		entry_mode_data[0][1][2].map(item => {
			if(item[0] == i && item[1] == j){
				thisK = item[2];
				entry_mode_data[1][i][1][j].entryBody[thisK][2] = $(this).val();
			}
		});
	}else{
	  entry_mode_data[1][i][1][j].entryHead.topOperator = $(this).val();
	}
	 updateEntryList(thisK, [i, j], true);
	  
	  random_entry(entry_mode_data, newEntry, [$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-head span.operand input").val()]);
	})
	
	// **************************
	// Perform computation
	$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-head span.perform a").click(function () {
	  var operand = $(this).closest("div.coll-action-head").find("span.operand input");
	//   var currency = digit_input_filter(operand);
  
		if(!m_c_e(".", operand.val())){ // Multiple points is invalid
			let [i, j] = getIndexes($(this)), actionWrapper = $(this).closest("div.coll-action-type-wrapper");
			let thisEntry = entry_mode_data[1][i][1][j], topOperator = thisEntry.entryBody.length == 0 ? "0" : $(this).closest("li.coll-entry-body").find("div.coll-action-type label.selected input[type=radio]").val();
		
			//   computateOnEvent(operand.val(), topOperator, currency, thisEntry, [i, j]);
			let entryValues = [parseFloat(onlyNumbers(operand.val())), actionWrapper.find('div.coll-action-details input[type=text]').val(), actionWrapper.find('div.coll-action-details textarea').val(), actionWrapper.find('div.coll-action-details input[type=date]').val()];
			computateOnEvent(operand.val(), topOperator, entryValues, thisEntry, [i, j]);
		}
  
	  return false;
	});
  
	// Compute on Keyboard Enter Keyup
	$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-head span.operand input").keyup(function (event) {
	  let entryBody = $(this).closest("li.coll-entry-body"), [i, j] = [$(this).closest("li.collection").attr("id"), entryBody.attr("id")], actionWrapper = $(this).closest("div.coll-action-type-wrapper");
	  makeEntryActive(entryBody, [i, j]);
  
	  if (event.key == "Enter" && !m_c_e(".", $(this).val())) {
		// var currency = digit_input_filter($(this).closest('span.operand').find('input'));
		let topOperator = entry_mode_data[1][i][1][j].entryBody.length == 0 ? "0" : entryBody.find("div.coll-action-type label.selected input[type=radio]").val();
		let thisEntry = entry_mode_data[1][i][1][j];
		
		let entryValues = [onlyNumbers($(this).val()), actionWrapper.find('div.coll-action-details textarea').val(), actionWrapper.find('div.coll-action-details input[type=text]').val(), actionWrapper.find('div.coll-action-details input[type=date]').val()];
		// computateOnEvent($(this).val(), topOperator, currency, thisEntry, [i, j]);
		computateOnEvent($(this).val(), topOperator, entryValues, thisEntry, [i, j]);
			// $('span#json').html(JSON.stringify(entry_mode_data[1])); // Stringify For Debugging
	  }
	});
	// **************************

	// ******************	Input Details
	$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-details textarea").change(function(event){
		let [i, j] = getIndexes($(this)), detailsElem = $(this).closest('div.coll-action-details');
		if(entry_mode_data[0][1][2].length > 0){
			entry_mode_data[0][1][2].map(item => {
				if(item[0] == i && item[1] == j){
					let itemK = item[2];
					entry_mode_data[1][i][1][j].entryBody[itemK][1] = [detailsElem.find('input[type=text]').val(), $(this).val(), detailsElem.find('input[type=date]').val()];
				}
			});
		}
	})
	$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-details span input[type=text").change(function(event){
		let [i, j] = getIndexes($(this)), detailsElem = $(this).closest('div.coll-action-details');
		if(entry_mode_data[0][1][2].length > 0){
			entry_mode_data[0][1][2].map(item => {
				if(item[0] == i && item[1] == j){
					let itemK = item[2];
					entry_mode_data[1][i][1][j].entryBody[itemK][1] = [$(this).val(), detailsElem.find('textarea').val(), detailsElem.find('input[type=date]').val()];
				}
			});
		}
	});
	$(elem_sel_init + elem_sel_list + " div.coll-action-type-wrapper div.coll-action-details span input[type=date").change(function(){
		let [i, j] = getIndexes($(this)), detailsElem = $(this).closest('div.coll-action-details');
		if(entry_mode_data[0][1][2].length > 0){
			entry_mode_data[0][1][2].map(item => {
				if(item[0] == i && item[1] == j){
					let itemK = item[2];
					entry_mode_data[1][i][1][j].entryBody[itemK][1] = [detailsElem.find('input[type=text]').val(), detailsElem.find('textarea').val(), $(this).val()];
				}
			});
		}
	});
	// **************************
  
	// Remove Computation
	$(elem_sel_init + elem_sel_list + " ul.coll-entry-list-wrapper li span a").click(function (event) {
			// console.log("Operand "+parseFloat("15,521,30"));
	  var [i, j] = getIndexes($(this)), k = $(this).closest("li").attr("id"), entryBody = $(this).closest("li.coll-entry-body");
	  
	  entry_mode_data[1][i][1][j].entryBody.splice(k, 1);
	  if(entry_mode_data[1][i][1][j].entryBody.length == 1){
		entry_mode_data[1][i][1][j].entryBody[0][0][0] = 0;
	  }
	 updateEntryList(0, [i, j], true);
  
	  makeEntryActive(entryBody, [i, j])
	  random_entry(entry_mode_data, newEntry);
  
	  return false;
	});
	
	$(elem_sel_init + elem_sel_list + " ul.coll-entry-list-wrapper li").click(function (event) {
		let entryBody = $(this).closest('li.coll-entry-body'), actionElem = $(this).closest('ul.coll-entry-list-wrapper'), [i, j] = getIndexes($(this)), updateItems = [];
		for(let n=0; n<entry_mode_data[0][1][2].length; n++){
			if(entry_mode_data[0][1][2][n][0] != i && entry_mode_data[0][1][2][n][1] != j){
				updateItems.push(entry_mode_data[0][1][2][i]);
			}
		}
		entry_mode_data[0][1][2] = updateItems;

			let k = parseInt($(this).attr('id'));
	  var value = entry_mode_data[1][i][1][j].entryBody[k][0], topOperator = entry_mode_data[1][i][1][j].entryBody[k][2], reload = false;
	// let [operator, sel_html] = setOperandBox(topOperator);
		if($(this).is('.selected')) {
			$(this).removeClass('selected');
			actionElem.find('div.coll-action-head span.operand input').val("").focus();

			reload = true;
		}else{
			actionElem.find('li').each(function(){
				$(this).removeClass('selected');
			});
			$(this).addClass('selected');
			makeEntryActive(entryBody, [i, j]);
			
			entry_mode_data[0][1][2].push([i, j, k]);
			entryBody.find('div.coll-action-type label').removeClass('selected').find('input').prop('checked', false);
			entryBody.find('div.coll-action-type label:nth-child('+(parseInt(entry_mode_data[1][i][1][j].entryBody[k][2])+1)+')').addClass('selected').find('input').prop('checked', true);
			actionElem.find('div.coll-action-head span.operand input').val(value[1]).focus();
		}
	//  console.log(entry_mode_data[1][i][1][j].entryBody[k]);
	random_entry(entry_mode_data, newEntry);
	 if(reload){
	 }else{
	//   actionElem.find("div.coll-action-head span.operator").text(operator);
	//   actionElem.find('div.coll-action-head span.entry-total').text(filter_currency(value[0]));
	}
	});
  
  
  
	// FUNCTIONS
  
	function collectionName(sel_collection, set=false, name="This Collection"){
	  if(set || sel_collection[0] == "") {
		entry_mode_data[1][i][0] = name;
		sel_collection = entry_mode_data[1][i];
	  }
  
	  return sel_collection;
	}
  
	function getIndexes(elem){
	  var entryBody = elem.closest('li.coll-entry-body'), sel_coll = elem.closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id")
	  if(entryBody.attr("id") != j){
		j = entryBody.attr("id");
		// makeEntryActive(elem.find("ul.coll-entry li.coll-entry-body"), [i, j]);
		makeEntryActive(entryBody, [i, j]);
	  }
	  return [i, j]
	}
  
	function setOperandBox(value) {
	  var operator = "+", num_html = "<input type='text' class='txt-inputs' style='width: 100px; padding: 10px;' placeholder='0' />", digit_html = "<input type='number' class='txt-inputs' min='2' value='2' style='width: 80px; font-size: 17px; padding: 10px;' />", sel_html = num_html;
  
	  if (value == 1) {
		operator = "-";
		sel_html = num_html;
	  } else if (value == 2) {
		operator = "x";
		sel_html = digit_html;
	  } else if (value == 3) {
		operator = "÷";
		sel_html = digit_html;
	  }
  
	  return [operator, sel_html];
	}
  
	// function computateOnEvent(value=[], topOperator="0", filteredVal=[false, "0.00"], thisEntry, indexes=[0, 0]) {
	function computateOnEvent(value=[], topOperator="0", filteredVal=[0, "", "", ""], thisEntry, indexes=[0, 0]) {
		let update = [false, 0]
		let [i, j] = indexes;
		if(entry_mode_data[0][1][2].length > 0){
			entry_mode_data[0][1][2].map(item => {
				if(item[0] == indexes[0] && item[1] == indexes[1]){
					indexes = [item[0], item[1]];
					update = [true, item[2]];
					entry_mode_data[1][i][1][j].entryBody[item[2]][0][1] = filteredVal[0];
					// entry_mode_data[1][i][1][j].entryBody[item[2]][1] = topOperator;
					entry_mode_data[1][i][1][j].entryBody[item[2]][2] = topOperator;
				}
			});
		}
		/* for(let k=update[1]; k<entry_mode_data[1][i][1][j].entryBody.length; k++){
			var data = entry_mode_data[1][i][1][j].entryBody[k][0];
			var selOperator = entry_mode_data[1][i][1][j].entryBody[k][1];
			var lastTotal = Number(data[0]);
			var thisOperand = Number(data[1]);

			if(k+1 < entry_mode_data[1][i][1][j].entryBody.length)
				entry_mode_data[1][i][1][j].entryBody[k+1][0][0] = sum_2([lastTotal, thisOperand], selOperator);
		} */
	updateEntryList(update[1], [i, j], true);
	if(!update[0]){
		if (value != "0.00" && value != "" && value != "0") {
			// if (filteredVal[0][0]) {
				var k_1 = thisEntry.entryBody.length;
				// var result_1 = 0;
				var result_1 = updateEntryList(0, [i, j], false);
				/* for (var k_2 = 0; k_2 < k_1; k_2++) {
					var data = thisEntry.entryBody[k_2][0];
					var selOperator = thisEntry.entryBody[k_2][1];
					var lastTotal = Number(data[0]);
					var thisOperand = Number(data[1]);
					
					result_1 = sum_2([lastTotal, thisOperand], selOperator);
					} */
				
				// var new_data = [result_1, filteredVal[0][1]]; // Last result and new operand
				var new_data = [result_1, filteredVal.shift()]; // Last result and new operand
				// entry_mode_data[1][i][1][j].entryBody[k_1] = [new_data, topOperator];
				entry_mode_data[1][i][1][j].entryBody[k_1] = [new_data, filteredVal, topOperator]; // Take off the first item
				// console.log(new_data);
				}
			// }
		}
				random_entry(entry_mode_data, newEntry);
	}

	function updateEntryList(base=0, index=[0, 0], save=false){
		let [i, j] = index, result = 0;
		for(let k=base; k<entry_mode_data[1][i][1][j].entryBody.length; k++){
			var data = entry_mode_data[1][i][1][j].entryBody[k][0];
			// var selOperator = entry_mode_data[1][i][1][j].entryBody[k][1];
			var selOperator = entry_mode_data[1][i][1][j].entryBody[k][2];
			var lastTotal = Number(data[0]);
			var thisOperand = Number(data[1]);

			result = sum_2([lastTotal, thisOperand], selOperator);
			// result = filter_currency(sum_2([lastTotal, thisOperand], selOperator));
			if(k+1 < entry_mode_data[1][i][1][j].entryBody.length && save)
				entry_mode_data[1][i][1][j].entryBody[k+1][0][0] = result;
		}

		return result;
	}
  
	function makeEntryActive(parent, indexes=[0, 0]){
	  let [i, j] = indexes;
	  if (!parent.is(".active") || entry_mode_data[0][1][1] !== j) {
		$(elem_sel_init + " li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
		// parent.addClass("active").find("div.coll-apply-action div.coll-apply-action-head span.operand input").focus();
		parent.addClass("active").find("div.coll-action-type-wrapper div.coll-action-head span.operand input").focus();
  
		entry_mode_data[0][1][1] = j;
	  }
	}
  
	function setCollectionName(elem, label){
	  let [i, j] = getIndexes(elem);
	  entry_mode_data[1][i][0] = label;
	  $("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][1][0]+")").text(entry_mode_data[1][i][0]);
	  
	  random_entry(entry_mode_data, newEntry);
	}
  
	function setEntryName(elem, label, indexes=[0, 0]){
	  let [i, j] = indexes;
	  entry_mode_data[1][i][1][j].entryHead.name = label;
  
	  $(elem_sel_init + elem_sel_list).removeClass("active");
	  elem.addClass("active");
  
	  entry_mode_data[0][1][1] = j;
	}
  }

	function processEntry(computation){	
		// var operatorType = computation[1] == 0 || computation[1] == 1;
		var operatorType = computation[2] == 0 || computation[2] == 1;
		// var topOperator = computation[1];
		var topOperator = computation[2];
		var number = computation[0][0];
		var operandRaw = parseFloat(computation[0][1]);
		// let operandProcessed = (operatorType) ? filter_currency(computation[0][1]) : computation[0][1]; // The operand: if operation type is +/- number should be in currency otherwise just the digit
		let operandProcessed = (operatorType) ? negativeNumber(operandRaw) : operandRaw; // The operand: if operation type is +/- number should be in currency otherwise just the digit
		// let operandProcessed = (operatorType) ? computation[0][1] : computation[0][1]; // The operand: if operation type is +/- number should be in currency otherwise just the digit
		// var mode = computation[1];

		let operand_type = "+";
		/* if (mode == 1) {
			operand_type = "-";
		} else if (mode == 2) {
			operand_type = "x";
		} else if (mode == 3) {
			operand_type = "÷";
		} */
		if (topOperator == 1) {
			operand_type = "-";
		} else if (topOperator == 2) {
			operand_type = "x";
		} else if (topOperator == 3) {
			operand_type = "÷";
		}

		/* let sum = sum_2([number, operandRaw], topOperator).toString();
		let negatives = (sum.charAt(0) == '-');
		let newSum = 0;
		if(negatives){
			newSum = sum.substring(1, sum.length)
		}
		// let answer = filter_currency(sum_2([number, operandRaw], topOperator));311245 */
		let answer = negativeNumber(sum_2([number, operandRaw], topOperator));
		let operands = [operandRaw, operandProcessed];
		console.log("Watch ", sum_2([number, operandRaw], topOperator))

		return [operatorType, topOperator, negativeNumber(number), operands, operand_type, answer];
	}

	function negativeNumber(num){
		let sum = num.toString();
		let negatives = (sum.charAt(0) == '-');
		let newSum = sum;
		if(negatives){
			newSum = sum.substring(1, sum.length)
		}

		let [left, right] = filter_currency(newSum); // Adds commas & floating point to large numbers
		let floatingPNum = right.substring(1, right.length); // right retuns '.num' eg .25, so get from index 1
		newSum = (/^0*$/.test(floatingPNum)) ? left : left+right;  // Check if no number, reject all 0s
		// return (negatives) ? '-'+filter_currency(newSum) : filter_currency(newSum);
		return (negatives) ? '-'+newSum : newSum;
	}

	function filter_currency(num, per, places) {
	  if (per == undefined) {
		per = 3;
	  }
	  if (places == undefined) {
		places = 2;
	  }
  
	  if (places == 0) {
		num = Math.round(num);
	  }
  
	  var cString = num.toString(),
		cDot = cString.indexOf("."),
		cWhole = "",
		cDec = "";
	  if (cDot == -1) { // Could not find any
		cWhole = cString;
		cDec = 0;
	  } else {
		cWhole = cString.substring(0, cDot); // All characters up to decimal place
		cDec = cString.substring(cDot + 1); // Decimal point position
	  }
  
	  var aComma = "",
		count = 0;
	  if (cWhole.length > per) {
		for (var i = cWhole.length - 1; i >= 0; i--) {
		  aComma = cWhole.charAt(i) + aComma;
		  count++;
		  if (count == per && i != 0) {
			// aComma = "," + aComma;
			aComma = "," + aComma;
			count = 0;
		  }
		}
	  } else {
		aComma = cWhole;
	  }
  
	  // Uncomment for Decimal Places either 1. or 2. method
	  // 1.
	  // cDec = cDec.replace(/[^0-9]/g, ""); // Make sure it's only numbers
	  // cDec = cDec.substring(0, places); 
	  // 2.
	  if (places == 0) {
		cDec = "";
	  } else {
		cDec = +("0." + cDec);
		cDec = cDec.toFixed(places).toString().substring(1);
	  }
  
		// console.log("Watch ",aComma,cDec)
		// return aComma + cDec;
		  return [aComma, cDec];
	}

	function checkFloat(num) { // Removes empty floating numbers e.g 35.00
		if(typeof num === 'string')
			num = parseFloat(num)
		var isFloat = (typeof num === 'number' && !isNaN(num) && num % 1 !== 0);
		var breakNum = num.toString().split('.');
		var test = /^0*$/.test(breakNum[1]);  // Check if no number, all 0s
		/* if(isFloat){ // True, it's a float
		} */
	// console.log(isFloat, test, test, typeof num, num);
		return (isFloat) ? (test) ? breakNum[0] : num : num;
	}

	function onlyNumbers(num){ // Take out all unwanted characters
		// return num.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,.<>\{\}\[\]\\\/ ]/gi, "");
		return num.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,<>\{\}\[\]\\\/ ]/gi, "");
	}

	function sum_2(data, mode) {
	  if (mode == 0) {
		return data[0] + data[1];
	  }
	  if (mode == 1) {
		return data[0] - data[1];
	  }
	  if (mode == 2) {
		return data[0] * data[1];
	  }
	  if (mode == 3) {
		return data[0] / data[1];
	  }
	}
	function digit_input_filter(elem) {
	  var currency = elem.val(),
		state = false;
	  if (m_c_e(".", currency)) {
		// Check for multiple periods
		// Caution is on index 2
		//required_box(0, [elem, $("article#finance li#new-entry section#two")], 2);
	  } else {
		currency = filter_currency(elem.val());
		if (currency == "1aN" || currency == "NaN" || currency == undefined) {
		  // Caution is on index 2
		  //required_box(0, [elem, $("article#finance li#new-entry section#two")], 2);
		} else {
		  //required_box(1, [elem, $("article#finance li#new-entry section#two")], 2);
  
		  currency = currency.split(".");
		  currency[0] = currency[0].replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,.<>\{\}\[\]\\\/ ]/gi, ""); // Make sure it's only numbers
		  currency[1] = currency[1].replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,.<>\{\}\[\]\\\/ ]/gi, ""); // Make sure it's only numbers
		//   currency = currency[0] + "." + currency[1];
		  currency = currency[0] + (!/^0*$/.test(str)) ? "." + currency[1] : "";
		//   currency = currency[0];
  
		  var currency = Number(currency);
		  state = true;
		}
	  }
  
	  return [state, currency];
	}
	function m_c_e(char, str) {
		// console.log(str)
	  // Multiple Characters Exists
	  var cnt_str = 0;
	  for (var i = 0; i < str.length; i++) {
		if (str[i] == char) {
		  cnt_str++;
		}
	  }
  
	  return cnt_str > 1;
	}

function viewModeBtn(entry_mode_data){
	// console.log(entry_mode_data[1]);
	if(entry_mode_data[0][0] == 0){
		$("div#random-entry a#view-table").css("display", "inline-block");
	}else{
		$("div#random-entry a#view-normal").css("display", "inline-block");
	}
	if(entry_mode_data[1].length == 0){
		$("div#random-entry a#view-table, div#random-entry a#view-normal").css("display", "none");
		$("div#table-view").css("display", "none");
	}else{
		if(entry_mode_data[0][0] == 0){
			$("div#random-entry a#view-table").css("display", "inline-block");
			$("div#normal-view").css("display", "block");
			$("div#random-entry a#view-normal, div#table-view").css("display", "none");
		}else{
			$("div#random-entry a#view-normal").css("display", "inline-block");
			$("div#table-view").css("display", "block");
			$("div#random-entry a#view-table, div#normal-view").css("display", "none");
		}
	}
}
  
  // This creates a new copy without reference to the original object's storage address.
  // It is a deep copy of the object.
function createNewDataSet(data) {
	// return {...data};
	// return Object.assign({}, data);
	return JSON.parse(JSON.stringify(data));
}
	function saveToExcel(){
		/* new DataTable('table#data', {
			layout: {
				topStart: {
					buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
				}
			}
		}); */

		/* Create worksheet from HTML DOM TABLE */
  var wb = XLSX.utils.table_to_book(document.getElementById("data"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SheetJSTable.xlsx");
	}