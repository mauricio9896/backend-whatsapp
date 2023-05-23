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

app.listen(3000, () => {
  console.log("Run Server");
});
