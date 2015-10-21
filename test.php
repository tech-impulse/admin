<?php
header('Access-Control-Allow-Origin: *; Content-Type: text/html; charset=iso-8859-1'); 

$allowedExtsImg = array("jpg", "jpeg", "gif", "png", "bmp", "JPG", "JPEG", "GIF", "PNG", "BMP");
$allowedExtsVid = array("mp4", "wma", "mpg", "mpeg", "avi", "mov","MP4", "WMA", "MPG", "MPEG", "AVI", "MOV");
$temp = $_POST["imagen"];

$res = json_encode($temp);
echo $res;


?>