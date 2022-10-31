<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    $method = $_SERVER['REQUEST_METHOD'];

    $api_url="https://swapi.dev/api/people/";

    if(isset($_GET['page'])) {
        $page = $_GET['page'];
        $json_data = file_get_contents($api_url."?page=".$page);
        $json_data = file_get_contents($api_url.$page);
        echo($json_data);
    }
    else if(isset($GET['person'])) {
        $person = $_GET['person'];
        $json_data = file_get_contents($api_url.$person);
        echo($json_data);
    }
    else{
        die("Unrecognized api query");
    }
?>