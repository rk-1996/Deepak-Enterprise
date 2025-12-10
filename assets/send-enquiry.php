<?php
// send-enquiry.php

header('Content-Type: application/json');

// All enquiries will come to this email:
$to = "rajkamdiya@gmail.com";

// Get POST data safely
$name     = isset($_POST['name']) ? trim($_POST['name']) : '';
$company  = isset($_POST['company']) ? trim($_POST['company']) : '';
$email    = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone    = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$country  = isset($_POST['country']) ? trim($_POST['country']) : '';
$product  = isset($_POST['product']) ? trim($_POST['product']) : '';
$message  = isset($_POST['message']) ? trim($_POST['message']) : '';

// Basic validation
if ($name === '' || $email === '' || $message === '') {
    echo json_encode([
        "success" => false,
        "error"   => "Missing required fields."
    ]);
    exit;
}

$subject = "New Enquiry from Website - Deepak Enterprise";

// Build email body
$body  = "You have received a new enquiry from your website:\n\n";
$body .= "Name: {$name}\n";
$body .= "Company: {$company}\n";
$body .= "Email: {$email}\n";
$body .= "Phone / WhatsApp: {$phone}\n";
$body .= "Country: {$country}\n";
$body .= "Interested In: {$product}\n\n";
$body .= "Message:\n{$message}\n";

// Additional headers
$headers   = "From: {$name} <{$email}>\r\n";
$headers  .= "Reply-To: {$email}\r\n";
$headers  .= "X-Mailer: PHP/" . phpversion();

// Try to send
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "error"   => "Mail function failed."
    ]);
}
