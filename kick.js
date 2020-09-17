const { Message, MessageEmbed} = require('discord.js');

const Permission = (author) =>
new MessageEmbed()
    .setTitle('❌ Permisos Insuficientes.')
    .setDescription(`${author} tienes que ser admin mi pana 😎 `)
    .setColor("RED");

const Invalid = (author) =>
new MessageEmbed()
    .setTitle('⚠️ Cantidad invalida.')
    .setDescription(`${author} introduce una cantidad valida. \n Utilizando el comando: +purga <cantidad>`)
    .setColor('FFE90F');

module.exports = {
	name: 'purge',
    description: 'Elimina x cantidad de mensajes',
    async execute(message = new Message(), args = new Array()) {
        const {author } = message;
        if (!message.member.roles.cache.some(r => r.name === "Kapita")){
        return message.reply(Permission(author));
        }
        if (isNaN(args[0])) {
            return message.reply(Invalid(author));
        }
        let cantidad = parseInt(args[0]);
            message.channel.bulkDelete(cantidad);
            console.log(cantidad + ' mensajes eliminados por ' + message.author);
    }
}




    if (!message.member.roles.cache.some(r => r.name === "soi admin")) { 
        message.channel.send('Necesitas ser admin para usar este comando.');
        return; 
    }

    let mencionado1 = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if(!mencionado1) return message.reply(`No ha mencionando a ningún miembro.`);
    if(!razon) return message.channel.send(`Escriba una razón del uso de kick.`);

    message.guild.member(mencionado1).kick(razon);
    message.channel.send(`**${mencionado1.username}**, fue expulsado del servidor, razón: ${razon}.`);
