<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$server = "db";
$username = "root";
$password = "1krecik1";
$dbname = "crud";

$conn = new mysqli($server, $username, $password, $dbname);

if ($conn -> connect_error) {
    die("Connection failed: " . $conn -> connect_error);
}

$name = $_POST['name'];
$age = $_POST['age'];
$student_id = $_POST['student_id'];
$email = $_POST['email'];

$sql = "INSERT INTO students (name, age, student_id, email) VALUES ('$name', '$age', '$student_id', '$email')";

if ($conn -> query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "New record created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $sql . "<br>" . $conn -> error]);
}

$conn -> close();
?>