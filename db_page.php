<?php
session_start();

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "web-site";

$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if (!$con) {
	die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$prenom =  $_POST["prenom"];
	$email =  $_POST["email"];
	$phone =  $_POST["phone"];
	$message =  $_POST["message"];
	$nom =  $_POST["nom"];

	$stmt = $con->prepare("INSERT INTO formulaire (nom, prenom, email, telephone, message) VALUES (?, ?, ?, ?, ?)");
	$stmt->bind_param("sssss", $nom, $prenom, $email, $phone, $message);

	if ($stmt->execute()) {
		echo "Formulaire envoyé avec succès";
		header("Location: Contact.html");
         exit();

	} else {
		echo "Formulaire non envoyé: " . $stmt->error;
	}

	$stmt->close();
}

mysqli_close($con);
?>