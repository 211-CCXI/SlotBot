const { exec } = require('child_process');

// Étape 1 : Déployer les commandes
console.log('🚀 Déploiement des commandes Slash...');
exec('node deploy-commands.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur de déploiement : ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️  Avertissement : ${stderr}`);
  }
  console.log(stdout);

  // Étape 2 : Lancer le bot
  console.log('🤖 Lancement du bot...');
  exec('node index.js', (errorBot, stdoutBot, stderrBot) => {
    if (errorBot) {
      console.error(`❌ Erreur lors du lancement du bot : ${errorBot.message}`);
      return;
    }
    if (stderrBot) {
      console.error(`⚠️  Avertissement : ${stderrBot}`);
    }
    console.log(stdoutBot);
  });
});
