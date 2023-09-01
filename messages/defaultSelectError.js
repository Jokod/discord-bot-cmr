module.exports = {
	/**
	 * @description Executes when the select menu interaction could not be fetched.
	
	 * @param {import('discord.js').SelectMenuInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "Aucune intéraction n'a été trouvée pour cette action.",
			ephemeral: true,
		});
		return;
	},
};
