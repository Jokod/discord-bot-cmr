const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { getHeavyArms } = require('../../../../../data/fournis.js');
const Translate = require('../../../../../utils/translations.js');

module.exports = {
	init: true,
	id: 'logistics_select_material_heavy_arms',

	async execute(interaction) {
		const guildId = interaction.guild.id;
		const operationId = interaction.customId.split('-')[1];
		const threadId = interaction.customId.split('-')[2];
		const materialId = interaction.customId.split('-')[3];
		const translations = new Translate(interaction.client, guildId);

		const buttonBack = new ButtonBuilder()
			.setCustomId(`button_logistics_add_material-${operationId}-${threadId}-${materialId}`)
			.setLabel(translations.translate('BACK'))
			.setStyle(ButtonStyle.Secondary);

		const heavyArmsRow = await getHeavyArms({ guildId, operationId, threadId, materialId });
		const buttonArrowRow = new ActionRowBuilder().addComponents(buttonBack);

		await interaction.update({
			content: `**${translations.translate('ID')}:** ${materialId}\n${translations.translate('MATERIAL_LIST_SMALL_ARMS')}`,
			components: [...heavyArmsRow, buttonArrowRow],
		});
	},
};
