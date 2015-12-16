<?php
session_name("YOUTER-1234");
session_start();

include('bd.php');
include('class_galeria_elemento.php');



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GALERIA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Devuelve los datos referentes a las fotos y videos
 *  
 * foto = 0, excluye las fotos
 * video = 0 , excluye los videos    
 * propia = 1 , muestra unicamente los elementos subidos por el propio usuario.
 *  
 */
function get_galeria($token , $foto=1, $video=1 , $propias = 0) {

  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return ($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  $extra='';
  
  if ( $foto == 1 && $video == 0 ) $extra = " AND tipo = 0 ";
  else if ( $foto == 0 && $video == 1 ) $extra = " AND tipo = 1 ";
  
  if ( $propias == 1 ) $extra .= " AND id_usuario_creador = ".$id_usuario;
  
  $q="SELECT * FROM app_galeria WHERE id_cliente = '".$id_cliente."' $extra ORDER BY fecha_modificacion DESC, fecha_creacion DESC ";
  
  $r=$bd->consultar($q);
  
  $resultado=null;
  
  $aux=null;
  
  for ($i = 0; $i < COUNT($r); $i++ ) {
  
      $act=$r[$i];
      
      $aux[] = new galeria_elemento($act['id'], $act['tipo'], $act['archivo'],  $act['descripcion'], $act['duracion']);
      
  }
  
  return array('respuesta' => 'ok' , 'total' => COUNT($r) , 'galeria' => $aux );
  
} 


function put_galeria($token , $data ) {
      
      
      $path_guardar="/youtter/galeria";
      
      $bd=new BD();
      
      $res = verificar_token($bd, $token);
      
      
      
      if ($res['error'] != '' ) {
      
         return ($res);
      
      } 
      
      $id_usuario = $res['id_usuario'];
      $id_cliente = $res['id_cliente'];
      
      $imagen = $_POST['media'];
      //Para cada una de las fotos
      
      $n=0;
      foreach ($imagen as $img ) {
      
          $descripcion = "";
          $duracion="";
          $archivo="";

          $data= $img;
          //$data = 'data:image/jpeg;base64,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';
          
          list($type, $data) = explode(';', $data);
          list(, $data)      = explode(',', $data);
          $data = base64_decode($data);
          $ext = substr($type,strpos($type,'/') + 1 );

          //GUARDAMOS EN BD
          $ins= " INSERT INTO app_galeria ( `tipo`,  `descripcion`, `id_usuario_creador`, 
          `id_cliente`, `id_usuario_modificador`, `fecha_creacion`, `fecha_modificacion`) 
          VALUES ( '$tipo',  '".mysql_real_escape_string($descripcion)."',  '$id_usuario', 
          '$id_cliente', '$id_usuario', NOW(), NOW() )" ;
          $bd->modificar($ins);
          

          //RECUPERAMOS EL ID DE GALERIA
          $q ="SELECT * FROM app_galeria WHERe id_usuario_creador = $id_usuario ORDER BY fecha_creacion DESC LIMIT 0 , 1";
          $aux=$bd->consultar($q);
          $id_galeria = $aux[0]['id'];
          
          $archivo = $path_guardar.'/image_'.$id_galeria.'.'.$ext;
          
          $u="UPDATE app_galeria SET archivo = '$archivo' WHERE id = $id_galeria ";
          $bd->modificar($u);
                    
          //$allowedExtsImg = array("jpg", "jpeg", "gif", "png", "bmp", "JPG", "JPEG", "GIF", "PNG", "BMP");
          //$allowedExtsVid = array("mp4", "wma", "mpg", "mpeg", "avi", "mov","MP4", "WMA", "MPG", "MPEG", "AVI", "MOV");

          $n++;

          $res =file_put_contents($archivo, $data);
      }
      
      return array('respuesta' => 'ok' , 'registros' => $n );
} 


function delete_galeria($token , $id_externo , $verificado = 0 ) {

  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return ($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  
  $q="SELECT * FROM app_plantilla as p, app_plantilla_detalle as d WHERE p.id=d.id_plantilla AND d.id_galeria = $id_externo AND p.id_cliente = $id_cliente ";
 
  $r=$bd->consultar($q);
  //ECHO $q." -----> " .COUNT($r) . "||";
  if ( COUNT($r) == 0 ) { 
  
      $q="SELECT * FROM app_galeria WHERE id = $id_externo AND id_cliente = $id_cliente ";
      $r1=$bd->modificar($q);
      
      $aux = unlink($path_guardar.'/'.$r[0]['archivo']);
      
      $q="DELETE FROM app_galeria WHERE id = $id_externo AND id_cliente = $id_cliente ";
      $r2=$bd->modificar($q);
      
      
      if ($r2 >= 1) return array('respuesta' => 'ok'  );
      if ($r2 == 0) return array('error' => 'Elemento no existente.'  );
  
  } 
  else if ( COUNT($r) > 0  && $verificado == 0 ) {
      
      $mes = "El elemento existe en la plantilla:";
      
      foreach ($r as $plan ) {
      
          $mes .= "
          ".$plan['nombre']." , ";
      }
  
      $mes= substr($mes, 0 , -2 );
  
      return array('warning' => $mes );
  } else if (COUNT($r) > 0  && $verificado == 1 ) {
      
      
      $q="SELECT * FROM app_galeria WHERE id = $id_externo AND id_cliente = $id_cliente ";
      $r1=$bd->modificar($q);
      
      $aux = unlink($path_guardar.'/'.$r[0]['archivo']);
      
      $q="DELETE FROM app_galeria WHERE id = $id_externo AND id_cliente = $id_cliente ";
      $r2=$bd->modificar($q);
      
      $q="DELETE FROM app_plantilla_detalle WHERE id_galeria = $id_externo  ";
      $r2=$bd->modificar($q);
      
      
      if ($r2 >= 1) return array('respuesta' => 'ok'  );
      if ($r2 == 0) return array('error' => 'Elemento no existente.'  );
  }
        
} 

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLANTILLAS 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_plantilla($token , $id=0, $propias = 0) {
  
  
  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return ($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  $extra='';
  if ( $id > ''  ) $extra .= " AND p.id = ".$id;
  if ( $propias == 1 ) $extra .= " AND p.id_usuario_creador = ".$id_usuario;
  
  $q="SELECT p.id as id_plantilla, p.nombre as plantilla_nombre, p.descripcion as plantilla_descripcion, p.duracion as plantilla_duracion,  g.id as id_galeria, d.orden, d.duracion, g.tipo, g.archivo, g.descripcion as galeria_descripcion
      FROM app_galeria as g, app_plantilla as p , app_plantilla_detalle as d 
      WHERE p.id=d.id_plantilla AND d.id_galeria=g.id AND p.id_cliente = '".$id_cliente."' $extra 
      ORDER BY p.fecha_modificacion DESC, p.fecha_creacion DESC ";
  //echo $q."<br>";
  $r=$bd->consultar($q);
  
  $resultado=null;
  
  $aux=null;
  $id_plantilla = -1;
  
  $res = null;
  
  for ($i = 0; $i < COUNT($r); $i++ ) {
      //echo " $i = ".$r[$i]['id_plantilla'];
      if ( $id_plantilla != $r[$i]['id_plantilla'] ) {
          
          $plantilla = new plantilla($r[$i]['id_plantilla'],  $r[$i]['plantilla_nombre'],  $r[$i]['plantilla_descripcion'], $r[$i]['plantilla_duracion']  ) ;
          $res[] = $plantilla; 
          $id_plantilla = $r[$i]['id_plantilla'];
          //echo "NUEVA PLANTILLA ==> $id_plantilla<br>";
      }
            
      $plantilla->add_elemento( $r[$i]['id_galeria'], $r[$i]['tipo'], $r[$i]['archivo'],  $r[$i]['descripcion'], $r[$i]['duracion'] , $r[$i]['orden']);
      
  }
  
  

  
  return array('respuesta' => 'ok' ,  'resultado' => $res );
}



function nueva_plantilla( $token , $plantilla) {
  
  $bd=new BD();

  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return ($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  $id_plantilla='';

  
  $q="INSERT INTO app_plantilla (id_cliente, nombre, descripcion, duracion, fecha_creacion, fecha_modificacion , id_usuario_creador , id_usuario_modificador )
      VALUES ($id_cliente , '".mysql_real_escape_string($plantilla['nombre']). "' , '".mysql_real_escape_string($plantilla['descripcion']). "' , 0, now(), NOW(), $id_usuario, $id_usuario )";
  //echo $q."<br>";
  $bd->modificar($q);
  
  
  $q="SELECT id FROM  app_plantilla 
  WHERE id_usuario_creador = $id_usuario 
  ORDER BY fecha_creacion DESC 
  LIMIT 0, 1; ";
  //echo $q."<br>";
  $aux=$bd->consultar($q);
  
  $id_plantilla= $aux[0]['id'];

  $t = 0;    

  
  $n=0;
  
  foreach ( $plantilla['media'] as $d ) {
   
 
       $id_galeria=$d['id_externo'];
       $orden=$d['orden'];
       $duracion=$d['duracion'];
       $t+= $duracion;
       
       $ins="INSERT INTO app_plantilla_detalle (id_plantilla, id_galeria, orden, duracion ) VALUES ( ".$id_plantilla." , ".$id_galeria." , ".$orden." , ".$duracion." ) ";
       //echo $ins."<br>";
       $bd->modificar($ins);
       
       $n++;
  
  } 
  
  $q="UPDATE app_plantilla 
      SET duracion = $t 
      WHERE id= $id_plantilla ";
  //echo $q."<br>";
  $r=$bd->modificar($q);
  
  
  return array('respuesta' => 'ok' , 'registros' => $n );
  
}



function modificar_plantilla( $token , $plantilla,  $id_plantilla ) {
  
  
  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  
  //BORRAMOS EL DETALLE ACTUAL
  $q="DELETE FROM  app_plantilla_detalle 
       WHERE id_plantilla= $id_plantilla ";
  //echo $q."<br>";
  $r=$bd->modificar($q);

  $t = 0;     
  $n=0;
  
  foreach ($plantilla['media'] as $d ) {
   
 
       $id_galeria=$d['id_externo'];
       $orden=$d['orden'];
       $duracion=$d['duracion'];
       $t+= $duracion;
       
       $ins="INSERT INTO app_plantilla_detalle (id_plantilla, id_galeria, orden, duracion ) VALUES ( ".$id_plantilla." , ".$id_galeria." , ".$orden." , ".$duracion." ) ";
       //echo $ins."<br>";
       $bd->modificar($ins);
       
       $n++;
  
  } 
  
  $q="UPDATE app_plantilla 
      SET duracion = $t , nombre = '".mysql_real_escape_string( $plantilla['nombre']). "' ,  descripcion = '".mysql_real_escape_string( $plantilla['descripcion']). "'
      WHERE id= $id_plantilla ";
  //echo $q."<br>";
  $r=$bd->modificar($q);
  
  
  return array('respuesta' => 'ok' , 'registros' => $n, 'tipo' => 'update');
  
}


function delete_plantilla($token , $id_externo ) {

  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  
  $id_cliente=1;
  
  $q="DELETE d.*, p.*  FROM app_plantilla as p, app_plantilla_detalle as d WHERE p.id = $id_externo AND p.id_cliente = $id_cliente AND d.id_plantilla=p.id ";
  $r=$bd->modificar($q);
  
  if ($r >= 1) {
  
    return array('respuesta' => 'ok'  );
    
  }
  if ($r == 0) return array('error' => 'Elemento no existente.'  );
  
}                                





/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PANTALLAS 
function get_pantallas( $token ) { 

  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];

  
  $q="SELECT p.*, u.*, c.Nombre as pais , p.id as id_pantalla
      FROM Pantallas as p, Ubicaciones as u, Paises as c
      WHERE p.idClient = '".$id_cliente."' AND activa = 1  AND u.id=p.idUbicacion AND u.idPais=c.id
      ORDER BY c.Nombre, CodigoPostal, Direccion ";
  //echo $q."<br>";
  $r=$bd->consultar($q);
    
  $res = null;
  
  for ($i = 0; $i < COUNT($r); $i++ ) {
  
      $p= $r[$i];
  
      $pantalla = new pantalla($p['id_pantalla'], $p['descripPantalla'], $p['MAC'], $p['tipo_pantalla'] , $p['numero_pantalla']);
      $pantalla->put_ubicacion($p['pais'], $p['Poblacion'], $p['CodigoPostal'], $p['Direccion'],  $p['latitudGPS'], $p['longitudGPS'] );
      $pantalla->put_activa($p['HorarioDesde'], $p['HorarioHasta'], $p['Lunes'], $p['Martes'], $p['Miercoles'], $p['Jueves'],  $p['Viernes'], $p['Sabado'], $p['Domingo'], $p['Festivo'] ) ;

      $res[]=$pantalla;
      
  }
  
  return array('respuesta' => 'ok' ,  'resultado' => $res );

} 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROGRAMACION

function get_programacion($token, $id = '' , $pantallas = 0 ) {
  
  
  
  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  $extra='';
  if ($id != '') { $extra = " AND id = $id "; }
  
  $q="SELECT * FROM app_programacion WHERE 1 $extra";
  $aux = $bd->consultar($q);
  
  if ( COUNT($aux) == 0 ) {
      
      return array('error' => 'Programacion inexistente. '  ); 
      
  } else {
      
       
      $res = null;
      $n = 0;
      
      foreach ($aux as $pro)  {
      
      
          $res[$n]['id_externo']=$pro['id'];
          $res[$n]['id_plantilla']=$pro['id_plantilla'];
          $res[$n]['title']=$pro['nombre'];
          $res[$n]['descripcion']=$pro['descripcion'];
          $res[$n]['propia']= ($pro['id_usuario_creador'] == $id_usuario);
          $res[$n]['lunes']=$pro['lunes'];
          $res[$n]['martes']=$pro['martes'];
          $res[$n]['miercoles']=$pro['miercoles'];
          $res[$n]['jueves']=$pro['jueves'];
          $res[$n]['viernes']=$pro['viernes'];
          $res[$n]['sabado']=$pro['sabado'];
          $res[$n]['domingo']=$pro['domingo'];
          $res[$n]['start']=$pro['fecha_inicio'];
          $res[$n]['end']=$pro['fecha_final'];
          $res[$n]['hora_inicio']=$pro['hora_inicio'];
          $res[$n]['hora_final']=$pro['hora_final'];
          $res[$n]['creada']=$pro['fecha_creacion'];
          
          $res[$n]['allDay'] = true;
          
          $res[$n]['pantallas'] = null ;
          
          
          $q="SELECT p.*, u.*, c.Nombre as pais , p.id as id_pantalla
              FROM Pantallas as p, Ubicaciones as u, Paises as c , app_programacion_detalle as d 
              WHERE activa = 1  AND u.id=p.idUbicacion AND u.idPais=c.id AND d.id_pantalla=p.id  
                AND d.id_programacion = ".$pro['id']."
              ORDER BY c.Nombre, CodigoPostal, Direccion ";
          //echo $q."<br>";
          $r=$bd->consultar($q);
            
          
          
          for ($i = 0; $i < COUNT($r); $i++ ) {
          
              $p= $r[$i];
          
              $pantalla = new pantalla($p['id_pantalla'], $p['descripPantalla'], $p['MAC'], $p['tipo_pantalla'] , $p['numero_pantalla']);
              $pantalla->put_ubicacion($p['pais'], $p['Poblacion'], $p['CodigoPostal'], $p['Direccion'],  $p['latitudGPS'], $p['longitudGPS'] );
              $pantalla->put_activa($p['HorarioDesde'], $p['HorarioHasta'], $p['Lunes'], $p['Martes'], $p['Miercoles'], $p['Jueves'],  $p['Viernes'], $p['Sabado'], $p['Domingo'], $p['Festivo'] ) ;
        
              $res[$n]['pantallas'][]=$pantalla;
              
          }
          $n++;
          
          
    }   
    
    return $res;       
      
  } 
  


}  





function modificar_programacion($token, $id_externo, $pro ) {
  
  
  
  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  //BORRAMOS TODO => 
  $del = "DELETE FROM app_programacion WHERe id = $id_externo AND id_cliente= $id_cliente ";
  $r = $bd->modificar($del);
  
  if  ( $r == 0 )  return array('error' => 'No existe la programación.'  ); 
  
  $del = "DELETE FROM app_programacion_detalle WHERe id_programacion = $id_externo";
  $bd->modificar($del);
  
      
       
  $res = null;
  $r = 0;
  $insert = "INSERT INTO `app_programacion` (id, `id_cliente`, `id_plantilla`, `nombre`, `descripcion`, `id_username_creador`, `id_username_modificador`, `fecha_creacion`,
  `fecha_modificacion`, `fecha_inicio`, `fecha_final`, `hora_inicio`, `hora_final`, `lunes`, `martes`, `miercoles`, `jueves`, `viernes`, 
  `sabado`, `domingo`, `activo`) 
  VALUES ($id_externo, '$id_cliente', '".$pro['id_plantilla']."', '".$pro['title']."', '".$pro['descripcion']."', '$id_usuario', '$id_usuario', NOW() , 
  NOW() , '".$pro['start']."', '".$pro['end']."', '".$pro['hora_inicio']."', '".$pro['hora_final']."', '".$pro['lunes']."', '".$pro['martes']."', '".$pro['miercoles']."', '".$pro['jueves']."', '".$pro['viernes']."', 
  '".$pro['sabado']."', '".$pro['domingo']."', '1');";
  
  $n = $bd->modificar($insert);
  
  
  
  
  foreach ( $pro['id_pantallas'] as $pan )  {
  
  
      $q="INSERT INTO app_programacion_detalle (id_programacion, id_pantalla) VALUES ($id_externo , ".$pan." )  ";
      //echo $q."<br>";
      $r+=$bd->modificar($q);
  
  }   
  
  return array('respuesta' => 'ok' ,  'resultado' => $r );
  

}      
   




function nueva_programacion($token, $pro ) {
  
  
  
  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
      
       
  $res = null;
  $r = 0;
  $insert = "INSERT INTO `app_programacion` (`id_cliente`, `id_plantilla`, `nombre`, `descripcion`, `id_username_creador`, `id_username_modificador`, `fecha_creacion`,
  `fecha_modificacion`, `fecha_inicio`, `fecha_final`, `hora_inicio`, `hora_final`, `lunes`, `martes`, `miercoles`, `jueves`, `viernes`, 
  `sabado`, `domingo`, `activo`) 
  VALUES ('$id_cliente', '".$pro['id_plantilla']."', '".$pro['title']."', '".$pro['descripcion']."', '$id_usuario', '$id_usuario', NOW() , 
  NOW() , '".$pro['start']."', '".$pro['end']."', '".$pro['hora_inicio']."', '".$pro['hora_final']."', '".$pro['lunes']."', '".$pro['martes']."', '".$pro['miercoles']."', '".$pro['jueves']."', '".$pro['viernes']."', 
  '".$pro['sabado']."', '".$pro['domingo']."', '1');";
  
  $n = $bd->modificar($insert);
  
  $q="SELECT * FROM app_programacion WHERE id_username_creador = $id_usuario ORDER BY fecha_creacion DESC LIMIT 0,1 ";
  $aux = $bd->consultar($q);
  
  $id_programacion = $aux[0]['id'];
  
  
  foreach ( $pro['id_pantallas'] as $pan )  {
  
  
      $q="INSERT INTO app_programacion_detalle (id_programacion, id_pantalla) VALUES ($id_programacion , ".$pan." )  ";
      //echo $q."<br>";
      $r+=$bd->modificar($q);
  
  }   
  
  return array('respuesta' => 'ok' ,  'resultado' => $r );
  

}      


function delete_programacion($token , $id_externo ) {
       $bd=new BD();
     
     $q="DELETE p.*, d.* FROM app_programacion as p LEFT JOIN  app_programacion_detalle as d ON d.id_programacion=p.id WHERE  p.id=$id_externo ";
     //echo $q."<br>";
      $r=$bd->modificar($q);
     if ($r > 0 ) {
      return array('respuesta' => 'ok' ,  'resultado' => $r );
      }
     else { 
       return array('error' => 'PROGRAMACION NO DEFINIDA '  );
       }
       
      
}


                                    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAISES
function get_paises( $token ) {

  $bd=new BD();
  
  $res = verificar_token($bd, $token);
  
  if ($res['error'] != '' ) {
  
     return json_encode($res);
  
  } 
  $id_usuario = $res['id_usuario'];
  $id_cliente = $res['id_cliente'];
  
  $extra='';
  if ($id=='') { $extra = " AND id = $id "; }
  
  $q="SELECT c.Nombre, p.id
      FROM  `Paises` AS c, Ubicaciones AS u, Pantallas AS p
      WHERE c.id = u.idPais
      AND p.idUbicacion = u.id
      AND p.idClient = $id_cliente ";
   
  $aux = $bd->consultar($q);
  
  if ( COUNT($aux) == 0 ) {
      
        return array('error' => 'Programacion inexistente. '  ); 
  } else {
  
      $res = null;
      
      $n=0;
      foreach ($aux as $p ) { 
        
            
        $res[$n]['id_externo']=$p['id'];
        $res[$n]['nombre']=$p['Nombre'];
        
      
      }
      
      return $res;
      
      
  } 

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOGIN 
function verificar_token($bd, $token) {

    //verificamos que le token sea correcto y valido
    $q="SELECT * FROM tokens WHERE token = '".$token."' ;";
    //echo $q."<bR>";
    $res = $bd->consultar($q);

    if ( COUNT($res) >= 1 ) {
   
        $ahora = 999999999999;
        
        if ($res['expira'] > $ahora) {

            return array('error' => 'token expired' );
        }
        
        $r=null;
        
        $r['id_usuario']= $res[0]['id_usuario'];
        $r['id_cliente']= $res[0]['id_cliente'];
        $r['id_cliente'] = 1 ; //TEMPORAL PARA PRUEBAS
        $_SESSION['username']=$r['id_usuario'];
        $_SESSION['id_cliente']=$r['id_cliente'];
        
        $r['ok']=1;
  
        return $r; 
    
    } else {
        
        return array('error' => 'invalid token' );
        
    }

}


function autenticacion( $user, $password ) {
    
    $bd=new BD();
    
    $q="SELECT * FROM Usuarios WHERE email='".$user."' AND Password='$password'";
    $res=$bd->consultar($q);
    
    if ( COUNT($res) == 1 ) {
        
        $_SESSION['username']=$user;
        $_SESSION['id_cliente']=$res[0]['id'];

        $_SESSION['token']= letras_aleatorias(32);
        $_SESSION['caduca']= 99999999; 
        
        $ins="INSERT INTO tokens (id_usuario, token, expira ) VALUES  (".$res[0]['id'].", '".$_SESSION['token']."' , ".$_SESSION['caduca']." );";
        $bd->modificar($ins);
        //echo $ins."<br>"; 
        $j = array("token" => $_SESSION['token'] , "expira" => $_SESSION['caduca'] );
        return  $j;
        
    } else {
   
        $j = array('error' => 'invalid user or password' );
        return  $j;
    
    }
    
    
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PRIVADAS
function letras_aleatorias ($n) {

    $r="";

    for ($i=0; $i < $n ; $i++ ) {
          $r.=dechex( rand(0,15) );
    
    }
    return $r;




} 


?>