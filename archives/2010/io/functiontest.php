<?php include './elements/includes/head.php'; ?>

<body>
<div id="header">
	<div class="wrap">
	<div id="vivlogo">
	<img src="elements/img/vivlogo.gif" />
	</div>
	<div id="iologo"></div>
	</div>
</div>

<?php 
include ("app/Includes/FusionCharts.php");

//Create an XML data document in a string variable
   $strXML  = "";
   $strXML .= "<graph caption='Monthly Unit Sales' xAxisName='Month' yAxisName='Units'
   decimalPrecision='0' formatNumberScale='0'>";
   $strXML .= "<set name='Jan' value='462' />";
   $strXML .= "<set name='Feb' value='857'/>";
   $strXML .= "<set name='Mar' value='671' />";
   $strXML .= "<set name='Apr' value='494'/>";
   $strXML .= "<set name='May' value='761' />";
   $strXML .= "<set name='Jun' value='960'  />";
   $strXML .= "<set name='Jul' value='629'  />";
   $strXML .= "<set name='Aug' value='622' />";
   $strXML .= "<set name='Sep' value='376' />";
   $strXML .= "<set name='Oct' value='494'  />";
   $strXML .= "<set name='Nov' value='761'  />";
   $strXML .= "<set name='Dec' value='960' />";
   $strXML .= "</graph>";
	
	include ("Data/Data.xml");
	echo renderChartHTML("app/FusionCharts/Column3D.swf", "Data/Data.xml", "", "myFirst", 600, 300); 

echo "function graph()";


function graph($query = 'select value, count(*) from custom_data_n_acls group by value', $type = 'pie', $dp = 'value', $value = 'count(*)', $gheight = '300', $gwidth = '400'){
	echo $query;
	echo $type;
	echo $dp;
	echo $value;
	echo $gheight;
	echo $gwidth;
	
	
	$db = new SQLite3('urlss.sqlite');
	$result = $db->query($query);
	
	while ($row = $result->fetchArray()) {
							if (!empty($_GET['dp'])){
								$datapoint = $_GET['dp'];}
								else {$datapoint = 'value';}
							if (!empty($_GET['value'])){
								$value = $_GET['value'];
								}
								else {$value = 'count(*)';}
							
							
							if (isset($datapoint)) {echo "[".$row[$datapoint].",";}
							if (isset($value)) {echo $row[$value]."],";}
						}
}

graph();

///setting the variables
$queries = $_GET['queries'];

$maxqueries = 10;
$type = $_GET['type'];
$dp = $_GET['dp'];
$value = $_GET['value'];
$gheight = $_GET['gheight'];
$gwidth = $_GET['gwidth'];

$db = new SQLite3('urlss.sqlite');
$result = $db->query($query);

if (!empty($type)) {
	$type = 'pie';
	}


for($i = 1; $i < $maxqueries; $i++)
{
	$name = 'query' . $i; 
	$$name =  $_GET[$name];
	if (!empty($_GET[$name])){
		print "<h4>".$name.": </h4>";
		print $$name . '<br/>';
		print "<h4>".$name." output: </h4>";
			$results = $db->query($$name);
				while ($row = $results->fetchArray()) {
					var_dump($row);
				}
				$results->finalize();
		
		
		print "<h4>".$name." formatted output: </h4>";
			$results2 = $db->query($$name);
				while ($row = $results2->fetchArray()) {
							if (!empty($_GET['dp'])){
								$datapoint = $_GET['dp'];}
								else {$datapoint = 'value';}
							if (!empty($_GET['value'])){
								$value = $_GET['value'];
								}
								else {$value = 'count(*)';}
							
							
							if (isset($datapoint)) {echo "[".$row[$datapoint].",";}
							if (isset($value)) {echo $row[$value]."],";}
						}
		
		print "<h4>".$name." graph".$i.": </h4>";
			echo "<div class='graph' id='graph".$i."' width='".$gwidth."' height='".$gheight."'></div>";
			echo "<script type='text/javascript'>";
			echo "var data = [";
			$results2 = $db->query($$name);
			while ($row = $results2->fetchArray()) {
							if (!empty($_GET['dp'])){
								$datapoint = $_GET['dp'];}
							if (!empty($_GET['value'])){
								$value = $_GET['value'];
								}
							
							
							
							if (isset($datapoint)) {echo "[".$row[$datapoint].",";}
							if (isset($value)) {echo $row[$value]."],";}
						}
			echo "];";
			echo "var plotter = EasyPlot('";
				print $type;
			echo "', {backgroundColor: Color.whiteColor()}, $('graph".$i."'), [data]);</script>";
			
	//		$results = $db->query($$name);
	//			while ($row = $results->fetchArray()) {					
	//						echo "[".$row["value"].",".$row["foo"]."],";
	//					}
		
		print "<br/>";
	
	}
}


?>
//
<div id="content" class="wrap">
	<div id="info">
		<form name='form' action="index.php" method="get">
		<?php
		for($i = 1; $i <= $queries; $i++){
				$name = 'query' . $i; 
				$$name =  $_GET[$name];

				print $name.": <textarea ";
				print " name='".$name."'"." label='".$name."'>";
				if (isset($$name)) {
						echo $$name;
						}
				print "</textarea><br/>";
		}
		?>
		<select name="queries" size="1">
		<option value="">number of queries</option>
		<?php
		$j = 1;
		while ($j <= $maxqueries){
			if ($j == $queries) {
				print "<option selected='selected' value='".$j."'>".$j."</option>";	
			}
			else{
			print "<option value='".$j."'>".$j."</option>";
			}
			$j++;
		}
		?>		
		</select>
		
		<select name="type" size="1"><option value="pie">chart style</option><?php if (!empty($type)) {echo "<option selected='selected' value='".$type."'>previous type (".$type.")</option>" ;} ?><option value="line">line</option><option value="bar">bar</option><option value="pie">pie</option></select>
		<select name="dp" size="1"><option value="">data point</option><?php if (!empty($dp)) {echo "<option selected='selected' value='".$dp."'>previous datapoint (".$dp.")</option>" ;} ?><option value="value">value</option><option value="foo">foo</option></select>
		<select name="value" size="1"><option value="value">value</option><option value="count(*)">count(*)</option><option value="foo">foo</option></select>
		<select name="gheight" size="1"><option value="300">height</option><?php if (!empty($gheight)) {echo "<option selected='selected' value='".$gheight."'>previous height (".$gheight.")</option>" ;} ?><option value="200">200</option><option value="250">250</option><option value="300">300</option><option value="350">350</option><option value="400">400</option><option value="450">450</option></select>
		<select name="gwidth" size="1"><option value="300">width</option><?php if (!empty($gwidth)) {echo "<option selected='selected' value='".$gwidth."'>previous width (".$gwidth.")</option>" ;} ?><option value="200">200</option><option value="250">250</option><option value="300">300</option><option value="350">350</option><option value="400">400</option><option value="450">450</option></select>
		<input type="submit"/>
		</form>
		<div class="info-title"></div>


	
		</div>
				
	</div>
</div>



<?php include './elements/includes/footer.php'; ?>

</body>
</html>