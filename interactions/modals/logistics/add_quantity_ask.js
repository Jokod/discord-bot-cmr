const { Material } = require('../../../data/models.js');
const ResponseMaterial = require('../../../utils/interaction/response_material.js');

module.exports = {
	id: 'modal_logistics_add_quantity_ask',

	async execute(interaction) {
		const materialId = interaction.customId.split('-')[3];

		const quantity_ask = interaction.fields.getTextInputValue('quantity_ask');

		try {
			await Material.updateOne({ material_id: `${materialId}` }, { quantityAsk: quantity_ask });

			const material = await Material.findOne({ material_id: `${materialId}` });

			await new ResponseMaterial(interaction, material).response();
		}
		catch (err) {
			console.error(err);
			return await interaction.reply({
				content: 'An error occured while selecting the material.',
				ephemeral: true,
			});
		}
	},
};