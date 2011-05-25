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

$list = array ();
$bigarray = array ();

for($i = 1; $i <= $queries; $i++)
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
							
							$a = "[".$row[$datapoint].",".$row[$value]."],";
							
							array_push($list,$a);
							
						}
			foreach ($list as $key => $value) {
				echo $value;
				}
		
		
		
		echo "<br/><br/><br/><br/>";
	
	}
	
}
	
	

print "<h4>".$name." graph: </h4>";
			echo "<div class='graph' id='graph' width='".$gwidth."' height='".$gheight."'></div>";
			echo "<script type='text/javascript'>";
			echo "var data = [";
			foreach ($list as $key => $value) {
				echo $value;
				}
			echo "];";
			echo "var plotter = EasyPlot('";
				print $type;
			echo "', {backgroundColor: Color.whiteColor()}, $('graph'), [data]);</script>";
			
	//		$results = $db->query($$name);
	//			while ($row = $results->fetchArray()) {					
	//						echo "[".$row["value"].",".$row["foo"]."],";
	//					}


?>

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
