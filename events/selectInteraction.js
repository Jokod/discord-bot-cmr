const { Events } = require('discord.js');
const { Server } = require('../data/models.js');
const Translate = require('../utils/translations.js');

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @description Executes when an interaction is created and handle it.

	 * @param {import('discord.js').SelectMenuInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;
		const guildId = interaction.guild.id;
		const translations = new Translate(client, guildId);

		// Checks if the interaction is a select menu interaction (to prevent weird bugs)

		if (!interaction.isStringSelectMenu()) return;

		const command = client.selectCommands.get(interaction.customId) || client.selectCommands.get(interaction.customId.split('-')[0]);

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultSelectError.js file!

		if (!command) {
			return await require('../messages/defaultSelectError').execute(interaction);
		}

		const server = await Server.findOne({ guild_id: guildId });

		if (command.init && !server) {
			return interaction.reply({
				content: translations.translate('SERVER_IS_NOT_INIT'),
				ephemeral: true,
			});
		}

		// A try to execute the interaction.

		try {
			await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({
				content: translations.translate('COMMAND_EXECUTE_ERROR'),
				ephemeral: true,
			});
		}
	},
};
