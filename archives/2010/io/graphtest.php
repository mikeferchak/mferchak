<html>
<body>
<form name='form' action="graphtest.php" method="get" style="font-size:12px; font-family:Arial, Helvetica, sans-serif;">
	<span>query:</span><textarea name='query'label='".$name."' cols="80" rows="1"><?php if (isset($getquery)) {echo $getquery;} else {echo 'select value as x, count(*) as y from data_filetypes group by value ORDER BY count() DESC limit 10';}?></textarea><br/>
	<span>title:</span><textarea name='title' cols="80" rows="1"><?php	if (isset($gettitle)) {echo $gettitle;}	else {echo 'Custom chart';}?></textarea><br/>
		<select name="type" size="1"><option value="pie">chart style</option><option value="Bar2D">bar</option><option value="Line">line</option><option value="Area2D">area</option><option value="Column2D">column</option><option selected="select" value="Pie2D">pie</option></select>
		<input type="submit"/>
		</form>
<?php
include("../app/Includes/FusionCharts.php");
$getquery = $_GET[query];

if (empty($_GET[query])){
	$getquery = 'select value as x, count(*) as y from data_filetypes group by value ORDER BY count() DESC limit 10';
	}


$gwidth = '800';
$gheight = '600';

$gettitle = $_GET[title];
$gettype = $_GET[type];

if (!empty($getquery)) {
$graph = graph($getquery,$gettype,'600','800','','',$_GET[title]);
echo renderChartHTML("./app/FusionCharts/".$gettype.".swf", "", $graph, "myNext", $gwidth, $gheight, '');
}


function graph($query, $type, $gheight, $gwidth, $xlabel, $ylabel, $title){
	
	$str = "";
	$strXML = "";
	$strXML .= "<graph caption='".$title."' xAxisName='".$xlabel."' yAxisName='".$ylabel."' decimalPrecision='0' formatNumberScale='0'>";
	$datapoint = 'x';
	$value = 'y';
	$db = new SQLite3('urlss.sqlite');
	$result = $db->query($query);
	
	while($row = $result->fetchArray())
  {
 
    $str .= "<set name='".$row[$datapoint]."' value='".$row[$value]."' />";
  }
	
	$strXML .= $str;
	$strXML .= "</graph>";
	return $strXML;
}
 
echo "\n\n\n";
echo "<!-- The chart XML -->\n";
echo $graph;
?>


</body>
</HTML>