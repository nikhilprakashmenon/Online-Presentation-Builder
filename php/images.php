<html>
<head>
<meta http-equiv="Content-Type" content="text/html">
<title>Show images in folder</title>
<style type="text/css">
body {
    margin: 0 auto 20px;
    padding: 0;
    background: #acacac;
    display: flex;
    flex-flow: row wrap;
    align-content:space-around;
}
div
{
display: flex;

align-content:space-around;

}
img {
    display: block;
    position: relative;
    margin: 50px auto 30px;
    max-width: 200px;
    outline: true;
   border-color:#ff0000 #0000ff;
}
img:active {
    max-width: 80%;
}
a:focus {
    outline: none;
}
</style>
</head>
<body>
 
<?php
	require 'dbconnect.php';
	$myfname=" ";
	$U_id=getmyuid();
	$sel="select * from member where U_Id='$U_id'";
	$rslt=mysql_query($sel);
	$num_rows = mysql_num_rows($rslt);
	if($num_rows==1)
	{
		$foldername=$row['U_Id'].$row['firstname'];	
	}
$folder = '../User_Area/$foldername/';
$filetype = '*.*';
$files = glob($folder.$filetype);
$count = count($files);
for ($i = 0; $i < $count; $i++) {
    echo '<div>';
    echo '<a name="'.$i.'" href="#'.$i.'"><img src="'.$files[$i].'" /></a>';
    //echo substr($files[$i],strlen($folder),strpos($files[$i], '.')-strlen($folder));
    echo '</div>';
}
?>
