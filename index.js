const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const schedule = require('node-schedule');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command.data) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`La commande dans ${file} est mal formatée.`);
  }
}

client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

// Gestion des interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
  }
});

// Reset quotidien des pings
schedule.scheduleJob({ hour: config.resetHour, minute: 0 }, () => {
  const clients = require('./data/clients.json');
  for (const clientId in clients) {
    clients[clientId].everyone = 1;
    clients[clientId].here = 1;
  }
  fs.writeFileSync('./data/clients.json', JSON.stringify(clients, null, 2));
  console.log('Reset quotidien des pings effectué.');
});

client.login(config.token);
