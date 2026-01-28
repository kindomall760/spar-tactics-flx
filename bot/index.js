// Archivo: bot/index.js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let queue = [];

client.on('messageCreate', message => {
    if (message.content === '!join') {
        if (queue.length >= 8) return message.reply("La partida ya está llena, espera un momento.");
        if (queue.includes(message.author.id)) return message.reply("Ya estás en cola.");

        queue.push(message.author.id);
        message.channel.send(`⚔️ **${message.author.username}** se unió (${queue.length}/8)`);

        if (queue.length === 8) {
            const menciones = queue.map(id => `<@${id}>`).join(' ');
            message.channel.send(`🔥 **¡PARTIDA 4VS4 LISTA!**\nJugadores: ${menciones}\n\n@flex ¡Organiza los equipos ahora!`);
            queue = []; // Reset para la siguiente
        }
    }
});

client.login('TU_BOT_TOKEN_AQUI');
