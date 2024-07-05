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
	$prenom = mysqli_real_escape_string($con, $_POST["prenom"]);
	$email = mysqli_real_escape_string($con, $_POST["email"]);
	$phone = mysqli_real_escape_string($con, $_POST["phone"]);
	$message = mysqli_real_escape_string($con, $_POST["message"]);
	$nom = mysqli_real_escape_string($con, $_POST["nom"]);

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