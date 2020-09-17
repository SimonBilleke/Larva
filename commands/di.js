const { Message, MessageEmbed} = require('discord.js');
module.exports = {
	name: 'di',
    description: 'El bot repite el mensaje que se le da y elimina el original',
    async execute(message = new Message(), args = new Array()) {        
        let texto = args.join(" ");
            if(!texto) return message.channel.send(`Escriba el contenido a enviar.`);
            message.delete(); 
            message.channel.send(texto);
          }
    }