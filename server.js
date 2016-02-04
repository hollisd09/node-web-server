'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.locals.title = 'The Super Cool App';

app.use(bodyParser.urlencoded({extended: false}));

//routes
app.get('/', (req, res) => {
  res.render('index', {
    date: new Date()
  });
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.post('/contact', (req, res) => {
  console.log('req.body ======', req.body)
  const name = req.body.name;
  res.send(`<h1>Thanks for contacting us, ${name}!</h1>`);
});

app.get('/hello', (req, res) => {
  const name = req.query.name;
  const msg = `<h1>Hello ${name}!</h1><h2>Goodbye ${name}!</h2>`;

  res.writeHead(200, {
    'content-Type': 'text/html'
  });

  const events = [];

  // chunk response by character
  msg.split('').forEach((char, i) => {
   setTimeout(() => {
     res.write(char);
       events.pop(events);
   }, 200 * i);

   events.push(events);
  });

  // wait for all characters to be sent
  setInterval(() => {
    if (!events.length) {
      res.end()
    };
  }, 1000);
});

app.get('/random.:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

  res.sent(getRandomInt(+min, +max).toSTring());
});

app.get('/cal', (req, res) => {
  const month = require('node-cal/lib/month');
  console.log('MONTH>>>>', month);
});

app.get('/secret', (req, res) => {
  res
    .status(403)
    .send('Access Denied');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});

