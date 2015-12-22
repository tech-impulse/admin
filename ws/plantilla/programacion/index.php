<?php
session_name("YOUTER-1234");
session_start();

include('../ws.php');


$token = $_POST['token'];

switch($_SERVER['REQUEST_METHOD']) {
  
  case 'GET':

      $res = get_programacion( $_GET['token'] );
      echo json_encode($res);
  
      break;
      
  case 'POST': 
      
      if ($_POST['id_externo'] > 0 )  {
      
          $res = modificar_programacion($_POST['token'] , $_POST['datos'] ) ;
          
      } else {
      
          $res = nueva_programacion($_POST['token'], $_POST['datos'] ) ;
          
      }
      echo json_encode($res);
      break;
 
  case 'DELETE':
  
      $res = delete_programacion($_GET['token'] , $_GET['id_externo'] ) ;
      echo json_encode($res);
      
      break;
  
 
  default:
      header('HTTP/1.1 405 Method Not Allowed');
      header('Allow: GET, POST, DELETE');
      
      break;
      
      
}    
    
?>