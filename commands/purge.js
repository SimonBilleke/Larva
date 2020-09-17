const { Message, MessageEmbed} = require('discord.js');

const Permission = (author) =>
new MessageEmbed()
    .setTitle('❌ Permisos Insuficientes.')
    .setDescription(`${author} tienes que ser admin mi pana 😎 `)
    .setColor("RED");

const Invalid = (author) =>
new MessageEmbed()
    .setTitle('⚠️ Cantidad invalida.')
    .setDescription(`${author} introduce una cantidad valida. \n Utilizando el comando: +purge <cantidad>`)
    .setColor('FFE90F');

module.exports = {
	name: 'purge',
    description: 'Elimina x cantidad de mensajes',
    async execute(message = new Message(), args = new Array()) {
        const {author } = message;
        if (!message.member.roles.cache.some(r => r.name === "soi admin")){
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






	/*execute(message,args) {
        async function purge() {
            const {author} = message;
            if (!message.member.roles.cache.some(r => r.name === "soi admin")) { 
                return message.reply(Permission(author)); 
            }

            if (isNaN(args[0])) {
                return message.reply(Invalid(author));
            }
            let cantidad = parseInt(args[0]);
            message.channel.bulkDelete(cantidad);
            console.log(cantidad + ' mensajes eliminados por ' + message.author); 
        }       
        purge();
    }*/
