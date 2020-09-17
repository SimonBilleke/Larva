const Discord = require("discord.js");
const client = new Discord.Client();

//Notificacion de miembros nuevos
client.on("guildMemberAdd", (member) => {
  let canal = client.channels.cache.get('ID-CANAL'); 
  canal.send(`Hola ${member.user}, bienvenido al servidor ${member.guild.name} pasala bien!.`);
 
});
