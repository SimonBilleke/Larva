const { Message, MessageEmbed} = require('discord.js');

const Permission = (author) =>
new MessageEmbed()
    .setTitle('❌ Permisos Insuficientes.')
    .setDescription(`${author} tienes que ser admin mi pana 😎 `)
    .setColor("RED");

const Mencionado = (author) =>
new MessageEmbed()
    .setTitle('⚠️ Debes introducir el nombre de la persona a kickear .')
    .setDescription(`${author} introduce el nick del usuario. \n Utilizando el comando: +kick <@usuario> <razón`)
    .setColor('FFE90F');

const Razon = (author) =>
new MessageEmbed()
    .setTitle('⚠️ Escriba una razón del uso de kick. .')
    .setDescription(`${author} introduce una razón del kick. \n Utilizando el comando: +kick <@usuario> <razón`)
    .setColor('FFE90F');

module.exports = {
	name: 'kick',
    description: 'kickea a una larva',
    async execute(message = new Message(), args = new Array()) {

        const {author } = message;
        let mencionado1 = message.mentions.users.first();
        let razon1 = args.slice(1).join(' ');

        if (!message.member.roles.cache.some(r => r.name === "soi admin")){
            return message.reply(Permission(author));}
        if(!mencionado1) return message.reply(Mencionado(author));
        if(!razon1) return message.reply(Razon(author));

        message.guild.member(mencionado1).kick(razon1);
        message.channel.send(`**${mencionado1.username}**, fue expulsado del servidor, razón: ${razon1}.`);
    }
}