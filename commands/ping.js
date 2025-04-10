const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping @everyone ou @here dans votre salon')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type de ping')
        .setRequired(true)
        .addChoices(
          { name: 'everyone', value: 'everyone' },
          { name: 'here', value: 'here' }
        )),
  async execute(interaction) {
    const userId = interaction.user.id;
    const clients = require('../data/clients.json');
    const client = clients[userId];

    if (!client) {
      return await interaction.reply({ content: 'Vous n\'êtes pas enregistré comme client.', ephemeral: true });
    }

    const type = interaction.options.getString('type');

    if (client[type] <= 0) {
      return await interaction.reply({ content: `Vous avez déjà utilisé votre ping @${type} pour aujourd'hui.`, ephemeral: true });
    }

    client[type] -= 1;
    fs.writeFileSync('./data/clients.json', JSON.stringify(clients, null, 2));

    const channel = await interaction.guild.channels.fetch(client.salonId);
    channel.send(`@${type} Ping demandé par <@${userId}>`);

    await interaction.reply({ content: `Ping @${type} envoyé dans <#${client.salonId}> !`, ephemeral: true });
  },
};
