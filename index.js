const express = require('express');
const cors = require('cors');
const https = require('https');

var app = express();

var  version = 'v16.0'
var  phone_id = "122311257521495"
var  recipient_phone = "573183833578"

var bearerToken = "EABYrDtCNih8BAPeJssksQvU6iXZAZCMztemPpFPvTWfDei8kyRtRx8NifwCxSvAzi8kMRUk6XCpKZCPwSeOiqZBVhYYLCCWgj4q8kBcsdbZCqXSaNOGxl3qMq9ZCoRsTZCvuxMZCcoZCn0KRMV6dC3nddFcbVVlWLrsZBiyiApebsJ8f509SfrAM68KkgyqCxc2P24XunWaxCenoNq0m0VZA8joa6t63aU0vzcZD";

var options = {
  method: 'POST',
  hostname: "graph.facebook.com",
  path: `/${version}/${phone_id}/messages`,
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  }
};

app.use(cors());
app.use(express.json());

app.get("/sendTemplate", (req, res) => {
    const data = {
      messaging_product: 'whatsapp',
      to: recipient_phone,
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      }
    };
  
    const request = https.request(options, (response) => {
      let responseData = '';
  
      response.on('data', (chunk) => {
        responseData += chunk;
      });
  
      response.on('end', () => {
        console.log(responseData);
        res.send(responseData); // Enviar la respuesta al cliente
      });
    });
  
    request.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error en la solicitud');
    });
  
    request.write(JSON.stringify(data));
    request.end();
});


app.post("/sendMessage", (req, res) => {
    const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: req.body.message.number,
        type: "text",
        text: { 
        preview_url: false,   
        body: req.body.message.message
        }
    }
    
    const request = https.request(options, (response) => {
      let responseData = '';
  
      response.on('data', (chunk) => {
        responseData += chunk;
      });
  
      response.on('end', () => {
        console.log(responseData);
        res.send(responseData); // Enviar la respuesta al cliente
      });
    });
  
    request.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error en la solicitud');
    });
  
    request.write(JSON.stringify(data));
    request.end();
});


app.listen(3000, ()=> {
    console.log('Run Server');
})