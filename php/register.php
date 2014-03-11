<?php

//making connection with database

	require 'dbconnect.php';
	$myfname=" ";
	$mylname=" ";
	$mypassword=" ";
	$myemailid=" ";
	$rslt=0;



//reading form elements

	$myfname=$_POST['firstname'];
	$mylname=$_POST['lastname'];
	$mypassword=$_POST['password'];
	$myemailid=$_POST['emailid'];

	$sel="select * from member where EmailID='$myemailid'";
	$rslt=mysql_query($sel);
	$num_rows = mysql_num_rows($rslt);

	if($num_rows==0)
	{
		$sql="insert into member (firstname,lastname,Password,EmailID) values ('$myfname','$mylname','$mypassword','$myemailid')";
		$result=mysql_query($sql);
		if($result!=0)
		{

			echo "<html><h1>Thank you for registering</h1></html>";
		}
		$folderselect="select U_Id from member where EmailID='$myemailid'";
		$folderresult=mysql_query($folderselect);
		$row = mysql_fetch_array($folderresult, MYSQL_ASSOC);
		$foldername=$row['U_Id'].$myfname;
		mkdir("../User_Area/$foldername", 0777, true);
		if (!copy("../startPage.html", "../User_Area/$foldername/startPage.html")) 
			echo "failed to copy file...";
	}
	else
	{
		echo "You have already registered with this Email ID";
		echo $rslt;
	}	
?>
