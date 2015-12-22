<?php
session_name("YOUTER-1234");
session_start();

include('../ws.php');


$token = $_POST['token'];

switch($_SERVER['REQUEST_METHOD']) {
  
  case 'GET':

      $res = get_galeria( $_GET['token'] , $_GET['fotos'] , $_GET['videos'] , $_GET['propios'] );
      echo json_encode($res);
  
      break;
      
  case 'POST': 
      
      $res = put_galeria($token , $_POST['media'] ) ;
      echo json_encode($res);
      
      break;
 
  case 'DELETE':
      $res = delete_galeria($_GET['token'] , $_GET['id_externo'] , $_GET['verificado']) ;
      echo json_encode($res);
      
      break;
  
 
  default:
      header('HTTP/1.1 405 Method Not Allowed');
      header('Allow: GET, POST, DELETE');
      
      break;
      
      
}    
    
?>