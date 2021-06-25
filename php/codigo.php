<?php

//Captura de variables
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$asunto = $_POST['asunto'];
$consulta = $_POST['consulta'];

//Cuerpo del email
$mensaje = "
<strong>Nombre: </strong> $nombre</br>
<strong>Email: </strong> $email</br>
<strong>Asunto: </strong> $asunto</br>
<strong>Consulta: </strong> $consulta</br>
";

//Envio del email

mail("miickig10@gmail.com", "Consulta Web", $mensaje, "De: " $nombre, "Email: " $email, "Asunto: " $asunto)

?>