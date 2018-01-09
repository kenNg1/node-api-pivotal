const Mailgun = require('mailgun-js');

const api_key = 'key-d2d2df0980d3eff66e1b3046e03df6ec';

//Your domain, from the Mailgun Control Panel
const domain = 'pivotalsport.com';

//Your sending email address
const from_who = 'info@pivotalsport.com';


module.exports = {
sendMail(req,res){
    const mailgun = new Mailgun({apiKey: api_key, domain: domain});
    
    const data = req.body
        /* {
        //Specify email data
          from: from_who,
        //The email to contact
          to: req.params.mail,
        //Subject and text data  
          subject: 'Hello from Mailgun',
          html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
        } */ 
    
        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data, function (err, body) {
            //If there is an error, render the error page
            if (err) {
                res.render('error', { error : err});
                console.log("got an error: ", err);
            }
            //Else we can greet    and leave
            else {
                //Here "submitted.jade" is the view file for this landing page 
                //We pass the variable "email" from the url parameter in an object rendered by Jade
                res.render('submitted', { email : req.body });
                console.log(body);
            }
        });
    
}
}