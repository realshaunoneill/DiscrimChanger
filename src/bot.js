const Discord = require('discord.js');
const client = exports.client = new Discord.Client();

const config = require('../config.json');

client.once('ready', () => {
    console.log(`Discriminator changer is running!`);

    client.user.setGame(`Changing my discriminator to ${config.desiredDiscrim}`);

    changeDiscriminator();
});

function changeDiscriminator() {

    let users = client.users.array();

    for (let x = 0; x < users; x++){
        setInterval(function () {

            client.user.setUsername(users.username, config.userAccountPassword);

            if (x % 10 === 0){
                console.log(`Done trying ${x} usernames! Still going!`);
            }

            if (checkDiscrim()) return;


        }, config.changeInterval);
    }
}

function checkDiscrim() {
    return client.user.discriminator == config.desiredDiscrim;
}

client.login(config.botToken);