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
    $userId = $data['userId'] ?? 0;

    if ($action === 'add') {
        // Check subscription limits
        $stmt = $pdo->prepare("SELECT used_vehicles, vehicles FROM subscriptions WHERE user_id = ?");
        $stmt->execute([$userId]);
        $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($subscription['used_vehicles'] >= $subscription['vehicles']) {
            echo json_encode(['status' => 'error', 'message' => 'Vehicle limit reached']);
            exit;
        }

        // Add new vehicle
        $vehicleData = $data['vehicle'];
        try {
            $stmt = $pdo->prepare("INSERT INTO vehicles (user_id, vehicle_id, plate, type, capacity, status, driver, location)
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $userId,
                $vehicleData['id'],
                $vehicleData['plate'],
                $vehicleData['type'],
                $vehicleData['capacity'],
                $vehicleData['status'],
                $vehicleData['driver'],
                $vehicleData['location']
            ]);

            // Update subscription usage
            $stmt = $pdo->prepare("UPDATE subscriptions SET used_vehicles = used_vehicles + 1 WHERE user_id = ?");
            $stmt->execute([$userId]);

            echo json_encode(['status' => 'success', 'message' => 'Vehicle added']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add vehicle']);
        }
    } elseif ($action === 'list') {
        // List user's vehicles
        $stmt = $pdo->prepare("SELECT * FROM vehicles WHERE user_id = ?");
        $stmt->execute([$userId]);
        $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['status' => 'success', 'vehicles' => $vehicles]);
    }
}
?>