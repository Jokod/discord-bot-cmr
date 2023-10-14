const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Material } = require('../../../../data/models.js');
const Translate = require('../../../../utils/translations.js');

module.exports = {
	id: 'button_logistics_assignee',

	async execute(interaction) {
		const operationId = interaction.customId.split('-')[1];
		const threadId = interaction.customId.split('-')[2];
		const materialId = interaction.customId.split('-')[3];
		const translations = new Translate(interaction.client, interaction.guild.id);

		const revokeButton = new ButtonBuilder()
			.setCustomId(`button_logistics_revoke-${operationId}-${threadId}-${materialId}`)
			.setLabel(translations.translate('REVOKE'))
			.setStyle(ButtonStyle.Danger);

		const validateButton = new ButtonBuilder()
			.setCustomId(`button_logistics_material_validate-${operationId}-${threadId}-${materialId}`)
			.setLabel(translations.translate('VALIDATE'))
			.setStyle(ButtonStyle.Success);

		const actionRow = new ActionRowBuilder().addComponents(revokeButton, validateButton);

		try {
			await Material.updateOne({ material_id: `${materialId}` }, { owner_id: interaction.user.id });

			const material = await Material.findOne({ material_id: `${materialId}` });

			const name = material.name.charAt(0).toUpperCase() + material.name.slice(1);

			await interaction.update({
				content: `**${translations.translate('ID')}:** ${materialId}\n**${translations.translate('MATERIAL')}:** ${name}\n**${translations.translate('QUANTITY')}:** ${material.quantityAsk}\n**${translations.translate('MATERIAL_PERSON_IN_CHARGE')}:** <@${interaction.user.id}>`,
				components: [actionRow],
			});
		}
		catch (err) {
			console.error(err);
			return await interaction.update({
				content: translations.translate('MATERIAL_ASSIGN_ERROR'),
				ephemeral: true,
			});
		}
	},
};