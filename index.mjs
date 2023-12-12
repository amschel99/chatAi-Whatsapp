
import qrcode from "qrcode-terminal"

import { Client } from "whatsapp-web.js";

import dotenv from "dotenv"
dotenv.config()



            
const client = new Client();


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});




client.on("message", async(message)=>{
    
try{

client.sendMessage("hi brodda")

}
catch(e){
console.log(e)
}
    

    
      
} 
)




client.initialize();
