<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jQuery Horizontal Selector</title>
	<!-- Jquery -->
	<script src="js/jquery-1.11.3.min.js"></script>
	
	<!-- Horizontal Slider -->
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="js/horizontal_selector.js"></script>

</head>
<body>
<div id="selectorContainer">
	<select id="myHorizontalSelect" class="ab cd de">
		<option value="a">This is option A</option>
		<option value="b">This is option B</option>
		<option value="c">This is option C</option>
		<option value="d">This is option D</option>
		<option value="e">This is option E</option>
		<option value="f">This is option F</option>
	</select >

	<select id="myHorizontalSelect2">
		<option value="a">This is option A</option>
		<option value="b">This is option B</option>
		<option value="c">This is option C</option>
		<option value="d">This is option D</option>
		<option value="e">This is option E</option>
		<option value="f">This is option F</option>
	</select >

	<select id="myHorizontalSelect3">
	</select>
</div>
<script>
	var values1 = Array();
	var values2 = Array();
	values1.push({ 'id': 0, 'val': 'first'});
	values1.push({ 'id': 1, 'val': 'second'});
	values2.push("first");
	values2.push("second");
	values2.push("third");
	values2.push("fourth");
	$("#myHorizontalSelect").horizontalSelector({
		setValueWithID: values1,
		changeEventById: function(id){
			console.log(id);
			console.log($(this).find('option').eq(id).html());
		}
	});

	$("#myHorizontalSelect2").horizontalSelector({
		setValue: values2,
		changeEventByValue: function(value){
			console.log(value);
		}
	});
	$("#myHorizontalSelect3").horizontalSelector({
		setValue: values2,
		changeEventByValue: function(value){
			console.log(value);
		}
	});
</script>
</body>
</html>