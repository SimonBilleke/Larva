const Taunt = new Set();
const { Message, MessageEmbed, VoiceConnection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const clips = fs.readdirSync("./sounds").filter(file => file.endsWith('.mp3'));

const speakPermission = (author) =>
  new MessageEmbed()
    .setTitle('❌ Permisos Insuficientes.')
    .setDescription(`${author} necesito el permiso 'SPEAK'.`)
    .setColor("RED");

const connectPermission = (author) =>
  new MessageEmbed()
    .setTitle('❌ Permisos Insuficientes.')
    .setDescription(`${author} necesito el permiso 'CONNECT'.`)
    .setColor("RED");

const noMemberVoiceChannel = (author) =>
  new MessageEmbed()
    .setTitle(`No estás en un canal de voz.`)
    .setDescription(`${author}, solo puedes usar este comando estando en un canal de voz.`)
    .setColor("BLUE");


module.exports = {
  name: "taunt",
  guildOnly: true,
  filename: path.basename(__filename),
  description: "😏",
  usage: "taunt <Sin Parámetros>",
  nsfw: false,
  enabled: true,
  aliases: ["taunt", "taunts"],
  permissions: ["SPEAK", "CONNECT"],
  async execute(message = new Message(), args = new Array()) {
    const { /*guild,*/ member, author, channel } = message;
    //if (Taunt.has(guild.id)) return undefined;
    if (clips.length === 0) return channel.send("No hay archivos para reproducir.");

    //if (Taunt.has(guild.id)) return;
    //if (!guild.me.hasPermission('SPEAK')) return channel.send(speakPermission(author));
    if (!member.voice.channel) return message.reply(noMemberVoiceChannel(author));
    if (!member.voice.channel.joinable) return message.reply(connectPermission(author));

    const connection = await member.voice.channel.join();
    //channel.send(`ENTRÉ AL CHANNEL`);
    PlayTaunt(connection, message, clips);
  }
}

const PlayTaunt = (connection = new VoiceConnection(), message, clips) => {       
    const dispatcher = connection.play('./sounds/14.mp3', {bitrate: 96000, volume: 0.75, highWaterMark: 1 << 10 });

    dispatcher.on('end', () =>{
        connection.disconnect();
    });
    
    dispatcher.on('error', e =>{
        console.log("error");
        console.log(e);
        connection.disconnect();
    });
//message.reply('Tienes que estar en un canal de voz.');
}