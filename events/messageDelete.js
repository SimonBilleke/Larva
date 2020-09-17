const Discord = require("discord.js");
const client = new Discord.Client();


//Notificación de mensajes eliminados en el mismo canal que sucede.
client.on("messageDelete", (message) => {
  let canal = client.channels.cache.get('bot-testing'); //creía que esta linea era donde iría el mensaje pero no.
  message.channel.send(`**${message.author.username}** elimino un mensaje con el contenido: ${message}`);
})

