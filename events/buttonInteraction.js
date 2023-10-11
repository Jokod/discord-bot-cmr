const { Events } = require('discord.js');
const { Server } = require('../data/models.js');

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @description Executes when an interaction is created and handle it.

	 * @param {import('discord.js').ButtonInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;
		const guildId = interaction.guild.id;

		// Checks if the interaction is a button interaction (to prevent weird bugs)

		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId) || client.buttonCommands.get(interaction.customId.split('-')[0]);

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultButtonError.js file!

		if (!command) {
			return await require('../messages/defaultButtonError').execute(interaction);
		}

		const server = await Server.findOne({ guild_id: guildId });

		if (command.init && !server) {
			return interaction.reply({
				content: 'This server is not initialized, please run the `/setup` command.',
				ephemeral: true,
			});
		}

		// A try to execute the interaction.

		try {
			return await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'An error occured while executing the command.',
				ephemeral: true,
			});
		}
	},
};
