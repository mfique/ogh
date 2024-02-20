<?php
$server="localhost";
$username="root";
$password="";
$db="mydatabase";
$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
header('Content-Type:application/json');
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM user");
        $Form = array();
        while ($row = $result->fetch_assoc()) {
            $Form[] = $row;
        }
        echo json_encode($Form);
        break;
    case 'POST':
       parse_str(file_get_contents("php://input"), $_POST);
        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $password= $_POST['password'];
        $conn->query("INSERT INTO user( full_name, email, password) VALUES ('$fullname',' $email', '$password')");
        echo json_encode(array('status' => 'success'));
        break;
    case 'PUT':
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $fullname = $_PUT['fullname'];
        $email = $_PUT['email'];
        $password = $_PUT['password'];
        $res = $conn->query("UPDATE user SET full_name='$fullname', email='$email', password='$password' WHERE id=$id");

        if ($res == TRUE){
           echo json_encode(array('status' => 'OK'));
        } else {
            echo json_encode(array('status' => 'OK'));
        }
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM user WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
$conn->close();
?>