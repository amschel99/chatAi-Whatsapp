const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");



require('dotenv').config()

const { Client } = require('whatsapp-web.js');

            
const client = new Client();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const askAi= async (prompt)=>{
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["##"]
      });
      return response.data.choices[0].text;
  }

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});




client.on("message", (message)=>{

    function yourFunction() {
        return new Promise((resolve, reject) => {
            askAi(message.body)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    yourFunction()
    .then(response => {
        client.sendMessage(response)
    })
    .catch(error => {
        client.sendMessage(`an error occured`)
    });
      
    
})




client.initialize();
