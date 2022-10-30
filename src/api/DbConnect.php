<?php
    class DbConnect {

        public function connect() {
            $server = 'localhost';
            $dbname = 'star-wars-search';
            $user = 'root';
            $pass = '';
            $conn = new mysqli($server, $user, $pass, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            return $conn;
        }
    }
?>