// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin';
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp();

const db = admin.firestore();

// import * as sgmail from '@sendgrid/mail'
const sgmail = require('@sendgrid/mail')

const API_keys =  functions.config().sendgrid.key
const Temp_Id = functions.config().sendgrid.template

sgmail.setApiKey(API_keys)

exports.welcomeEmail = functions.auth.user().onCreate(user=>{
    const msg = {
        to:user.email,
        from:'dipakpatil2615@gmail.com',
        templateId:Temp_Id,
        dynamic_template_data:{
            name:'User'
        }
    }
    return sgmail.send(msg)
})