<?php
session_name("YOUTER-1234");
session_start();

include('../ws.php');




switch($_SERVER['REQUEST_METHOD']) {
  
  case 'GET':
       
      $res = get_plantilla( $_GET['token'] , $_GET['id_externo'], $_GET['propias'] );
      echo json_encode($res);
  
      break;
      
  case 'POST': 
      if ($_POST['datos']['id_externo'] == '' ) { 
     
          $res = nueva_plantilla($_POST['token'] , $_POST['datos']) ;
          echo json_encode($res);
      } else {    
           
          $res = modificar_plantilla($_POST['token'] , $_POST['datos'], $_POST['datos']['id_externo']) ;
          echo json_encode($res);
      }    
      break;      
 
  case 'DELETE':

      $res = delete_plantilla($_GET['token'] , $_GET['id_externo'] ) ;
      echo json_encode($res);
      
      break;
  
 
  default:
      header('HTTP/1.1 405 Method Not Allowed');
      header('Allow: GET, POST, DELETE');
      
      break;
      
      
}    
    
?>