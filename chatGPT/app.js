const express = require('express')

const { Configuration, OpenAIApi } = require("openai");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { response } = require('express');

const app = express()
const port = 3000

app.set('view engine', 'ejs')

const configuration = new Configuration({
  apiKey: 'sk-Lvy2XcrmxDo9KjyaX2oVDfURb',
});
const openai = new OpenAIApi(configuration);


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/summary', urlencodedParser, async function (req, res) {
  try {
    const ques = 'can you please summarize the following text in 30 words:'
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ques + "\n\n " + JSON.stringify(req.body.text),
      temperature: 0.7,
      max_tokens: 256
    });
    // response = {
    //   text: completion.data.choices[0].text
    // }
    res.send( JSON.stringify(completion.data.choices[0].text))
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log("err msg ---- ", error.message);
    }
    res.send(JSON.stringify(error));
  }
})

app.listen(port, (req, res) => {
  console.log(`Running on http://localhost:${port}`)
})