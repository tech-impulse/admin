<?php
session_name("YOUTER-1234");
session_start();

include('./ws.php');


if ($_GET['thumb']=='YES') {

      $path='/var/www/admin/webservices/admin/youtterUploads/thumb/';
} else {
      $path='/var/www/admin/webservices/admin/youtterUploads/';

}

if ($_GET['id'] == '' ) {

  echo json_encode( array("error" => "No autorizado: 3") ) ;
} 

if ($_GET['token'] == '' ) {

  echo json_encode( array("error" => "No autorizado: 1") ) ;

} else {
  
  $bd = new bd();
  $res = verificar_token($bd, $_GET['token']);
  
  
  if ( $res['error'] == '' ) {
  
      header('Content-Type: image/jpeg');

      $imagen = $path.'image_'.$_GET['id'].'.jpeg' ;
    
      $img = @imagecreatefromjpeg($imagen);
      
      /* Ver si falló */
      if(!$img)
      {
          /* Crear una imagen en blanco */
          $img  = imagecreatetruecolor(250, 30);
          $fondo = imagecolorallocate($img, 255, 255, 255);
          $ct  = imagecolorallocate($img, 0, 0, 0);
      
          imagefilledrectangle($img, 0, 0, 150, 30, $fondo);
      
          /* Imprimir un mensaje de error */
          imagestring($img, 1, 5, 5, 'Error cargando ' . $imagen, $ct);
      }
      
      imagejpeg($img);
      imagedestroy($img);
           
  
  }  else {
  
       echo json_encode( array("error" => "No autorizado: 2") ) ;
  }

}




?>



