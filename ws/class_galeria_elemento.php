<?php

class galeria_elemento {

  public $tipo = 0;
  public $url = '';
  public $descripcion = '';
  public $duracion = '';
  
  function __construct($id, $t, $u, $d  ) {
       $this->id_externo = $id;
       $this->tipo = $t;
       $this->url = $u;
       $this->descripcion = $d;
  }
  
}


class plantilla {

  public $id_externo = 0; 
  public $nombre = '';
  public $descripcion = '';
  public $duracion = '';
  public $elementos = null;
  
  function __construct($id, $nombre,  $d , $du ) {
       $this->id_externo = $id;
       $this->nombre = $nombre;
       $this->descripcion = $d;
       $this->duracion = $du;
       $this->elementos = array();
  }
  
  public function add_elemento($id, $t, $u, $d , $du , $orden ) {

      $this->elementos[] = new plantilla_elemento($id, $t, $u, $d , $du , $orden ) ;

  }
  
}


class plantilla_elemento {

  public $tipo = 0;
  public $url = '';
  public $descripcion = '';
  public $duracion = '';
  public $orden = '';
  
  function __construct($id, $t, $u, $d , $du , $orden ) {
  
       $this->id_externo = $id;
       $this->tipo = $t;
       $this->url = $u;
       $this->descripcion = $d;
       $this->duracion = $du;
       $this->orden = $orden; 
  }
  
}


class pantalla {



  public $id_externo = 0; 
  public $nombre = '';
  public $MAC='';
  public $tipo_pantalla='';
  public $numero_pantalla='';
  public $horario_desde='';
  public $horario_hasta='';
  public $lunes='';
  public $martes='';
  public $miercoles='';
  public $jueves='';
  public $viernes='';
  public $sabado='';
  public $domingo='';
  public $festivos='';

  //DATOS de ubicacion
  public $direccion = '';
  public $poblacion = '';
  public $codigo_postal = '';
  public $pais = '';
  public $latitudGPS='';
  public $longitudGPS='';
  
  
  function __construct($id, $nombre, $MAC, $tipo_pantalla , $numero_pantalla  ) {
       $this->id_externo = $id;
       $this->nombre = $nombre;
       $this->MAC = $MAC;
       $this->tipo_pantalla = $tipo_pantalla;
       $this->numero_pantalla = $numero_pantalla;

  }
  
  function put_ubicacion($pais, $poblacion, $codigo_postal, $direccion,  $latitudGPS='', $longitudGPS='' ) {
  
      $this->pais = $pais;
      $this->poblacion = $poblacion;
      $this->codigo_postal = $codigo_postal;
      $this->direccion = $direccion;
      $this->latitudGPS = $latitudGPS;
      $this->longitudGPS = $longitudGPS;
 
  
  }
  
  
  function put_activa($horario_desde, $horario_hasta, $lunes, $martes, $miercoles, $jueves,  $viernes, $sabado, $domingo , $festivos ) {
  
      $this->horario_desde = $horario_desde;
      $this->horario_hasta = $horario_hasta;
      $this->lunes = $lunes;
      $this->martes = $martes;
      $this->miercoles = $miercoles;
      $this->jueves = $jueves;
      $this->viernes = $viernes;
      $this->sabado = $sabado;
      $this->domingo = $domingo;
      $this->festivos = $festivos;
    
 
  
  }
  
}


?>