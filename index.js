require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const { exec } = require('child_process');


const app = express();
app.use(cors({origin: '*'}));
  
app.use(express.json());
app.use(bodyParser.json()); 


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 8000;


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post("/simplify", async (req, res) => {
    console.log(req.body);
    const messages = req.body.messages;
    try {
      if (messages == null) {
        throw new Error("Uh oh, no messages were provided");
      }
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages,
        temperature: 0.2,
      });
      const completion = response.data.choices[0];
      return res.status(200).json({
        success: true,
        message: completion.message.content,
      });
    } catch (error) {
        console.error("Error fetching refined question:", error); // change this line
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
);



app.post("/solve", async (req, res) => {
    console.log(req.body);
    const messages = req.body.messages;
    try {
      if (messages == null) {
        throw new Error("Uh oh, no question was provided");
      }
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages,
        temperature: 0.2,
      });
      const completion = response.data.choices[0];
      return res.status(200).json({
        success: true,
        message: completion.message.content,
      });
    } catch (error) {
        console.error("Error fetching refined question:", error); // change this line
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
);


app.post('/run-python', (req, res) => {
    console.log('Received request to run Python code');

    // You can add validation and sanitization of the Python code here
    const pythonCode = req.body.code;

    fs.writeFile('/tmp/temp.py', pythonCode, function(err) {
        if(err) {
            console.error('Error writing to temporary file', err);
            return res.json({ success: false, message: err.toString(), output: null });
        }
        console.log('Python code written to file. About to run Python code');

        exec(`/opt/homebrew/bin/python3 /tmp/temp.py`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error running Python code:', error);
                return res.json({ success: false, message: error.message, output: null });
            }

            console.log('Python code executed successfully. Results:', stdout);
            res.json({ success: true, message: "Code executed successfully", output: stdout });
        });
    });
});


app.listen(port, () => console.log(`Server is running on port ${port}!!`));