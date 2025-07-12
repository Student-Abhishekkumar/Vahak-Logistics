<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';
    $userId = $data['userId'] ?? 0;

    if ($action === 'register') {
        // Register new user
        $name = $data['name'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $phone = $data['phone'] ?? '';
        $location = $data['location'] ?? '';
        $company = $data['company'] ?? '';

        try {
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone, location, company) 
                                  VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $password, $phone, $location, $company]);
            $userId = $pdo->lastInsertId();

            // Create default subscription
            $stmt = $pdo->prepare("INSERT INTO subscriptions (user_id, plan, start_date) 
                                  VALUES (?, 'free', CURDATE())");
            $stmt->execute([$userId]);

            // Get created subscription
            $stmt = $pdo->prepare("SELECT * FROM subscriptions WHERE user_id = ?");
            $stmt->execute([$userId]);
            $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

            // Generate JWT token
            $token = generateToken([
                'id' => $userId,
                'name' => $name,
                'email' => $email
            ]);

            echo json_encode([
                'status' => 'success', 
                'message' => 'User registered successfully',
                'token' => $token,
                'user' => [
                    'id' => $userId,
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone,
                    'location' => $location,
                    'company' => $company,
                    'subscription' => $subscription // ADDED SUBSCRIPTION DATA
                ]
            ]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $e->getMessage()]);
        }
    } elseif ($action === 'login') {
        // User login
        $email = $data['email'];
        $password = $data['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Get user subscription
            $stmt = $pdo->prepare("SELECT * FROM subscriptions WHERE user_id = ?");
            $stmt->execute([$user['id']]);
            $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

            // Generate JWT token
            $token = generateToken([
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]);

            echo json_encode([
                'status' => 'success',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'location' => $user['location'],
                    'company' => $user['company'],
                    'subscription' => $subscription // ADDED SUBSCRIPTION DATA
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
        }
    }
}

function generateToken($data) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($data);
    $base64Header = base64_encode($header);
    $base64Payload = base64_encode($payload);
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, 'vahak_secret_key', true);
    $base64Signature = base64_encode($signature);
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}
?>