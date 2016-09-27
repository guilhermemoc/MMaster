<?php

define('EMAIL_TO', 'contato@mediamaster.com.br');

if(!$_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit();
}

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$company = $_POST['company'];
$employees = $_POST['employees'];

if(!($name && $email && $phone && $company && $employees)) {
    http_response_code(400);
    exit();
}

$message = "Nome: " . $name . "\n";
$message .= "E-mail: " . $email . "\n";
$message .= "Telefone: " . $phone . "\n";
$message .= "Empresa: " . $company . "\n";
$message .= "Empregados: " . $employees . "\n";

$header = "From: noreply@mediamaster.com.br\r\n";

$subject = "[mediamaster] Cadastro no site";

mail(EMAIL_TO, $subject, $message, $header);
