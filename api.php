<?php
$DogPic = "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";
header("Content-Type: application/json");
header("Cache-Control: no-cache");
header("x-api-key: 525261bd-c098-4d434-ac0d-41e3f97adae0");
readfile($DogPic);
 ?>
