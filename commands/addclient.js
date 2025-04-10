const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addclient')
    .setDescription('Ajoute un client avec son salon dédié et son utilisateur')
    .addStringOption(option =>
      option.setName('salonid')
        .setDescription('ID du salon client.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('ID de l’utilisateur client.')
        .setRequired(true)),
        
  async execute(interaction) {
    const salonId = interaction.options.getString('salonid');
    const userId = interaction.options.getString('userid');

    const filePath = './clients.json';
    let clientsData = {};

    // Lecture du fichier s'il existe
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        clientsData = JSON.parse(fileContent);
      } catch (error) {
        console.error(error);
        return interaction.reply({ content: '❌ Erreur de lecture du fichier clients.json.', ephemeral: true });
      }
    }

    // Vérifie si l'utilisateur est déjà enregistré
    if (clientsData[userId]) {
      return interaction.reply({ content: '❌ Ce client est déjà enregistré.', ephemeral: true });
    }

    // Ajoute le client avec la structure correcte
    clientsData[userId] = {
      salonId: salonId,
      everyone: 1,
      here: 1,
      resetTime: Date.now() + 24 * 60 * 60 * 1000 // 24 heures plus tard
    };

    // Sauvegarde le fichier
    try {
      fs.writeFileSync(filePath, JSON.stringify(clientsData, null, 2));
      await interaction.reply({ content: `✅ Client ajouté avec succès !\nSalon : <#${salonId}>\nUtilisateur : <@${userId}>`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Erreur lors de la sauvegarde du client.', ephemeral: true });
    }
  },
};
