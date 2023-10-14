const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Material } = require('../../../../../data/models.js');
const { getShipables } = require('../../../../../data/fournis.js');
const Translate = require('../../../../../utils/translations.js');

module.exports = {
	init: true,
	id: 'logistics_select_material_shipables',

	async execute(interaction) {
		const guildId = interaction.guild.id;
		const operationId = interaction.customId.split('-')[1];
		const threadId = interaction.customId.split('-')[2];
		const materialId = interaction.customId.split('-')[3];
		const translations = new Translate(interaction.client, guildId);

		const material = await Material.findOne({ material_id: `${materialId}` });

		if (interaction.user.id !== material.owner_id) {
			return await interaction.reply({
				content: translations.translate('MATERIAL_ARE_NO_OWNER_ERROR'),
				ephemeral: true,
			});
		}

		const buttonBack = new ButtonBuilder()
			.setCustomId(`button_logistics_add_material-${operationId}-${threadId}-${materialId}`)
			.setLabel(translations.translate('BACK'))
			.setStyle(ButtonStyle.Secondary);

		const shipables = await getShipables({ guildId, operationId, threadId, materialId });
		const buttonArrowRow = new ActionRowBuilder().addComponents(buttonBack);

		await interaction.update({
			content: `**${translations.translate('ID')}:** ${materialId}\n${translations.translate('MATERIAL_LIST_SHIPABLES')}`,
			components: [...shipables, buttonArrowRow],
		});
	},
};
