$(function () {
	let entry_mode_data = [[1, 0], []], newEntry = {entryHead: {name: "", topOperator: "0"}, entryBody: []}, newCollection = ["", [createNewDataSet(newEntry)]];
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
	  $("div#random-entry div#collection-tab a:nth-child(" + entry_mode_data[0][0] + ")").addClass("selected");
  
	  random_entry(entry_mode_data, newEntry);
  
	  $("div#random-entry div#collection-tab a").click(function () {
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$(this).addClass("selected");
  
		$("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
		$("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
  
		entry_mode_data[0][0] = $(this).attr("id");
  
		random_entry(entry_mode_data, newEntry);
  
		return false;
	  });
  
	  return false;
	});
  });
  
  function random_entry(entry_mode_data, newEntry) {
	var structure = "";
	for (var i = 0; i < entry_mode_data[1].length; i++) {
	  let thisCollection = entry_mode_data[1][i];
  
	  structure += "<li id='" + i + "' class='collection'>";
	  structure += "<div class='coll-body'>";
		structure += "<input type=='text' class='txt-inputs' style='width: 450px;' placeholder='";
		structure += thisCollection[0] == "" ? "Name this Collection.. (Optional)" : "Collection Name: " + thisCollection[0] + ". (Change here..)";
		structure += "' />";
		structure += "<a href='#' class='ordinary'>Save Name</a>";
		structure += "<a href='#' class='remove'>Remove Collection</a>";
		structure += "<a href='#' class='add'>Add New Entry</a>";
	  structure += "</div>";
	  structure += "<ul class='coll-entry'>";
	  thisCollection[1].map((entry, j) => {
	  // for (var j = 0; j < thisCollection[1].length; j++) {
		// let thisEntry = thisCollection[1][j];
		let thisEntry = entry;
  
		structure += "<li id='" + j + "' class='coll-entry-body'>";
		structure += "<div class='coll-entry-name'>";
		structure += "<span class='figure'>" + (j + 1) + ".</span>";
		structure += "<input type='text' class='txt-inputs' placeholder='";
		// structure += thisEntry[0].name == "" ? "Name your Entry.. (Optional)" : thisEntry[0].name + ". (Change here..)";
		structure += thisEntry.entryHead.name == "" ? "Name your Entry.. (Optional)" : /* : "Entry Name: " + */ thisEntry.entryHead.name + ". (Change here..)";
		structure += "' />";
		structure += "</div>";
		structure += "<div class='coll-entry-name-links'>";
		structure += "<a href='#' class='ordinary'>Save Name</a>";
		structure += "<a href='#' class='ordinary'>Reset</a>";
		structure += "<a href='#' class='remove'>Remove Entry</a>";
		structure += "</div>";
		structure += "<div class='coll-action-type'>";
		  structure += "<label class='";
		  // structure += thisEntry[0].topOperator == 0 ? "selected" : "";
		  structure += thisEntry.entryHead.topOperator == 0 ? "selected" : "";
		  structure += "' title='Addition'>";
			structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=0 ";
			// structure += thisEntry[0].topOperator == 0 ? "checked" : "";
			structure += thisEntry.entryHead.topOperator == 0 ? "checked" : "";
			structure += " /> +";
		  structure += "</label>";
		  structure += "<label class='";
		  // structure += thisEntry[0].topOperator == 1 ? "selected" : "";
		  structure += thisEntry.entryHead.topOperator == 1 ? "selected" : "";
		  structure += "' title='Subtraction'>";
			structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=1 ";
			// structure += thisEntry[0].topOperator == 1 ? "checked" : "";
			structure += thisEntry.entryHead.topOperator == 1 ? "checked" : "";
			structure += " /> -";
		  structure += "</label>";
		  structure += "<label class='";
		  // structure += thisEntry[0].topOperator == 2 ? "selected" : "";
		  structure += thisEntry.entryHead.topOperator == 2 ? "selected" : "";
		  structure += "' title='Multiplication'>";
			structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=2 ";
			// structure += thisEntry[0].topOperator == 2 ? "checked" : "";
			structure += thisEntry.entryHead.topOperator == 2 ? "checked" : "";
			structure += " /> x";
		  structure += "</label>";
		  structure += "<label class='";
		  // structure += thisEntry[0].topOperator == 3 ? "selected" : "";
		  structure += thisEntry.entryHead.topOperator == 3 ? "selected" : "";
		  structure += "' title='Division'>";
			structure += "<input type='radio' name='coll-action-type-"+(i)+"-"+(j)+"' value=3 ";
			// structure += thisEntry[0].topOperator == 3 ? "checked" : "";
			structure += thisEntry.entryHead.topOperator == 3 ? "checked" : "";
			structure += " /> ÷";
		  structure += "</label>";
		structure += "</div>";
		structure += "<div class='coll-apply-action'>";
		structure += "<div class='coll-apply-action-head'>";
		structure += "<span class='entry-total figure'></span>";
		structure += "<span class='operator figure'></span>";
		structure += "<span class='operand'></span>";
		structure += "<span class='perform'><a href='#' class='add'>Add</a></span>";
		structure += "</div>";
		structure += "<ul class='coll-apply-action-body'>";
		thisEntry.entryBody.forEach((computation, k) => {
		// for (var k = 0; k < thisEntry[1].length; k++) {
		  // var thisComputation = thisEntry[1][k];
		  var thisComputation = computation;
		  var operatorType = thisComputation[1] == 0 || thisComputation[1] == 1 ? true : false;
		  var topOperator = thisComputation[1];
		  var number = Number(thisComputation[0][0]);
		  var operand = Number(thisComputation[0][1]);
		  var mode = thisComputation[1];
  
		  structure += "<li id='" + k + "'>";
		  structure += "<span class='s-n figure'>" + (k + 1) + ".</span>";
		  structure += "<span class='figure'>" + filter_currency(thisComputation[0][0]) + "</span>"; // Last total computation
		  structure += "<span class='operator figure'>";
  
		  let operand_type = "+";
		  if (mode == 1) {
			operand_type = "-";
		  } else if (mode == 2) {
			operand_type = "x";
		  } else if (mode == 3) {
			operand_type = "÷";
		  }
  
		  // console.log(mode + " " + operand_type);
		  structure += operand_type;
		  structure += "</span>";
		  structure += "<span class='operand figure'>";
		  structure += (operatorType) ? filter_currency(thisComputation[0][1]) : thisComputation[0][1];
		  structure += "</span>";
		  structure += "<span class='figure'>=</span>";
		  structure += "<span class='figure'>" + filter_currency(sum_2([number, operand], topOperator)) + "</span>";
		  structure += "<span><a href='#' class='remove'>X</a></span>";
		  structure += "</li>";
		// }
		});
		structure += "<br style='clear: both;' />";
		structure += "</ul>";
		structure += "</div>";
		structure += "</li>";
	  // }
	  });
	  structure += "<br style='clear: both;' />";
	  structure += "</ul>";
	  structure += "</li>";
	}
	structure += "<br style='clear: both;' />";
  
	var elem_sel_init = "div#random-entry ul#collection-set", elem_sel_list = " li.collection.selected ul.coll-entry li.coll-entry-body";
	$(elem_sel_init).html(structure);
	$(elem_sel_init + " li.collection").removeClass("selected").css("display", "none");
	$(elem_sel_init + " li.collection:nth-child("+entry_mode_data[0][0]+")").addClass("selected").css("display", "block");
  
  
  
  
	var sel_coll = $(elem_sel_init + " li.collection.selected"), i = sel_coll.attr("id");
	sel_coll.find("ul.coll-entry li.coll-entry-body").each(function () {
	  var j = $(this).attr("id"), result = 0, thisEntry = entry_mode_data[1][i][1][j];
  
	  for (var k = 0; k < thisEntry.entryBody.length; k++) {
		var data = thisEntry.entryBody[k][0];
		var sel_operator = thisEntry.entryBody[k][1];
		var lastTotal = data[0];
		var operand = data[1];
  
		result = sum_2([lastTotal, operand], sel_operator);
	  }
	  
	  let [operator, sel_html] = setOperandBox(thisEntry.entryHead.topOperator);
	  $(this).closest("li.coll-entry-body").find("div.coll-apply-action div.coll-apply-action-head span.operator").text(operator);
	  $(this).closest("li.coll-entry-body").find("div.coll-apply-action div.coll-apply-action-head span.operand").html(sel_html);
  
	  if (j == entry_mode_data[0][1]) { // Active Entry
		makeEntryActive($(this), [i, j])
	  }
  
	  $(this).find("div.coll-apply-action div.coll-apply-action-head span.entry-total").text(filter_currency(result));
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
  
		entry_mode_data[0][0] = 1; // Reset to first collection
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][0]+")").addClass("selected");
  
		if (entry_mode_data[1].length == 0) {
		  $("div#random-entry ul#collection-set").css("display", "none");
		}
		random_entry(entry_mode_data, newEntry);
  
		$("div#random-entry div#collection-tab a").click(function () {
		  $("div#random-entry div#collection-tab a").removeClass("selected");
		  $(this).addClass("selected");
  
		  $("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
		  $("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
  
		  entry_mode_data[0][0] = $(this).attr("id");
  
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
  
		entry_mode_data[0][1] = j;
	  }
	  if ($(this).index() == 2) { // Remove Entry
		if (entry_mode_data[1][i][1].length > 1) {
		  entry_mode_data[1][i][1].splice(j, 1);
  
		  if(entry_mode_data[1][i][1].length > 0){
			$(elem_sel_init + elem_sel_list).removeClass("active");
			j = (j-1 == -1 || entry_mode_data[1][i][1].length > j) ? j : j-1;
			$(this).closest("li.coll-entry-body:nth-child("+(j)+")").addClass("active");
			
			entry_mode_data[0][1] = j;
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
	  
	  entry_mode_data[1][i][1][j].entryHead.topOperator = $(this).val();
	  
	  random_entry(entry_mode_data, newEntry);
	})
  
	// Perform computation
	$(elem_sel_init + elem_sel_list + " div.coll-apply-action div.coll-apply-action-head span.perform a").click(function () {
	  var operand = $(this).closest("div.coll-apply-action-head").find("span.operand input");
	  var currency = digit_input_filter(operand);
  
	  let [i, j] = getIndexes($(this));
	  let thisEntry = entry_mode_data[1][i][1][j], topOperator = thisEntry.entryBody.length == 0 ? "0" : $(this).closest("li.coll-entry-body").find("div.coll-action-type label.selected input[type=radio]").val();
  
	  computateOnEvent(operand.val(), topOperator, currency, thisEntry, [i, j]);
  
	  return false;
	});
  
	// Remove Computation
	$(elem_sel_init + elem_sel_list + " div.coll-apply-action ul.coll-apply-action-body li span a").click(function () {
	  var i = $(this).closest("li.collection").attr("id"), j = $(this).closest("li.coll-entry-body").attr("id"), k = $(this).closest("li").attr("id");
	  
	  entry_mode_data[1][i][1][j].entryBody.splice(k, 1);
  
	  let thisEntry = entry_mode_data[1][i][1][j];
  
	  // Reshuffle
	  var k_1 = thisEntry.entryBody.length;
	  var result_1 = 0;
	  for (var k_2 = 0; k_2 < k_1; k_2++) {
		var data = thisEntry.entryBody[k_2][0];
		var sel_operator = thisEntry.entryBody[k_2][1];
  
		result_1 = sum_2([data[0], data[1]], sel_operator);
		if (k_2+1 < k_1) {
		  // Let the next item hold current total result
		  entry_mode_data[1][i][1][j].entryBody[k_2 + 1][0][0] = result_1;
		}
	  }
  
	  makeEntryActive($(this).closest("li.coll-entry-body"), [0, j])
	  random_entry(entry_mode_data, newEntry);
  
	  return false;
	});
  
	// Compute on Keyboard Enter Keyup
	$(elem_sel_init + elem_sel_list + " div.coll-apply-action div.coll-apply-action-head span.operand input").keyup(function (event) {
	  let [i, j] = [$(this).closest("li.collection").attr("id"), $(this).closest("li.coll-entry-body").attr("id")];
	  makeEntryActive($(this).closest("li.coll-entry-body"), [i, j]);
  
	  if (event.key == "Enter") {
		var currency = digit_input_filter($(this).closest('span.operand').find('input'));
		let topOperator = entry_mode_data[1][i][1][j].entryBody.length == 0 ? "0" : $(this).closest("li.coll-entry-body").find("div.coll-action-type label.selected input[type=radio]").val();
		let thisEntry = entry_mode_data[1][i][1][j];
		
		computateOnEvent($(this).val(), topOperator, currency, thisEntry, [i, j]);
	  }
	});
  
  
  
	// FUNCTIONS
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
	  if (cDot == -1) {
		cWhole = cString;
		cDec = 0;
	  } else {
		cWhole = cString.substring(0, cDot);
		cDec = cString.substring(cDot + 1);
	  }
  
	  var aComma = "",
		count = 0;
	  if (cWhole.length > per) {
		for (var i = cWhole.length - 1; i >= 0; i--) {
		  aComma = cWhole.charAt(i) + aComma;
		  count++;
		  if (count == per && i != 0) {
			aComma = "," + aComma;
			count = 0;
		  }
		}
	  } else {
		aComma = cWhole;
	  }
  
	  if (places == 0) {
		cDec = "";
	  } else {
		cDec = +("0." + cDec);
		cDec = cDec.toFixed(places).toString().substring(1);
	  }
  
	  return aComma + cDec;
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
		  currency[0] = currency[0].replace(
			/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,.<>\{\}\[\]\\\/ ]/gi,
			""
		  );
		  currency = currency[0] + "." + currency[1];
  
		  var currency = Number(currency);
		  state = true;
		}
	  }
  
	  return [state, currency];
	}
	function m_c_e(char, str) {
	  // Multiple Characters Exists
	  var cnt_str = 0;
	  for (var i = 0; i < str.length; i++) {
		if (str[i] == char) {
		  cnt_str++;
		}
	  }
  
	  return cnt_str > 1 ? true : false;
	}
  
	function collectionName(sel_collection, set=false, name="This Collection"){
	  if(set || sel_collection[0] == "") {
		entry_mode_data[1][i][0] = name;
		sel_collection = entry_mode_data[1][i];
	  }
  
	  return sel_collection;
	}
  
	function getIndexes(elem){
	  var sel_coll = elem.closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id")
	  if(elem.closest("li.coll-entry-body").attr("id") != j){
		j = elem.closest("li.coll-entry-body").attr("id");
		makeEntryActive(elem.find("ul.coll-entry li.coll-entry-body"), [i, j]);
	  }
	  return [i, j]
	}
  
	function setOperandBox(value) {
	  var operator = "+", amount_html = "<input type='text' class='txt-inputs' style='width: 100px;' placeholder='0.00' />", digit_html = "<input type='number' class='txt-inputs' min='2' style='width: 80px; font-size: 17px;' value='2' />", sel_html = amount_html;
  
	  if (value == 1) {
		operator = "-";
		sel_html = amount_html;
	  } else if (value == 2) {
		operator = "x";
		sel_html = digit_html;
	  } else if (value == 3) {
		operator = "÷";
		sel_html = digit_html;
	  }
  
	  return [operator, sel_html];
	}
  
	function computateOnEvent(value="", topOperator="0", filteredVal=[false, "0.00"], thisEntry, indexes=[0, 0]) {
	  console.log(topOperator);
	  if (value != "0.00" && value != "" && value != "0") {
		if (filteredVal[0]) {
		  var k_1 = thisEntry.entryBody.length;
		  var result_1 = 0;
		  let [i, j] = indexes;
		  for (var k_2 = 0; k_2 < k_1; k_2++) {
			var data = thisEntry.entryBody[k_2][0];
			var selOperator = thisEntry.entryBody[k_2][1];
			var lastTotal = Number(data[0]);
			var thisOperand = Number(data[1]);
  
			result_1 = sum_2([lastTotal, thisOperand], selOperator);
		  }
		  var new_data = [result_1, filteredVal[1]];
		  entry_mode_data[1][i][1][j].entryBody[k_1] = [new_data, topOperator];
  
		  random_entry(entry_mode_data, newEntry);
		}
	  }
	}
  
	function makeEntryActive(parent, indexes=[0, 0]){
	  let [i, j] = indexes;
	  if (!parent.is(".active") || entry_mode_data[0][1] !== j) {
		$(elem_sel_init + " li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
		parent.addClass("active").find("div.coll-apply-action div.coll-apply-action-head span.operand input").focus();
		// console.log(parent);
  
		entry_mode_data[0][1] = j;
	  }
	}
  
	function setCollectionName(elem, label){
	  let [i, j] = getIndexes(elem);
	  entry_mode_data[1][i][0] = label;
	  $("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][0]+")").text(entry_mode_data[1][i][0]);
	  
	  random_entry(entry_mode_data, newEntry);
	}
  
	function setEntryName(elem, label, indexes=[0, 0]){
	  let [i, j] = indexes;
	  entry_mode_data[1][i][1][j].entryHead.name = label;
  
	  $(elem_sel_init + elem_sel_list).removeClass("active");
	  elem.addClass("active");
  
	  entry_mode_data[0][1] = j;
	}
  }
  
  // This creates a new copy without reference to the original object's storage address.
  // It is a deep copy of the object.
function createNewDataSet(data) {
	// return {...data};
	// return Object.assign({}, data);
	return JSON.parse(JSON.stringify(data));
}