const express = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const { request } = require('express')
const app = express()
const port = 3000
require('dotenv').config({ path: '../.env' })
app.use(bodyParser.json())
const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);
const razorpay = new Razorpay({
	key_id: process.env.VUE_APP_RAZORPAY_API_KEY,
    key_secret: process.env.VUE_APP_RAZORPAY_SECRET_KEY,
})

app.post('/razorpay', async (req, res) => {
    
	const payment_capture = req.body.payment_capture
	const amount = req.body.amount
    const currency = req.body.currency
    const receiptId = shortid.generate()
    const name = req.body.name
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    
	const options = {
		amount: amount * 100,
        currency,
        receipt: receiptId,
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
        res.json({
           id:response.id,
           key:process.env.VUE_APP_RAZORPAY_API_KEY
        })
	} catch (error) {
		console.log(error)
	}
})
app.post('/razorpay/verification', async (req, res) => {
    
    var razorpay_order_id = req.body.razorpay_order_id
    var razorpay_payment_id = req.body.razorpay_payment_id;
    var razorpay_signature = req.body.razorpay_signature; 

	const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', process.env.VUE_APP_RAZORPAY_SECRET_KEY)
    shasum.update(razorpay_order_id + "|" + razorpay_payment_id)
    const generated_signature = shasum.digest('hex')
    
    if (generated_signature == razorpay_signature) {
        res.json({
            successful: true
        })
    }
    else{
        res.json({
            successful: false
        })
    }
})

app.post('/cancel_order', async (req, res) => {
    var payment_id = req.body.payment_id
    var amount = req.body.amount * 100
    console.log(payment_id, amount);
    var request = require('request');
    var options = {
        amount:amount
    }
    request({
    method: 'POST',
    url: 'https://' + process.env.VUE_APP_RAZORPAY_API_KEY + ':' + process.env.VUE_APP_RAZORPAY_SECRET_KEY +'@api.razorpay.com/v1/payments/' + payment_id + '/refund',
    json: true,
    body: options,
    }, function (error, response, body) {
        // console.log('Status:', response.statusCode);
        // console.log('Headers:', JSON.stringify(response.headers));
        // console.log('Response:', body);
        if (body.id) {
            res.json({
                id:body.id
            }) 
        }
        else{
            res.json({
                id:null
            })
        }  
    });

})
app.listen(3000, () => console.log(`Example app listening on port ${port}!`))






