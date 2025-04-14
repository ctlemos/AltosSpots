<?php
    session_start();

    // VERIFIES IF THE FORM WAS SENT 
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // SAFETY MESURE: RATE LIMITING 
        if (!isset($_SESSION['last_submit_time'])) {
            $_SESSION['last_submit_time'] = time();
        } else {
            $current_time = time();
            $time_diff = $current_time - $_SESSION['last_submit_time'];

            // ALLOWS ONLY 1 REQUEST EACH 60 SECONDS 
            if ($time_diff < 60) {
                echo json_encode(['success' => false, 'message' => 'Please wait before submitting again.']);
                exit;
            }

            $_SESSION['last_submit_time'] = $current_time;
        }

        // DATA SANITATION
        $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $phone = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);
        $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
        $terms = isset($_POST['terms']) ? 'Accepted' : 'Not Accepted';

        // DATA VALIDATION
        if (empty($name) || empty($email) || empty($phone) || empty($message)) {
            echo json_encode(['success' => false, 'message' => 'All fields are required.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
            exit;
        }

        if (!preg_match('/^[0-9]{10,15}$/', $phone)) {
            echo json_encode(['success' => false, 'message' => 'Please enter a valid phone number.']);
            exit;
        }

        // SAFETY MESURE: HONEYPOT 
        if (!empty($_POST['honeypot'])) {
            echo json_encode(['success' => false, 'message' => 'Spam detected.']);
            exit;
        }

        // SENT EMAIL
        $to = ''; 
        $subject = 'New Contact Form Submission';
        $email_message = "Name: $name\n";
        $email_message .= "Email: $email\n";
        $email_message .= "Phone: $phone\n";
        $email_message .= "Message: $message\n";
        $email_message .= "Terms: $terms\n";
        $headers = "From: $email";

        if (mail($to, $subject, $email_message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error sending message. Please try again.']);
        }

        exit;
    }
?>