const express = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const { request } = require('express')

const app = express()
const port = 3000
require('dotenv').config()
app.use(bodyParser.json())

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


if (process.env.NODE_ENV = 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html') )
}

const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
})

app.post('/razorpay', async (req, res) => {
    
	const payment_capture = req.body.payment_capture
	const amount = req.body.amount
    const currency = req.body.currency
    const receiptId = shortid.generate()
    
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
           key:process.env.RAZORPAY_API_KEY
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

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
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
    var request = require('request');
    var options = {
        amount:amount
    }
    request({
    method: 'POST',
    url: 'https://' + process.env.RAZORPAY_API_KEY + ':' + process.env.RAZORPAY_SECRET_KEY +'@api.razorpay.com/v1/payments/' + payment_id + '/refund',
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


app.post('/send_email/welcome', async (req, res)=>{

    let useremail = req.body.email
    let username = req.body.name
    const msg = {
        to: useremail,
        from: 'dipakpatil2615@gmail.com',
        templateId:process.env.SENDGRID_WELCOME_TEMPLATE_ID,
        dynamic_template_data:{
            name:username
        },
    }
      
      sgMail.send(msg)

      res.json({
          successful:true
      })

})

app.listen(3000, () => console.log(`Example app listening on port ${port}!`))






