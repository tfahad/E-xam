var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
var userModel = require('../models/user');
const jwt = require('jsonwebtoken')
dotenv.config();
var tool = require('./tool');




   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'edumetrixlearningsolutions@gmail.com',
      pass: 'rhuu jtxj atur mkuw'
    }
  });

   let emailSend = (req, res, next) => {
    transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`=== Server is ready to take messages: ${success} ===`);
        }
    });

    userModel.findOne({ 'email': req.body.email }).then((user) => {
        if (!user) {
            // Email not found, send a response to the frontend
            res.status(404).json({
                success: false,
                message: 'Email does not exist'
            });
        } else {
            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

            // User found, send user details and send the email
            res.status(200).json({
                success: true,
                message: 'User details retrieved successfully',
                user: user
            });

            let mailOptions = {
                from: 'edumetrixlearningsolutions@gmail.com',
                to: req.body.email,
                subject: "Nodemailer API",
                text: `Click the following link to update the password: http://localhost:3001/demo/${user._id}/${token}`
            };

            // Send the email inside the 'findOne' callback
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email successfully sent!")
                    return res.send({ Status: "Success" });
                }
            });
        }
    });
};

// Rest of your code...




    let demo = (req, res) => {
        const {id, token} = req.params
        const password = req.body.password

        jwt.verify(token, "jwt_secret_key", (err, decoded) =>{
            if(err){
                return res.json({Status: "Error with token"})
            }else{
                tool.hashPassword(password)
                .then((hash=>{
                    userModel.findByIdAndUpdate({_id : id}, {password : hash})
                    .then(u => res.send({Status : "Success"}))
                    .catch(err => res.send({Status: err}))
                }))
                .catch(err => res.send({Status: err}))


            }
        })
    }
    
    


    module.exports = { 
       emailSend, demo
    }
  


