<?php

//making connection with database

$host="localhost"; // Host name 
$username=""; // Mysql username 
$password=""; // Mysql password 
$db_name="test"; // Database name 
$tbl_name="member"; // Table name 

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

//reading form elements

$myfname=$_POST['firstname'];
$mylname=$_POST['lastname'];
$myusername=$_POST['username'];
$mypassword=$_POST['password'];
$myemailid=$_POST['emailid'];

$sql="insert into member (firstname,lastname,Username,Password,EmailID) values ('$myfname','$mylname','$myusername','$mypassword','$myemailid')";
$result=mysql_query($sql);
?>
