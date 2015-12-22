<?php
session_name("YOUTER-1234");
session_start();

include('../ws.php');

if ($_POST['usuario'] != '' && $_POST['password'] != '' ) {
  
  $user=$_POST['usuario'];
  $password=$_POST['password'];

  $res = autenticacion( $user, $password );
  echo json_encode($res);
  
  
} else {
  
  echo json_encode(array('error' => 'servicio no definido.' ) );
  
}
 

/*
echo "<pre>";
print_r($res);
echo "</pre>";
*/
 



?>