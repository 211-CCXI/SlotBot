# Discord Slot Bot

Ce bot Discord permet aux clients de louer un espace privé sur un serveur Discord. Chaque client dispose de permissions spécifiques, incluant la possibilité d'envoyer un ping `@everyone` et un ping `@here` par jour, mais uniquement via le bot.

## Fonctionnalités

- **Location d'espace privé** : Chaque client obtient un salon privé où il peut mettre ce qu'il veut.
- **Pings limités** : Un client peut envoyer un ping `@everyone` et un ping `@here` par jour, via le bot uniquement.
- **Gestion des pings** : Les clients peuvent vérifier combien de temps il leur reste avant que leurs pings ne soient réinitialisés, et combien de pings il leur reste.
- **Commandes d'administration** :
  - `/addclient <salon_id> <client_id>` : Ajoute un client avec un salon dédié et des permissions de ping.
  - `/pingstatus` : Affiche le temps restant avant le reset des pings et le nombre de pings restants pour le client.

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/discord-slot-bot.git
Allez dans le dossier du projet :

bash
Copier
Modifier
cd discord-slot-bot
Installez les dépendances nécessaires :

bash
Copier
Modifier
npm install
Créez un fichier .env à la racine de votre projet pour stocker votre token Discord et d'autres informations sensibles. Exemple de contenu :

env
Copier
Modifier
DISCORD_TOKEN=your-discord-bot-token
GUILD_ID=your-server-id
Usage
Lancer le bot :

bash
Copier
Modifier
node serveur.js
Ajoutez un client avec la commande /addclient dans Discord. Un client pourra alors envoyer un ping @everyone et @here via le bot dans son salon dédié.

Utilisez la commande /pingstatus pour vérifier le statut des pings restants pour chaque client.

Contributions
Les contributions sont les bienvenues ! Si vous avez des suggestions ou des corrections à proposer, n'hésitez pas à ouvrir une pull request.

License
Distribué sous la licence MIT. Voir le fichier LICENSE pour plus de détails.

Description
Bot Discord permettant aux clients de louer un espace privé avec des pings limités via commandes.
