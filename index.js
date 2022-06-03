const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { format } = require('date-fns');
const port = process.env.PORT || 5001;
require('dotenv').config()
//middle wire
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5hhtk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        await client.connect();
        const singleChat = client.db("anonChat").collection("singleChat");
        const usersCollection = client.db("anonChat").collection("users");
        console.log('DB Connected');

        //get api starts Here
        app.get('/singleChat', async (req, res) => {
            const query = {}

            res.send(result)
        });

        //Post request starts here

        // Check anonymous userName
        app.put('/anonymousRegister/checkUserName/:userName', async (req, res) => {
            const userName = req.params.userName;
            console.log(userName);

            const searchUsername = await usersCollection.findOne({ userName: userName })
            let userNameValid;
            if (searchUsername !== null) {
                userNameValid = false;
                res.status(409).send({ message: "Username is taken try another", userNameValid })
            }
            else {
                userNameValid = true
                res.status(200).send({ userNameValid })

            }

        });

        //Make Anonymous user
        app.put('/anonymousRegister/:userName', async (req, res) => {
            const userName = req.params.userName;
            const password = req.body.password;
            console.log("Pass", password);
            const date = new Date();
            const formatedDate = format(date, "PP");
            const insertDoc = {
                userName,
                password,
                role: 'anonymous',
                accountCreated: formatedDate
            }
            const result = await usersCollection.insertOne(insertDoc);
            res.status(200).send(result)
        });
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("Server Working")
})

app.listen(port, () => {
    console.log('Listening to port', port,);
})

