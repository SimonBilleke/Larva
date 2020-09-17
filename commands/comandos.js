exports.run = (client, message, args) => {
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
        break;*/
    }
}