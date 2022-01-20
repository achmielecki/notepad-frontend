<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Origin: https://localhost:8080/api/v1/");
header('Access-Control-Max-Age: 1');
?>
<!doctype html>
<html>

<head>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" crossorigin="anonymous"></script>
    <script src="js/configuration.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
    <title>Notepad</title>
    <meta name="description" content="Notepad">
    <meta name="keywords" content="notepad note pad adam chmielecki">
</head>

<body>
<header>Notepad</header>
<div id="tutorial">Shared Note. Your note code: <input id="noteCode" type="text"></div>

<div id="noteAreaDiv">
    <textarea></textarea>
</div>
</body>

</html>