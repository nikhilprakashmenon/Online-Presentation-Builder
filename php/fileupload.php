<?php
if( $_FILES['file']['name'] != "" )
{
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
	
	
	copy( $_FILES['file']['name'], "../User_Area/$foldername/" ) or 
		die( "Could not copy file!");
	header("location:images.php");
}
else
{
    die("No file specified!");
}
?>
