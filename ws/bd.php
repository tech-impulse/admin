<?php
/*
fichero: BD.php

Tipo: class

Metodo de entrada: llamadas a funciones

Descripción: Esta clase se utiliza para conectar con la BD y realizar consultar, actualizaciones, e inserciones.
*/

class BD{
	
	/*
	Constructor de la clase.
	Realiza la conexion con la base de datos. Si no recibe parametros toma los valores por defecto
	*/
	public function __construct($usuario="ws_youtter", $password="Timpulse02", $bd="youtter", $host = "phpmyadmin.youtter.com")
	{
		$this->idConexion = 0;
		$bdTest = false;
		$this->idConexion = mysql_connect($host, $usuario, $password);
		$bdTest = mysql_select_db($bd);
		if (!$this->idConexion || !$bdTest)
		{
			//throw new OperacionesBDException(mysql_error());
      
      echo "<br>Error de conexion:<br>";
			
			echo (mysql_error());
			die(mysql_error());
		}
	}

	/*
	Función para simplificar las consultas.
	Devuelve un array con el resultado de la consulta.
	*/
	public function consultar($stringConsulta)
	{
		$idquery=mysql_query($stringConsulta, $this->idConexion);
		if (!$idquery)
		{
			//throw new OperacionesBDException(mysql_error());
			echo "<br>Error en la consulta: $stringConsulta<br>";
			echo (mysql_error());
			die(mysql_error());
		}
		$resultado=Array();
		while($fila= mysql_fetch_assoc($idquery))
		{
			$resultado[]=$fila;
		}
		return $resultado;
	}
	
	
	/*
	Función para simplificar las inserciones, modificaciones y borrado.
	Devuelve un entero con el numero de filas afectadas.
	*/
	public function modificar($stringModificacion)
	{
		$idquery=mysql_query($stringModificacion, $this->idConexion);
		if (!$idquery)
		{
			//throw new OperacionesBDException(mysql_error());
      echo "<br>Error en la modificacion: $stringConsulta<br>";
			
			echo (mysql_error());
			die(mysql_error());
		}
		return mysql_affected_rows();
	}

}
?>
