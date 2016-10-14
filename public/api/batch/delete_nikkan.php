<?php

function get_index(){
	$xml="http://delivery.nikkansports.com/xml/flash/baseball/delete.xml
	http://delivery.nikkansports.com/xml/flash/soccer/delete.xml
	http://delivery.nikkansports.com/xml/flash/sports/delete.xml
	http://delivery.nikkansports.com/xml/flash/battle/delete.xml
	http://delivery.nikkansports.com/xml/paper/baseball/delete.xml
	http://delivery.nikkansports.com/xml/paper/soccer/delete.xml
	http://delivery.nikkansports.com/xml/paper/sports/delete.xml
	http://delivery.nikkansports.com/xml/paper/battle/delete.xml";
	$xml=explode("\n",$xml);
	for($i=0;$i<count($xml);$i++){
		$x[]=sprintf("%s\n\n%s",$xml[$i],file_get_contents(trim($xml[$i])));
	}
	return $x;
}

$x=implode("\n\n\n\n",get_index());

file_put_contents(sprintf("/var/www/data/deleterss/%s.txt",date("YmdHis")),$x);

?>