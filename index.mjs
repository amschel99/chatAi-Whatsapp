
import qrcode from "qrcode-terminal"
import { Configuration,OpenAIApi } from "openai";
import { Client } from "whatsapp-web.js";

import dotenv from "dotenv"
dotenv.config()



            
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
       
        n:'1'
      });
      return response.data.choices[0].text;
  }

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});




client.on("message", async(message)=>{
    
try{
const answer=await askAi(message.body)
client.sendMessage(message.from, answer)

}
catch(e){
console.log(e)
}
    

    
      
} 
)




client.initialize();
