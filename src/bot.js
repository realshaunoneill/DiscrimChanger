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
    let x = 0;

    let discrimInterval = setInterval(function () {

        client.user.setUsername(users[x].username, config.userAccountPassword).catch(err => {
            console.error(`Unable to change nickname, Error: ${err.stack}`)
        });
console.log(x);
        if (x % 10 === 0) {
            console.log(`Done trying ${x} usernames! Still going!`);
        }

        if (checkDiscrim()) {
            clearInterval(discrimInterval);
            console.log(`You have reached your desired discriminator!`)
        }

        x++;

    }, config.changeInterval);


}

function checkDiscrim() {
    return client.user.discriminator == config.desiredDiscrim;
}

client.login(config.botToken);