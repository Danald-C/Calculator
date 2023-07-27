$(function(){
	let entry_mode_data = [[[1, 0], 0], []];
	$("div#random-entry a#add-new-coll").click(function(){
		if(entry_mode_data[1].length == 0){
			//entry_mode_data[1][entry_mode_data[1].length] = ["Random", [["Area Week", [[[0, 0], 0]]]]];
			entry_mode_data[1][entry_mode_data[1].length] = ["", [["", []]]];
		}else{
			//var existing_data = entry_mode_data[1], new_data = [["", [["", [[[0, 0], 0]]]]]];
			var existing_data = entry_mode_data[1], new_data = [["", [["", []]]]];
			//entry_mode_data.length = 0;
			
			for(var i=0; i<existing_data.length; i++){
				new_data[new_data.length] = existing_data[i];
				//console.log(existing_data[i]);
			}
			entry_mode_data[1] = new_data;
		
		}
		
		var structure = "";
		for(var i=0; i<entry_mode_data[1].length; i++){
			structure += "<a id='"+(i+1)+"' href='#'>";
			structure += (entry_mode_data[1][i][0] == "") ? "This Entry" : entry_mode_data[1][i][0];
			structure += "</a>";
		}
		$("div#random-entry div#collection-tab").html(structure);
		
		entry_mode_data[0][0][0] = 1;
		entry_mode_data[0][1] = 0;
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][0][0]+")").addClass("selected");
		
		random_entry(entry_mode_data);
	
		$("div#random-entry div#collection-tab a").click(function(){
			$("div#random-entry div#collection-tab a").removeClass("selected");
			$(this).addClass("selected");
			
			$("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
			$("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
			
			entry_mode_data[0][0][0] = $(this).attr("id");
			
			random_entry(entry_mode_data);
			
			return false;
		});
		
		return false;
	});
});

function random_entry(entry_mode_data){
	var structure = "";
	for(var i=0; i<entry_mode_data[1].length; i++){
		structure += "<li id='"+i+"' class='collection'>";
			structure += "<div class='coll-name'>";
				structure += "<input type=='text' class='txt-fieldsShort' style='width: 450px;' placeholder='";
				structure += (entry_mode_data[1][i][0] == "") ? "Name this Collection Label.. (Optional)" : "Collection Name: "+entry_mode_data[1][i][0]+". (Change here..)";
				structure += "' />";
				structure += "<a href='#' class='coll-name-save'>Save</a>";
				structure += "<a href='#' class='coll-name-rem'>Remove Collection</a>";
			structure += "</div>";
			structure += "<div class='coll-add-entry'><a href='#'>Add New Entry</a></div>";
			structure += "<div class='coll-operand select-2-container'>";
				structure += "<select>";
					structure += "<option value=0 ";
					structure += (entry_mode_data[0][1] == 0) ? "selected" : "";
					structure += ">Add (+)</option>";
					structure += "<option value=1 ";
					structure += (entry_mode_data[0][1] == 1) ? "selected" : "";
					structure += ">Subtract (-)</option>";
					structure += "<option value=2 ";
					structure += (entry_mode_data[0][1] == 2) ? "selected" : "";
					structure += ">Multiply (x)</option>";
					structure += "<option value=3 ";
					structure += (entry_mode_data[0][1] == 3) ? "selected" : "";
					structure += ">Divide (/)</option>";
				structure += "</select>";
			structure += "</div>";
			structure += "<ul class='coll-entry'>";
			for(var j=0; j<entry_mode_data[1][i][1].length; j++){
				structure += "<li id='"+j+"' class='coll-entry-body'>";
					structure += "<div class='coll-entry-name'>";
						structure += "<span class='figure'>"+(j+1)+".</span>";
						structure += "<input type=='text' class='txt-fieldsShort' placeholder='";
						structure += (entry_mode_data[1][i][1][j][0] == "") ? "Name your Entry.. (Optional)" : "Entry Name: "+entry_mode_data[1][i][1][j][0]+". (Change here..)";
						structure += "' />";
					structure += "</div>";
					structure += "<div class='coll-entry-name-links'>";
						structure += "<a href='#'>Save Name</a>";
						structure += "<a href='#'>Reset</a>";
						structure += "<a href='#'>Remove Entry</a>";
					structure += "</div>";
					structure += "<div class='coll-apply-action'>";
						structure += "<div class='coll-apply-action-head'>";
							structure += "<span class='number figure'></span>";
							structure += "<span class='operator figure'></span>";
							structure += "<span class='operand'></span>";
							structure += "<span class='perform'><a href='#'>Add</a></span>";
						structure += "</div>";
						structure += "<ul class='coll-apply-action-body'>";
						for(var k=0; k<entry_mode_data[1][i][1][j][1].length; k++){
							var operator_type = (entry_mode_data[1][i][1][j][1][k][1] == 0 || entry_mode_data[1][i][1][j][1][k][1] == 1) ? true : false;
							var operator = entry_mode_data[1][i][1][j][1][k][1];
							var number = Number(entry_mode_data[1][i][1][j][1][k][0][0]);
							var operand = Number(entry_mode_data[1][i][1][j][1][k][0][1]);
							var mode = entry_mode_data[1][i][1][j][1][k][1];
							structure += "<li id='"+k+"'>";
								structure += "<span class='figure'>"+(k+1)+".</span>";
								structure += "<span class='figure'>"+filter_currency(entry_mode_data[1][i][1][j][1][k][0][0])+"</span>";
								structure += "<span class='operator figure'>";
								if(mode == 0){
									structure += "+";
								}
								if(mode == 1){
									structure += "-";
								}
								if(mode == 2){
									structure += "x";
								}
								if(mode == 3){
									structure += "/";
								}
								structure += "</span>";
								structure += "<span class='operand figure'>";
								if(operator_type){
									structure += filter_currency(entry_mode_data[1][i][1][j][1][k][0][1]);
								}else{
									structure += entry_mode_data[1][i][1][j][1][k][0][1];
								}
								structure += "</span>";
								structure += "<span class='figure'>=</span>";
								structure += "<span class='figure'>"+filter_currency(sum_2([number, operand], operator))+"</span>";
								structure += "<span><a href='#'>X</a></span>";
							structure += "</li>";
						}
						structure += "<br style='clear: both;' />";
						structure += "</ul>";
					structure += "</div>";
				structure += "</li>";
			}
			structure += "<br style='clear: both;' />";
			structure += "</ul>";
		structure += "</li>";
	}
	structure += "<br style='clear: both;' />";
	
	var elem_sel_init = "div#random-entry ul#collection-set";
	$(elem_sel_init).html(structure);
	$(elem_sel_init+" li.collection").removeClass("selected").css("display", "none");
	$(elem_sel_init+" li.collection:nth-child("+entry_mode_data[0][0][0]+")").addClass("selected").css("display", "block");
		
	$(elem_sel_init+" li.collection.selected div.coll-name a.coll-name-save").click(function(){
		var label = $(this).closest("div.coll-name").find("input").val(), sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id");
		if(label != ""){
			entry_mode_data[1][i][0] = label;
			$("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][0][0]+")").text(label);
		}
		
		random_entry(entry_mode_data);
		
		return false;
	});
	
	$(elem_sel_init+" li.collection.selected div.coll-name a.coll-name-rem").click(function(){
		var sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id");
		entry_mode_data[1].splice(i, 1);
		
		var structure = "";
		for(var i=0; i<entry_mode_data[1].length; i++){
			structure += "<a id='"+(i+1)+"' href='#'>";
			structure += (entry_mode_data[1][i][0] == "") ? "This Entry" : entry_mode_data[1][i][0];
			structure += "</a>";
		}
		$("div#random-entry div#collection-tab").html(structure);
		
		entry_mode_data[0][0][0] = 1;
		entry_mode_data[0][1] = 0;
		$("div#random-entry div#collection-tab a").removeClass("selected");
		$("div#random-entry div#collection-tab a:nth-child("+entry_mode_data[0][0][0]+")").addClass("selected");
		
		random_entry(entry_mode_data);
	
		$("div#random-entry div#collection-tab a").click(function(){
			$("div#random-entry div#collection-tab a").removeClass("selected");
			$(this).addClass("selected");
			
			$("div#random-entry ul#collection-set li.collection").removeClass("selected").css("display", "none");
			$("div#random-entry ul#collection-set li.collection:nth-child("+$(this).attr("id")+")").addClass("selected").css("display", "block");
			
			entry_mode_data[0][0][0] = $(this).attr("id");
			
			random_entry(entry_mode_data);
			
			return false;
		});
		
		return false;
	});
	
	$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-entry-name-links a").click(function(){
		var parent = $(this).closest("li.coll-entry-body"), entry_name = parent.find("div.coll-entry-name input").val(), sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = parent.attr("id");
		if($(this).index() == 0){
			entry_mode_data[1][i][1][j][0] = entry_name;
			
			$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
			parent.addClass("active");
			
			entry_mode_data[0][0][1] = j;
		}
		if($(this).index() == 1){
			entry_mode_data[1][i][1][j][1].length = 0;
			
			$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
			parent.addClass("active");
			
			entry_mode_data[0][0][1] = j;
		}
		if($(this).index() == 2){
			//console.log(entry_mode_data[1]);
			if(entry_mode_data[1][i][1].length > 1){
				entry_mode_data[1][i][1].splice(j, 1);
			
				$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
				parent.addClass("active");
				
				entry_mode_data[0][0][1] = 0;
			}
		}
			
		random_entry(entry_mode_data);
		
		return false;
	});
	
	var sel_operator = $(elem_sel_init+" li.collection.selected div.coll-operand select").val();
	var operator = "+", amount_html = "<input type='text' class='txt-fieldsShort' style='width: 100px;' placeholder='0.00' />", digit_html = "<input type='number' min='0' style='width: 80px; padding: 10px; font-size: 17px; border: 1px solid #aaaaaa;' placeholder='0' />", sel_html = amount_html;
	if(sel_operator == 1){
		operator = "-";
		sel_html = amount_html;
	}
	if(sel_operator == 2){
		operator = "x";
		sel_html = digit_html;
	}
	if(sel_operator == 3){
		operator = "/";
		sel_html = digit_html;
	}
	$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operator").text(operator);
	$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operand").html(sel_html);
	
	var sel_coll = $(elem_sel_init+" li.collection.selected"), i = sel_coll.attr("id");
	sel_coll.find("ul.coll-entry li.coll-entry-body").each(function(){
		var j = $(this).attr("id");
		var result = 0;
		for(var k=0; k<entry_mode_data[1][i][1][j][1].length; k++){
			var data = entry_mode_data[1][i][1][j][1][k][0];
			var sel_operator = entry_mode_data[1][i][1][j][1][k][1];
			var number = data[0];
			var operand = data[1];
			
			result = sum_2([number, operand], sel_operator);
		}
		
		if(j == entry_mode_data[0][0][1]){
			$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
			$(this).addClass("active").find("div.coll-apply-action div.coll-apply-action-head span.operand input").focus();
		}
		
		$(this).find("div.coll-apply-action div.coll-apply-action-head span.number").text(filter_currency(result));
	});
	
	$(elem_sel_init+" li.collection.selected div.coll-operand select").change(function(){
		var operator = "+", amount_html = "<input type=='text' class='txt-fieldsShort' style='width: 100px;' placeholder='0.00' />", digit_html = "<input type='number' min='0' style='width: 80px; padding: 10px; font-size: 17px; border: 1px solid #aaaaaa;' placeholder='0' />", sel_html = amount_html;
		if($(this).val() == 1){
			operator = "-";
			sel_html = amount_html;
		}
		if($(this).val() == 2){
			operator = "x";
			sel_html = digit_html;
		}
		if($(this).val() == 3){
			operator = "/";
			sel_html = digit_html;
		}
		entry_mode_data[0][1] = $(this).val();
		$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operator").text(operator);
		$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operand").html(sel_html);
		
		$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body.active div.coll-apply-action div.coll-apply-action-head span.operand input").focus();
		
	//console.log("We got here");
	//console.log(entry_mode_data[1]);
		$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operand input").keyup(function(event){
			if(event.key == "Enter"){
				var currency = digit_input_filter($(this));
				var sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id"), operator = sel_coll.find("div.coll-operand select").val();
				
				if($(this).val() != "0.00" && $(this).val() != "" && $(this).val() != "0"){
					if(currency[0]){
						var k_1 = entry_mode_data[1][i][1][j][1].length;
						var result_1 = 0;
						for(var k_2=0; k_2<k_1; k_2++){
							var data = entry_mode_data[1][i][1][j][1][k_2][0];
							var sel_operator = entry_mode_data[1][i][1][j][1][k_2][1];
							var number = Number(data[0]);
							var operand = Number(data[1]);
							
							result_1 = sum_2([number, operand], sel_operator);
						}
						var new_data = [result_1, currency[1]];
						entry_mode_data[1][i][1][j][1][k_1] = [new_data, operator];
						
						random_entry(entry_mode_data);
					}
				}
			}
		});
	});
		
	$(elem_sel_init+" li.collection.selected div.coll-add-entry a").click(function(){
		var i = $(this).closest("li.collection").attr("id");
		entry_mode_data[1][i][1][entry_mode_data[1][i][1].length] = ["", []];
		
		random_entry(entry_mode_data);
		
		return false;
	});
	
	$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.perform a").click(function(){
		var operand = $(this).closest("div.coll-apply-action-head").find("span.operand input");
		var currency = digit_input_filter(operand);
		var sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id"), operator = sel_coll.find("div.coll-operand select").val();
		
		if(operand.val() != "0.00" && operand.val() != "" && operand.val() != "0"){
			if(currency[0]){
				var k_1 = entry_mode_data[1][i][1][j][1].length;
				var result_1 = 0;
				for(var k_2=0; k_2<k_1; k_2++){
					var data = entry_mode_data[1][i][1][j][1][k_2][0];
					var sel_operator = entry_mode_data[1][i][1][j][1][k_2][1];
					var number = Number(data[0]);
					var operand = Number(data[1]);
					
					result_1 = sum_2([number, operand], sel_operator);
				}
				var new_data = [result_1, currency[1]];
				//entry_mode_data[1][i][1][j][1][k_1][0] = new_data;
				//entry_mode_data[1][i][1][j][1][k_1][1] = operator;
				entry_mode_data[1][i][1][j][1][k_1] = [new_data, operator];
				
				random_entry(entry_mode_data);
			}
		}
		
		return false;
	});
	
	$(elem_sel_init+" li.collection.selected ul.coll-entry li div.coll-apply-action ul.coll-apply-action-body li span a").click(function(){
		var i = $(this).closest("li.collection").attr("id"), j = $(this).closest("li.coll-entry-body").attr("id"), k = $(this).closest("li").attr("id");
		entry_mode_data[1][i][1][j][1].splice(k, 1);
		
		// Reshuffle
		var k_1 = entry_mode_data[1][i][1][j][1].length;
		var result_1 = 0;
		for(var k_2=0; k_2<k_1; k_2++){
			var data = entry_mode_data[1][i][1][j][1][k_2][0];
			var sel_operator = entry_mode_data[1][i][1][j][1][k_2][1];
			
			result_1 = sum_2([data[0], data[1]], sel_operator);
			if(k_2+1 < k_1){ // Let the next item hold current result
				entry_mode_data[1][i][1][j][1][k_2+1][0][0] = result_1;
			}
		}
		
		random_entry(entry_mode_data);
		
		return false;
	});
	
	$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body div.coll-apply-action div.coll-apply-action-head span.operand input").keyup(function(event){
		var parent = $(this).closest("li.coll-entry-body"), j = parent.attr("id");
		if(!parent.is(".active")){
			$(elem_sel_init+" li.collection.selected ul.coll-entry li.coll-entry-body").removeClass("active");
			parent.addClass("active");
			
			entry_mode_data[0][0][1] = j;
		}
		//console.log("Did you respond from down?");
		if(event.key == "Enter"){
			var currency = digit_input_filter($(this));
			var sel_coll = $(this).closest("li.collection"), i = sel_coll.attr("id"), j = sel_coll.find("ul.coll-entry li.coll-entry-body.active").attr("id"), operator = sel_coll.find("div.coll-operand select").val();
			
			if($(this).val() != "0.00" && $(this).val() != "" && $(this).val() != "0"){
				if(currency[0]){
					var k_1 = entry_mode_data[1][i][1][j][1].length;
					var result_1 = 0;
					for(var k_2=0; k_2<k_1; k_2++){
						var data = entry_mode_data[1][i][1][j][1][k_2][0];
						var sel_operator = entry_mode_data[1][i][1][j][1][k_2][1];
						var number = Number(data[0]);
						var operand = Number(data[1]);
						
						result_1 = sum_2([number, operand], sel_operator);
					}
					var new_data = [result_1, currency[1]];
					entry_mode_data[1][i][1][j][1][k_1] = [new_data, operator];
					
					random_entry(entry_mode_data);
				}
			}
		}
	});
}
function filter_currency(num, per, places){
	if(per == undefined){ per = 3; }
	if(places == undefined){ places = 2; }
	
	if(places == 0){ num = Math.round(num); }
	
	var cString = num.toString(), cDot = cString.indexOf("."), cWhole = "", cDec = "";
	if(cDot == -1){
		cWhole = cString;
		cDec = 0;
	}else{
		cWhole = cString.substring(0, cDot);
		cDec = cString.substring(cDot+1);
	}
	
	var aComma = "", count = 0;
	if(cWhole.length > per){
		for(var i=(cWhole.length-1); i>=0; i--){
			aComma = cWhole.charAt(i) + aComma;
			count++;
			if(count == per && i != 0){
				aComma = "," + aComma;
				count = 0;
			}
		}
	}else{
		aComma = cWhole;
	}
	
	if(places == 0){
		cDec = "";
	}else{
		cDec = +("0." + cDec);
		cDec = cDec.toFixed(places).toString().substring(1);
	}
	
	return aComma + cDec;
}
function sum_2(data, mode){
	if(mode == 0){
		return data[0] + data[1];
	}
	if(mode == 1){
		return data[0] - data[1];
	}
	if(mode == 2){
		return data[0] * data[1];
	}
	if(mode == 3){
		return data[0] / data[1];
	}
}
function digit_input_filter(elem){
	var currency = elem.val(), state = false;
	if(m_c_e(".", currency)){ // Check for multiple periods
		// Caution is on index 2
		//required_box(0, [elem, $("article#finance li#new-entry section#two")], 2);
	}else{
		currency = filter_currency(elem.val());
		if(currency == "1aN" || currency == "NaN" || currency == undefined){
			// Caution is on index 2
			//required_box(0, [elem, $("article#finance li#new-entry section#two")], 2);
		}else{
			//required_box(1, [elem, $("article#finance li#new-entry section#two")], 2);
			
			currency = currency.split(".");
			currency[0] = currency[0].replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:\|,.<>\{\}\[\]\\\/ ]/gi, '');
			currency = currency[0]+"."+currency[1];
			
			var currency = Number(currency);
			state = true;
		}
	}
	
	return [state, currency];
}
function m_c_e(char, str){ // Multiple Characters Exists
	var cnt_str = 0;
	for(var i=0; i<str.length; i++){
		if(str[i] == char){
			cnt_str++;
		}
	}
	
	return (cnt_str > 1) ? true : false;
}