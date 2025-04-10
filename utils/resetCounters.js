const fs = require('fs');

function resetCounters() {
  const clientsPath = './data/clients.json';
  const clients = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));

  for (const userId in clients) {
    clients[userId].pings = { everyone: 1, here: 1 };
    clients[userId].lastReset = new Date().toISOString();
  }

  fs.writeFileSync(clientsPath, JSON.stringify(clients, null, 2));
  console.log('🔄 Tous les compteurs de ping ont été réinitialisés.');
}

module.exports = { resetCounters };
