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
    $userId = $data['userId'] ?? 0;
    $plan = $data['plan'] ?? 'free';

    // Define plan limits
    $limits = [
        'free' => ['vehicles' => 2, 'loads' => 2],
        'starter' => ['vehicles' => 5, 'loads' => 10],
        'professional' => ['vehicles' => 25, 'loads' => 50]
    ];

    try {
        $stmt = $pdo->prepare("UPDATE subscriptions 
                              SET plan = ?, vehicles = ?, loads = ?
                              WHERE user_id = ?");
        $stmt->execute([
            $plan,
            $limits[$plan]['vehicles'],
            $limits[$plan]['loads'],
            $userId
        ]);
        
        echo json_encode(['status' => 'success', 'message' => 'Subscription updated']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Subscription update failed']);
    }
}
?>