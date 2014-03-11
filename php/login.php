<?php

require 'dbconnect.php';
// username and password sent from form 
$myusername=$_POST['emailid']; 
$mypassword=$_POST['password']; 


$sql="SELECT * FROM $tbl_name WHERE EmailID='$myusername' and password='$mypassword'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){

// Register $myusername, $mypassword and redirect to file "login_success.php"
session_register("myusername");
session_register("mypassword"); 
$folderselect="select * from member where EmailID='$myusername'";		
$folderresult=mysql_query($folderselect);
$row = mysql_fetch_array($folderresult, MYSQL_ASSOC);
$foldername=$row['U_Id'].$row['firstname'];
header('location:../User_Area/'."$foldername"."/startPage.html");
}
else {
echo "Wrong Username or Password";
}
?>
