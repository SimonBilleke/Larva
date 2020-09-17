const Discord = require("discord.js");
const config = require("./config.json");
//const Enmap = require("enmap");
const fs = require("fs");


const client = new Discord.Client({
    presence: {
      status: "online",
      activity: {
        name: "ser mi propio jefe",
        type: "PLAYING",
      }
    },
    token: config.token
  });

let prefix = config.prefix;
client.login(config.token);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;

    const event = require(`./events/${file}`);

    let eventName = file.split(".")[0];      
    delete require.cache[require.resolve(`./events/${file}`)];
    console.log(`Attempting to load event ${eventName}`);
  });
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  console.log("Tamos ready Larrva");
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('hubo un error con el comando! (catch)');
  }
})

















/*

client.on("ready", () => {
    console.log("Tamos ready Larrva");
 });
 
 client.on("message", (message) => {

    if (!(message.content.startsWith(prefix)) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
   
    switch (command) {
        case '11':
            message.channel.send('chupalo entonce');
        break;
        
        case '13':
            message.channel.send('MAS ME CRECE');
        break;
        
        case 'mensajebot':
            let texto = args.join(" ");
            if(!texto) return message.channel.send(`Escriba el contenido a enviar.`);
            message.delete(); 
            message.channel.send(texto);
        break;

        case 'qlachuch':
            let nombre = args[0];
            let cualidad = args[1];

            message.channel.send(`El ${nombre} es mas ${cualidad} que la chucha.`);
        break;

        case 'kick':
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
        break;

        case 'purga':
        async function purge() {
            //message.delete(); 
            if (!message.member.roles.cache.some(r => r.name === "Kapita")) { 
                message.channel.send('Necesitas ser admin para borrar mensajes.');
                return; 
            }

            if (isNaN(args[0])) {
                message.channel.send('Por favor introuce una cantidad valida. \n Usando: ' + prefix + 'purga <cantidad>');
                return;
            }

            let cantidad = parseInt(args[0]);
            message.channel.bulkDelete(cantidad);
            message.channel.send(cantidad + ' mensajes eliminados.'); 
            console.log(cantidad + ' mensajes eliminados.'); 

           // const fetched = await message.channel.fetchMessages({limit: args[0]});
        }
        purge();
        break;

        /*case 'a11': //11 Herb laugh
        PlayTaunt(message, '11.mp3');
        break;
        case 'a14': //14 Start the game
        play(message, '14.mp3');
        break;

        case 'a1': //1 Yes
        playSong(message, '01.mp3');
        break;

        case 'a2': //02 No
        playSong(message, '02.mp3');
        break;
    }
});


/*Notificación de mensajes eliminados en el mismo canal que sucede.
client.on("messageDelete", (message) => {
    let canal = client.channels.cache.get('bot-testing'); //creía que esta linea era donde iría el mensaje pero no.
    message.channel.send(`**${message.author.username}** elimino un mensaje con el contenido: ${message}`);
  });*/

  //ERRORES EN LA CONSOLA
/*client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));




    case 'pruebaembed':
            message.channel.send({embed: {
                color: 3447003,
                description: "Panamá está hasta la verga."
              }
          });
        break;

        case 'pruebaembed2':
            message.channel.send({embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL()
                },
                title: "Narzizzo",
                url: "https://google.com",
                description: "Mesaje de prueba para la descripcion del embed.*cursiva* **__Marcado__** ",
                fields: [{
                    name: "Campo1",
                    value: "Pueden tener diferentes campos con pequeñas descripciones."
                  },
                  {
                    name: "Campo2",
                    value: "Puedes poner [Enlaces web](https://google.com/) dentro del embed."
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL(),
                  text: "OLAOLAOLAOLAAAA"
                }
              }
          });
          break;

          case 'pruebaembed3':

            const embedDatos = new Discord.MessageEmbed() 
            .setTitle("Este es su título, puede contener 256 caracteres")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(0x00AE86)
            .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
            .setFooter("Pie de página, puede contener 1024 caracteres", client.user.avatarURL())
            .setImage(message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setURL("https://Google.com/")
            .addField("Este es un título de campo", "Este es un valor de campo puede contener 1024 caracteres.")
            .addField("Campo en línea", "Debajo del campo en línea",  true)
            .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
            
        message.channel.send({ embed: embedDatos });
  */