<?php
$servername = "your_servername";
$username = "LoganKeener";
$password = "Lambo2023@";
$dbname = "DodoGames";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute an SQL statement
$sql = "SELECT * FROM your_table";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>
