<?php
session_name("YOUTER-1234");
session_start();

include('../ws.php');


$token = $_POST['token'];

switch($_SERVER['REQUEST_METHOD']) {
  
  case 'GET':

      $res = get_pantallas( $_GET['token'] );
      echo json_encode($res);
  
      break;
      
  
 
  default:
      header('HTTP/1.1 405 Method Not Allowed');
      header('Allow: GET');
      
      break;
      
      
}    
    
?>