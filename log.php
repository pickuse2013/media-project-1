<?php
$file = 'input.txt';
$g = file_get_contents("php://input");
file_put_contents($file, json_encode($g) . '\n', FILE_APPEND);
?>