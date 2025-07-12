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
        $stmt = $pdo->prepare("SELECT used_loads, loads FROM subscriptions WHERE user_id = ?");
        $stmt->execute([$userId]);
        $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($subscription['used_loads'] >= $subscription['loads']) {
            echo json_encode(['status' => 'error', 'message' => 'Load limit reached']);
            exit;
        }

        // Add new load
        $loadData = $data['load'];
        try {
            $stmt = $pdo->prepare("INSERT INTO loads (user_id, load_id, name, status, route, weight, material, price, start_date, end_date, bids_count)
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $userId,
                $loadData['id'],
                $loadData['name'],
                $loadData['status'],
                $loadData['route'],
                $loadData['weight'],
                $loadData['material'],
                $loadData['price'],
                $loadData['start_date'],
                $loadData['end_date'],
                $loadData['bids_count'] ?? 0
            ]);

            // Update subscription usage
            $stmt = $pdo->prepare("UPDATE subscriptions SET used_loads = used_loads + 1 WHERE user_id = ?");
            $stmt->execute([$userId]);

            echo json_encode(['status' => 'success', 'message' => 'Load added']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add load: ' . $e->getMessage()]);
        }
    } elseif ($action === 'list') {
        // List user's loads
        $stmt = $pdo->prepare("SELECT * FROM loads WHERE user_id = ?");
        $stmt->execute([$userId]);
        $loads = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['status' => 'success', 'loads' => $loads]);
    }
}
?>