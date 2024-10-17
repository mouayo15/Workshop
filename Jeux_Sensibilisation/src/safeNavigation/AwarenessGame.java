package safeNavigation;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AwarenessGame {

    // Attributs de la fenêtre principale
    private JFrame mainFrame;
    private JTextField nameField;
    private JLabel scoreLabel;
    private JLabel timerLabel;
    private int score = 0;
    private int timer = 60; // Exemple de temps de jeu

    public AwarenessGame() {
        // Création de la fenêtre principale
        mainFrame = new JFrame("Jeu de Sensibilisation aux Réseaux Sociaux");
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setSize(400, 300);
        mainFrame.setLayout(new GridLayout(5, 1));

        // Titre du jeu
        JLabel titleLabel = new JLabel("Bienvenue dans le Jeu de Sensibilisation", SwingConstants.CENTER);
        mainFrame.add(titleLabel);

        // Champ pour entrer le nom
        nameField = new JTextField("Entrez votre nom ici...");
        mainFrame.add(nameField);

        // Affichage du score
        scoreLabel = new JLabel("Score: " + score, SwingConstants.CENTER);
        mainFrame.add(scoreLabel);

        // Affichage du temps
        timerLabel = new JLabel("Temps restant: " + timer + " secondes", SwingConstants.CENTER);
        mainFrame.add(timerLabel);

        // Bouton pour commencer le jeu
        JButton startButton = new JButton("Commencer le Jeu");
        startButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                startGame();
            }
        });
        mainFrame.add(startButton);

        // Afficher la fenêtre principale
        mainFrame.setVisible(true);
    }

    // Méthode pour démarrer le jeu et ouvrir la fenêtre de jeu
    private void startGame() {
        // Fermer la fenêtre principale
        mainFrame.dispose();

        // Créer la fenêtre de jeu
        JFrame gameFrame = new JFrame("Simulation de Navigateur");
        gameFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        gameFrame.setSize(800, 600);
        gameFrame.setLayout(new BorderLayout());

        // Barre d'adresse
        JTextField addressBar = new JTextField("Entrez une URL...");
        gameFrame.add(addressBar, BorderLayout.NORTH);

        // Zone de contenu
        JTextArea contentArea = new JTextArea();
        contentArea.setEditable(false);
        gameFrame.add(new JScrollPane(contentArea), BorderLayout.CENTER);

        // Panneau de boutons
        JPanel buttonPanel = new JPanel();
        JButton mailButton = new JButton("Mail");
        JButton chatButton = new JButton("Chat");
        JButton streamingButton = new JButton("Streaming");
        JButton searchButton = new JButton("Moteur de Recherche");

        buttonPanel.add(mailButton);
        buttonPanel.add(chatButton);
        buttonPanel.add(streamingButton);
        buttonPanel.add(searchButton);
        gameFrame.add(buttonPanel, BorderLayout.SOUTH);

        // Actions pour les boutons
        mailButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                contentArea.setText("Vous êtes dans la section Mail.");
            }
        });

        chatButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                contentArea.setText("Vous êtes dans la section Chat.");
            }
        });

        streamingButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                contentArea.setText("Vous êtes dans la section Streaming.");
            }
        });

        searchButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                contentArea.setText("Vous êtes dans la section Moteur de Recherche.");
            }
        });

        // Afficher la fenêtre de jeu
        gameFrame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(AwarenessGame::new);
    }
}
