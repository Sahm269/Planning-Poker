<?php

class PlanningPokerManager {
    private $db;

    // Constructor to establish the database connection
    public function __construct() {
        $this->db = new PDO('mysql:host=localhost;dbname=planningpoker', 'root', 'Sourayat19');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // Method to insert data into the "partie" table
    public function insertData($nomPartie, $pseudo, $backlog, $etatPartie,$chronometre, $nbJoueur) {
        $nbJoueur = intval($nbJoueur);

        $stmt = $this->db->prepare("INSERT INTO partie (nomPartie, pseudo, backlog, etatpartie, nbjoueur) 
                                    VALUES (?, ?, ?, ?, ? )");
        $stmt->execute([$nomPartie, $pseudo, $backlog, $etatPartie, $nbJoueur]);
    }

    // Method to retrieve data from the "partie" table
    public function getData() {
        $stmt = $this->db->query("SELECT * FROM partie");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Method to update data in the "partie" table
    public function updateData($id, $newData) {
        $stmt = $this->db->prepare("UPDATE partie SET nomPartie = ?, pseudo = ?, backlog = ?, etatpartie = ?, chronometre = ?, nbjoueur = ? WHERE id = ?");
        $stmt->execute([$newData['nomPartie'], $newData['pseudo'], $newData['backlog'], $newData['etatPartie'],$newData['chronometre'], $newData['nbJoueur'], $id]);
    }

    // Method to delete data from the "partie" table
    public function deleteData($id) {
        $stmt = $this->db->prepare("DELETE FROM partie WHERE id = ?");
        $stmt->execute([$id]);
    }

    // Method to create a session for the user
    public function createSession($username) {
        session_start();
        $_SESSION['username'] = $username;
    }

    // Method to close the session for the user
    public function closeSession() {
        session_start();
        session_destroy();
    }

    // Method to check if the user is logged in
    public function isLoggedIn() {
        session_start();
        return isset($_SESSION['username']);
    }

    // Method to handle user login
    public function loginUser($username) {
        $this->createSession($username);
    }

    // Method to handle user logout
    public function logoutUser() {
        // Destroy the session to log the user out
        $this->closeSession();
    }
}


