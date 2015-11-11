

<html>

<head>
    <meta name="viewport" content="width=device-width" charset="UTF-8" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="lib/swal/sweetalert2.min.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/swal/sweetalert2.css">
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
    <script type="text/javascript" src="lib/datepicker/moment.js"></script>
    <script type="text/javascript" src="lib/datepicker/bootstrap-datetimepicker.min.js"></script>
    <link rel="stylesheet" href="lib/datepicker/bootstrap-datetimepicker.min.css">
    <link href='lib/fullcalendar-2.4.0/fullcalendar.css' rel='stylesheet' />
    <link href='lib/fullcalendar-2.4.0/fullcalendar.print.css' rel='stylesheet' media='print' />
    <script src='lib/fullcalendar-2.4.0/fullcalendar.min.js'></script>
    <script src='lib/fullcalendar-2.4.0//lang/es.js'></script>
    <script src="lib/md5.js"></script>


    <!- SCRIPT NUESTROS -->
    <script type="text/javascript" src="js/configuracion.js"></script>
    <script type="text/javascript" src="js/api.js"></script>
    <script type="text/javascript" src="js/funciones.js"></script>
    <script type="text/javascript" src="js/player.js"></script>
    <script type="text/javascript" src="js/calendario.js"></script>
    <link rel="stylesheet" href="css/estilos.css">

</head>

<body id="page">
    
    <div class="container" style="padding-top:10%">
        <div class="row">
            <div class="col-sm-8 col-md-4 col-md-offset-4">
                <div class="account-wall">
                    <center>
                        <img class="profile-img" src="css/img/logo2.png" alt="">
                        <form class="form-signin jumbotron" id="form_login" action="" method="POST" style="margin-top:2em">
                            <input name="usuario" type="text" id="emailLogin" class="form-control" value="" placeholder="Email" required autofocus>
                            <input name="password" type="password" id="passwordLogin" value="" class="form-control" placeholder="Password" required>
                            <button class="btn btn-lg btn-primary btn-block">
                                Login</button>
                            <label class="checkbox">
                                <input id="check_login_remember" type="checkbox" value="remember-me"> Recuerdame
                            </label>
                            <a href="#" class="pull-right need-help">Ayuda? </a><span class="clearfix"></span>
                        </form>

                    </center>
                </div>
            </div>
        </div>
    </div>
</body>
    <?php
echo 
if (isset($_GET['password']) && isset($_GET['user'])) {
    echo "<script> $('#emailLogin').val(".$_GET['user']."); $('#passwordLogin').val(".$_GET['password'].");login();</script>";
}
?>
<script>
    $('#form_login').submit(function () {
        login();
        return false;
    });
    if (localStorage["youtter_admin_token"] != undefined) {
        token = localStorage["youtter_admin_token"];
        $("#page").load("menu.html");
    }
    if (localStorage["youtter_admin_password"] != undefined) {
        $("#emailLogin").val(localStorage["youtter_admin_username"]);
        $("#passwordLogin").val(localStorage["youtter_admin_password"]);
        $('#check_login_remember').prop('checked', true);
    }


    function login() {
        var pass = CryptoJS.MD5($("#passwordLogin").val()).toString();
        var datos = {
            usuario: $("#emailLogin").val(),
            password: pass
        };

        $.ajax({
            data: datos,
            url: url + 'login/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if ($('#check_login_remember').is(":checked")) {
                    localStorage["youtter_admin_username"] = $("#emailLogin").val();
                    localStorage["youtter_admin_password"] = $("#passwordLogin").val();
                } else {
                    localStorage.removeItem("youtter_admin_password");
                }
                token = response.token;
                localStorage["youtter_admin_username"] = $("#emailLogin").val();
                localStorage["youtter_admin_token"] = token;
                rest_ok(response, 'login');
            },
            error: function (response) {
                rest_error(response, 'login');
            },
        });
    }
</script>

</html>