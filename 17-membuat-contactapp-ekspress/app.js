const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public')); // Built in middleware
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

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

app.get('/about', (req, res) => {
    res.render('about', {
      layout: 'layouts/main-layout.ejs',
      title: 'Halaman About',
    });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
    res.render('contact', {
      layout: 'layouts/main-layout.ejs',
      title: 'Halaman Contact',
      contacts,
      msg: req.flash('msg')
    });
});

app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if(duplikat) {
      throw new Error('Nama contact sudah digunakan');
    }

    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(), 
  check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    res.render('add-contact', {
      title: 'Halaman About',
      layout: 'layouts/main-layout.ejs',
      errors: errors.array()
    });
  } else {
    addContact(req.body)
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan!')
    res.redirect('/contact');
  }
});

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout.ejs',
    title: 'Form Tambah Data Contact',
  });
});

app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  if(!contact) {
    res.status(404);
    res.send('<h1>404</h1>')
  } else {
    deleteContact(contact);
  }
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout: 'layouts/main-layout.ejs',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
