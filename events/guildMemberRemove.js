const Discord = require("discord.js");
const client = new Discord.Client();

//Notificacion de miembros que se van
client.on("guildMemberRemove", (member) => {
  let canal = client.channels.cache.get('ID-CANAL'); 
  canal.send(`${member.user}, a dejado el servidor.`);
 
});