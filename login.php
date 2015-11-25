<?php
    
$data = array('usuario' => $_GET["usuario"], 'password' => $_GET["password"]);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://testhtml5.esadecreapolis.com/ws/login/'); // TEMP Canviar !!
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false); // requerido a partir de PHP 5.6.0
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $server_output = curl_exec ($ch);
    $result = json_decode($server_output, true);
    if (!$server_output) {
                throw new Exception('WebService Connection Error');
    }else if($result['error']=='servicio no definido.'){
        echo 'Username or Password invalid!';
    }else {
    print_r($result);
    echo '<script>localStorage["youtter_admin_token"]="'.$result['token'].'";</script>';
    header("Location: http://testhtml5.esadecreapolis.com/youtterAdmin");
    die();
    }
?>