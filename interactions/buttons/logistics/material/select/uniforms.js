const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Operation } = require('../../../../../data/models.js');
const { getUniforms } = require('../../../../../data/fournis.js');

module.exports = {
	init: true,
	id: 'logistics_select_material_uniforms',

	async execute(interaction) {
		const guildId = interaction.guild.id;
		const operationId = interaction.customId.split('-')[1];
		const threadId = interaction.customId.split('-')[2];
		const materialId = interaction.customId.split('-')[3];
		const operation = await Operation.findOne({ operation_id: `${operationId}` });

		const buttonBack = new ButtonBuilder()
			.setCustomId(`button_logistics_add_material-${operationId}-${threadId}-${materialId}`)
			.setLabel('Back')
			.setStyle(ButtonStyle.Secondary);

		const uniformsRow = await getUniforms({ guildId, operationId, threadId, materialId });
		const buttonArrowRow = new ActionRowBuilder().addComponents(buttonBack);

		await interaction.update({
			content: `**ID:** ${materialId}\nListe des uniformes disponibles pour l'opération **${operation.title}**`,
			components: [...uniformsRow, buttonArrowRow],
		});
	},
};