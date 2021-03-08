
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))



//Setting up a path to the formsubmissions.json file
const formPath = path.join(__dirname, '../formsubmissions/formsubmissions.json')

//Setting up the "POST" method route and requesting the name and email.
app.post('/formsubmissions', (req, res) => {
    const contactInfo = {
        name: req.body.name,
        email: req.body.email
    };


    //Reading the file from the path
    fs.readFile(formPath, (err, data) => {
        if (err) {
            console.log(err);
            res.send('Readfile Error!');
        }
        //parsing the json data into a variable, then pushing the contactInfo object into the forms variable.
        const forms = JSON.parse(data)
        forms.push(contactInfo);

        //Writing the file and making the json data into a string.
        fs.writeFile(formPath, JSON.stringify(forms, null, 2), (err) => {
            if (err) {
                console.log(err);
                res.send('Writefile Error');
            }
        })

        res.send('Thank you for registering!');
    })


})

app.use(express.static(path.join(__dirname, '../public')))


app.use((req, res, next) => {
    fs.appendFileSync('log.txt', `${req.url}\n`)
    next();
})

app.listen(3000);










