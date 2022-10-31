<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    $method = $_SERVER['REQUEST_METHOD'];

    $api_url="https://swapi.dev/api/films/";

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $json_data = file_get_contents($api_url.$id);
        echo($json_data);
    }
    else {
        die("Unrecognized api query");
    }
?>