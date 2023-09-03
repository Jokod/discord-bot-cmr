const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @description Executes when an interaction is created and handle it.

	 * @param {import('discord.js').ButtonInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a button interaction (to prevent weird bugs)

		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId) || client.buttonCommands.get(interaction.customId.split('-')[0]);

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultButtonError.js file!

		if (!command) {
			return await require('../messages/defaultButtonError').execute(interaction);
		}

		// A try to execute the interaction.

		try {
			return await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !',
				ephemeral: true,
			});
		}
	},
};
