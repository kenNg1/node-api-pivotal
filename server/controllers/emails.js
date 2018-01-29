const api_key = 'key-d2d2df0980d3eff66e1b3046e03df6ec';
const domain = 'pivotalsport.com';

const Mailgun = require('mailgun-js'); ({apiKey: api_key, domain: domain});
const Email = require('../models').Email;



//Your sending email address
// const from_who = 'info@pivotalsport.com';


module.exports = {
    sendMail(req,res){
        var data = {
        from: 'Excited User <postmaster@pivotalsport.com>',
        to: 'johann.ruffie@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
      };
       
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
    }
/* sendMail(req,res){
    console.log("oklaaaa ");
    Email = req.body
        
        Mailgun.messages().send(Email, function (err, body) {
            //If there is an error, render the error page
            if (err) {
                res.render('error', { error : err});
                console.log("got an error: ", err);
            }
            //Else we can greet    and leave
            else {
                //Here "submitted.jade" is the view file for this landing page 
                //We pass the variable "email" from the url parameter in an object rendered by Jade
                res.render('submitted', { Email : req.body });
                console.log(body);
            }
        });
    
} */
}