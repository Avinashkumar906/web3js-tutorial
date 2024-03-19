const express = require('express');
const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require("@solana/web3.js")
const app = express()

// const connection = new Connection(web3.clusterApiUrl("devnet"),'confirmed');
// body parser to get form body
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies 

// Setting template engine
app.set('view engine', 'ejs');

// getting w3b3 connection 


app.get('/', (req, res) => {
    res.render('home', { data: undefined });
})

app.post('/airdrop', (req, res) => {
    let connection;
    const publicKey = new PublicKey(req.body.publickey);
    const solRequested = LAMPORTS_PER_SOL * (+req.body.lamport); //
    const environment = req.body.environment;
    // Creating connection to solana.
    connection = new Connection(clusterApiUrl(environment), 'confirmed');
    // Airdroping SOL
    connection.requestAirdrop(publicKey, solRequested)
        .then((transactionHash) => {
            console.log("Success=> ", transactionHash);
            res.status(200).send({ data: transactionHash, type: 'success' })
        })
        .catch((errorObject) => {
            console.log("Error=> ", errorObject)
            res.status(400).send({ data: errorObject, type: 'error' })
        });
})


app.listen(3000, () => console.log('App is spinned up!'))