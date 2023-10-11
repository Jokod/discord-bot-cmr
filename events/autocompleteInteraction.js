const { Events } = require('discord.js');
const { Server } = require('../data/models.js');

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @description Executes when an interaction is created and handle it.

	 * @param {import('discord.js').AutocompleteInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;
		const guildId = interaction.guild.id;

		// Checks if the interaction is an autocomplete interaction (to prevent weird bugs)

		if (!interaction.isAutocomplete()) return;

		// Checks if the request is available in our code.

		const request = client.autocompleteInteractions.get(
			interaction.commandName,
		);

		// If the interaction is not a request in cache return.

		if (!request) return;

		const server = await Server.findOne({ guild_id: guildId });

		if (request.init && !server) {
			return interaction.reply({
				content: 'This server is not initialized, please run the `/setup` command.',
				ephemeral: true,
			});
		}

		// A try to execute the interaction.

		try {
			await request.execute(interaction);
		}
		catch (err) {
			console.error(err);
			return Promise.reject(err);
		}
	},
};
