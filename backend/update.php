<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "db";
$username = "root";
$password = "1krecik1";
$dbname = "crud";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from request
$id = $_POST['id'];
$name = $_POST['name'];
$age = $_POST['age'];
$student_id = $_POST['student_id'];
$email = $_POST['email'];

// SQL to update a record
$sql = "UPDATE students SET name='$name', age='$age', student_id='$student_id', email='$email' WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
