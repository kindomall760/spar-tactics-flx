const { createClient } = require('@supabase/supabase-js');
const { Client, GatewayIntentBits } = require('discord.js');

// Configuración de Supabase
const supabaseUrl = 'https://htbwrvktrinixwmjhaqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Yndydmt0cmluaXh3bWpoYXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MjUzODIsImV4cCI6MjA4NTIwMTM4Mn0.hPdf3Gjhrxs40EXnoSGn6qjF8wIGB7queUXEBbKfIOg';
const supabase = createClient(supabaseUrl, supabaseKey);

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

let queue = [];

client.on('ready', () => {
    console.log(`✅ Bot conectado como: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Comando para unirse a la cola 4vs4
    if (message.content === '!join') {
        if (queue.includes(message.author.id)) return message.reply('Ya estás en la cola.');
        
        queue.push(message.author.id);
        message.channel.send(`⚔️ **${message.author.username}** se unió (${queue.length}/8)`);

        if (queue.length === 8) {
            const players = queue.map(id => `<@${id}>`).join(' ');
            message.channel.send(`🔥 **¡PARTIDA LISTA!**\nJugadores: ${players}\n@flex organiza los equipos.`);
            queue = []; 
        }
    }

    // Comando para ver tu propio ELO (Traído de Supabase)
    if (message.content === '!stats') {
        const { data, error } = await supabase
            .from('jugadores')
            .select('*')
            .eq('username', message.author.username)
            .single();

        if (data) {
            message.reply(`📊 Tus stats: **${data.elo} Elo** | Wins: ${data.wins}`);
        } else {
            message.reply('Aún no tienes registros. ¡Juega una partida primero!');
        }
    }
});

client.login('PQjD_JAm43KQtN5G4WmLMsjn7A-yq6Xp');
