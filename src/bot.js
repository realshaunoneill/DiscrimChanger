const Discord = require('discord.js');
const client = exports.client = new Discord.Client();

const config = require('../config.json');

client.once('ready', () => {
    console.log(`Discriminator changer is running!`);

    client.user.setGame(`Changing my discriminator to ${config.desiredDiscrim}`);

    changeDiscriminator();
});

function changeDiscriminator() {

    let x = 0;

    let discrimInterval = setInterval(function () {

        client.user.setUsername(fetchUsername(), config.userAccountPassword).catch(err => {
            console.error(`Unable to change nickname, Error: ${err.stack}`)
        });

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

function fetchUsername() {
    client.users.array().forEach(users => {
        if (users.username !== client.user.username && users.discriminator === client.user.discriminator){
            return users.username;
        }
    })
}

function checkDiscrim() {
    return client.user.discriminator == config.desiredDiscrim;
}

client.login(config.botToken).catch(err => {console.error(err.stack)});