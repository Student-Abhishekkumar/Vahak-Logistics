<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';

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

            echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
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

            echo json_encode([
                'status' => 'success',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'location' => $user['location'],
                    'company' => $user['company']
                ],
                'subscription' => $subscription
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
        }
    }
}
?>