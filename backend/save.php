<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "db";
$username = "root";
$password = "DBPassword";
$dbname = "crud";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn -> connect_error) {
    die("Connection failed: " . $conn -> connect_error);
}

$name = $_POST['name'];
$age = $_POST['age'];
$studentId = $_POST['studentId'];
$email = $_POST['email'];

$sql = "INSERT INTO students (name, age, studentId, email) VALUES ('$name', '$age', '$studentId', '$email')";

if ($conn -> query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "New record created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $sql . "<br>" . $conn -> error]);
}

$conn -> close();
?>