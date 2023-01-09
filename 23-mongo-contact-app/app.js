const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

require('./utils/db');
const Contact = require('./model/contacts');

app.set('view engine', 'ejs');
app.use(expressLayouts); // third party module
app.use(express.static('public')); // Built in middleware
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());


// Halaman Home
app.get('/', (req, res) => {
  // res.sendFile('./index.html', { root: __dirname });
  const mahasiswa = [
    {
      nama: 'Muhamad Iksan',
      email: 'muhamadiksan@gmail.com',
    },
    {
      nama: 'Yuana Bachtiar',
      email: 'yuanabachtiar@gmail.com',
    },
    {
      nama: 'Saepul Bahri',
      email: 'saepulbahri@gmail.com',
    },
  ];

  res.render('index', {
    layout: 'layouts/main-layout.ejs',
    nama: 'Achmad Ghozali',
    title: 'Halaman Home',
    mahasiswa,
  });
});

// Halaman About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout.ejs',
    title: 'Halaman About',
  });
});

// Halaman Contact
app.get('/contact', async (req, res) => {
    // Contact.find().then((contact) => {
    //     res.send(contact);
    // })

  const contacts = await Contact.find();

  res.render('contact', {
    layout: 'layouts/main-layout.ejs',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg'),
  });
});

// halaman detail
app.get('/contact/:nama', async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama })

  res.render('detail', {
    layout: 'layouts/main-layout.ejs',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
