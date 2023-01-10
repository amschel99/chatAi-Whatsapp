const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
    if(message.body==="hi"||"hello")
	client.sendMessage(message.from, 'Hello, welcome to the chatgpt whatsapp bot.Ask any question and I will do my best to provide you with answers. I was developed by  the open Ai team and I have been trained using large datasets to understand human languange. The node JS server that allows you to interact with the me here on whatsapp  was developed by amschel. More about him at https://amschel.tech');
});


client.initialize();
