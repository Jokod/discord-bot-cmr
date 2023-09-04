const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {

		console.log(`Connecté en tant que ${client.user.tag}!`);
	},
};
