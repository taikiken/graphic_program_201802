<?php

class calendar{

	var $year=0;
	var $month=0;
	var $date=0;
	var $flag;
	var $Y;
	var $backup=false;
	var $today=0;
	
	function calendar($year,$month,$date){
		$this->year=(int) $year;
		$this->month=(int) $month;
		$this->date=(int) $date;
		$this->flag=$flag;
	}
	
	function getToday(){
		return $this->today;
	}
	
	function _days(){
		return date('d',mktime(0,0,0,$this->month+1,0,$this->year));
	}
	
	function _first_day(){
		return date('w',mktime(0,0,0,$this->month,1,$this->year));
	}
	
	function _last_day(){
		return date('w',mktime(0,0,0,$this->month,$this->_days(),$this->year));
	}
	
	function make_calendar(){
		
		$days=(int) $this->_days();
		$first_day=(int) $this->_first_day();
		$last_day=(int) $this->_last_day();
		
		$last_week_days=($days+$first_day)%7;	
		if ($last_week_days == 0){
			$weeks=($days+$first_day)/7;
		}else{
			$weeks=ceil(($days+$first_day)/7);
		}
		
		$calendar =sprintf("<table class=\"t%s",$this->flag);
		$calendar.="\">\n<caption>{$this->year}年{$this->month}月の営業日</caption>\n<tr>\n<th class=\"sun\">日</th>\n<th>月</th>\n<th>火</th>\n<th>水</th>\n<th>木</th>\n<th>金</th>\n<th>土</th>\n</tr>";
		
		$i=$j=$day=0;
		while($i<$weeks){
			$calendar.='<tr>';
			$j=0;
			while($j<7){
				$calendar.= '<td';
				if(($i==0 && $j<$first_day)||($i==$weeks-1 && $j>$last_day)){
					$calendar.= ">&nbsp;";
				}else{
					$day++;
					$calendar.=sprintf(" class=\"o\" id=\"%s-%s-%s\"",$this->year,$this->month,$day);
					$calendar.= '>';
					$calendar.= $day;
				}
			$calendar.= '</td>';
			$j++;
			}
			$calendar.= '</tr>';
			$i++;
		}
		if($weeks==5){
			$calendar.="<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
		}
		$calendar.= '</table>';
		return $calendar;
	}

}

$m=date("n");
$calendar=new calendar(date('Y'),$m,date('j'));
$currentmonth=$calendar->make_calendar();
$calendar=new calendar(($m+1)<=12?date('Y'):date('Y')+1,($m+1)<=12?($m+1):1,date('j'));
$nextmonth=$calendar->make_calendar();
$calendar=new calendar(($m+2)<=12?date('Y'):date('Y')+1,($m+2)<=12?($m+2):($m+2)-12,date('j'));
$nnextmonth=$calendar->make_calendar();

$c=sprintf("<div class=\"calendar clearfix\">%s%s%s</div>",$currentmonth,$nextmonth,$nnextmonth);
echo $c;

$HT=explode("\n",$p[$f_name]);

for($i=0;$i<count($HT);$i++){
	$HT[$i]=trim($HT[$i]);
	$HT[$i]=sprintf("#%s",str_replace(".","-",$HT[$i]));
}

?>
<script type="text/javascript">
$(function(){
	
	$("<?=implode(",",$HT)?>").addClass("act").css({backgroundColor:"#ffeeee",fontWeight:"bold",color:"#cc3333"});
	$("[name$='p_style']").hide();
	
	var y="";
	$(".calendar .o").hover(
		function(){
			if(!$(this).attr("class").match(/act/))$(this).css({backgroundColor:"#ffeeee"});
		},
		function(){
			if(!$(this).attr("class").match(/act/))$(this).css({backgroundColor:"#fff"})
		}
	);
	$(".calendar .o").click(function(){
		y="";
		if(!$(this).attr("class").match(/act/)){
			$(this).addClass("act");
			$(this).css({backgroundColor:"#ffeeee",fontWeight:"bold",color:"#cc3333"});
		}else{
			$(this).removeClass("act");
			$(this).css({backgroundColor:"#fff",fontWeight:"normal",color:"#333333"});
		}
		$(".calendar .o").each(function(){
			if($(this).attr("class").match(/act/)){
				y+=$(this).attr("id").replace(/-/g,".");
				y+="\n";
			}
		});
		$("[name$='p_style']").val(y);
	});
	
});
</script>




