<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "adityapratap2301@gmail.com";
    $subject = "New message from $name";
    $body = "Name: $name\nEmail: $email\n\n$message";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Failed to send message. Error: " . error_get_last()['message'];
    }
}
?>
