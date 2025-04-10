const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Vérifie le statut des pings restants dans ce salon.'),
  async execute(interaction) {
    const salonId = interaction.channel.id;

    // Vérifie si le fichier clients.json existe
    if (!fs.existsSync('./clients.json')) {
      await interaction.reply({ content: '❌ Aucun client enregistré pour le moment.', ephemeral: true });
      return;
    }

    const clientsData = JSON.parse(fs.readFileSync('./clients.json', 'utf8'));

    // Vérifie si le salon est dans la liste des clients
    if (!clientsData[salonId]) {
      await interaction.reply({ content: '❌ Ce salon n\'est pas enregistré en tant que salon client.', ephemeral: true });
      return;
    }

    const client = clientsData[salonId];
    const now = Date.now();
    const resetTime = client.resetTime || 0;
    const timeRemaining = Math.max(resetTime - now, 0);

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    await interaction.reply({
      content: `📊 **Statut actuel :**\n\n` +
               `🔔 Pings \`@everyone\` restants : **${client.everyonePings}**\n` +
               `🔔 Pings \`@here\` restants : **${client.herePings}**\n` +
               `⏰ Réinitialisation dans : **${hours}h ${minutes}m ${seconds}s**`,
      ephemeral: true
    });
  },
};
