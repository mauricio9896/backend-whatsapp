const express = require("express");
const cors = require("cors");
const https = require("https");

var app = express();

var version = "v16.0";
var phone_id = "122311257521495";

var bearerToken =
  "EABYrDtCNih8BAPeJssksQvU6iXZAZCMztemPpFPvTWfDei8kyRtRx8NifwCxSvAzi8kMRUk6XCpKZCPwSeOiqZBVhYYLCCWgj4q8kBcsdbZCqXSaNOGxl3qMq9ZCoRsTZCvuxMZCcoZCn0KRMV6dC3nddFcbVVlWLrsZBiyiApebsJ8f509SfrAM68KkgyqCxc2P24XunWaxCenoNq0m0VZA8joa6t63aU0vzcZD";

var options = {
  method: "POST",
  hostname: "graph.facebook.com",
  path: `/${version}/${phone_id}/messages`,
  headers: {
    Authorization: "Bearer " + bearerToken,
    "Content-Type": "application/json",
  },
};

app.use(cors());
app.use(express.json());

app.post("/sendTemplate", (req, res) => {

  const obj = JSON.parse(req.body.template);

  const data = {
    messaging_product: "whatsapp",
    to: obj.number,
    type: "template",
    template: {
      name: obj.name,
      language: { code: obj.language },
      components: [{
        type:"body",
        parameters: obj.components[0].parameters,
      }]
    },
  };

  const request = https.request(options, (response) => {
    let responseData = "";

    response.on("data", (chunk) => {
      responseData += chunk;
    });

    response.on("end", () => {
      console.log(responseData);
      res.send(responseData); // Enviar la respuesta al cliente
    });
  });

  request.on("error", (error) => {
    console.error(error);
    res.status(500).send("Error en la solicitud");
  });

  request.write(JSON.stringify(data));
  request.end();
});

app.post("/sendMessage", (req, res) => {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: req.body.number,
    type: "text",
    text: {
      preview_url: false,
      body: req.body.message,
    },
  };

  const request = https.request(options, (response) => {
    let responseData = "";

    response.on("data", (chunk) => {
      responseData += chunk;
    });

    response.on("end", () => {
      console.log(responseData);
      res.send(responseData); // Enviar la respuesta al cliente
    });
  });

  request.on("error", (error) => {
    console.error(error);
    res.status(500).send("Error en la solicitud");
  });

  request.write(JSON.stringify(data));
  request.end();
});

app.get("/conversations", (req, res) => {
  const chats = [
    {
      id: '1',
      number: '573183833578',
      photo:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
      name: 'Mauricio Buitrago',
      date: '3 Mar',
      message: 'Esto es un message',
      state: true,
      amount_message: 4,
    },
    {
      id: '2',
      number: '573185454867',
      photo:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
      name: 'Brayan Cadavid',
      date: '13 Mar',
      message: 'Esto es un message',
      state: true,
      amount_message: 4,
    },
    {
      id: '3',
      number: '573183833578',
      photo:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Luis Vera ',
      date: '3 Mar',
      message: 'Esto es un message de prueba',
      state: true,
      amount_message: 4,
    },
    {
      id: '4',
      number: '573114744623',
      photo:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg',
      name: 'Juan Pablo Murcia',
      date: '3 Mar',
      message: 'Esto es un message de prueba',
      state: true,
      amount_message: 24,
    },
  ];
  res.send(chats);
});

app.get("/templates", (req, res) => {
  templates = [
    {
      id: '1',
      name: 'hello_world',
      number: '573183833578',
      language: 'en_US',
      components:[
        {
          type: "body",
          parameters:[]
        }
      ],
      message: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.'
    },
    {
      id: '2',
      name: 'first_message_test',
      number: '573183833578',
      language: 'es_MX',
      components:[
        {
          type: "body",
          parameters:[]
        }
      ],
      message: 'Hola Mauricio , espero te encuentres muy bien Me gustaría felictarte por todo el conocimiento que has estado adquiriendo'
    },
    {
      id: '3',
      name: 'second_template',
      number: '573183833578',
      language: 'es',
      components:[{
        type: "body",
        parameters:[
          {
            type: "text",
            text: "MAURICIO BUITRAGO"
          },
          {
            type: "text",
            text: "SEGUNDA VARIABLE"
          },
          {
            type: "text",
            text: "TERCERA VARIABLE"
          }
        ]
      }],
      message: 'hola {{1}} , esta es una plantilla de prueba con variable, {{2}} segunda variable y por ultimo {{3}} tercera variable'
    }
  ];

  res.send(templates);
});

app.listen(3000, () => {
  console.log("Run Server");
});
