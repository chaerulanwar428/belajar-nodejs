const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {body, validationResult, check} = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.use(methodOverride('_method'));

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

// Halaman tambah contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout.ejs',
    title: 'Form Tambah Data Contact',
  });
});

// Halaman proses tambah data contact
app.post(
  '/contact',
  [
    body('nama').custom( async (value) => {
      const duplikat = await Contact.findOne({ nama: value});
      if (duplikat) {
        throw new Error('Nama contact sudah digunakan');
      }

      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        title: 'Halaman About',
        layout: 'layouts/main-layout.ejs',
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body).then((error, result) => {
        // kirimkan flash message
        req.flash('msg', 'Data contact berhasil ditambahkan!');
        res.redirect('/contact');
      })
    }
  }
);

// Halaman detail
app.get('/contact/:nama', async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama })

  res.render('detail', {
    layout: 'layouts/main-layout.ejs',
    title: 'Halaman Detail Contact',
    contact,
  });
});

// Halaman Delete
// app.get('/contact/delete/:nama', async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   if (!contact) {
//     res.status(404);
//     res.send('<h1>404</h1>');
//   } else {
//     Contact.deleteOne({ nama: req.params.nama}).then((result) => {
//       req.flash('msg', 'Data contact berhasil dihapus!');
//       res.redirect('/contact');
//     })
//   }
// });


app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama}).then((result) => {
      req.flash('msg', 'Data contact berhasil dihapus!');
      res.redirect('/contact');
    })
})

// Halaman Edit
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('edit-contact', {
    layout: 'layouts/main-layout.ejs',
    title: 'Form Ubah Data Contact',
    contact,
  });
});


// halaman proses edit
app.put('/contact', [
  body('nama').custom( async (value, { req }) => {
    const duplikat = await Contact.findOne({nama : value});
    if(req.body.oldNama !== value && duplikat) {
      throw new Error('Nama contact sudah digunakan');
    }

    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(), 
  check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.render('edit-contact', {
      title: 'Halaman Ubah Data Contact',
      layout: 'layouts/main-layout.ejs',
      errors: errors.array(),
      contact: req.body
    });
  } else {
    Contact.updateOne(
      { _id: req.body._id },
      {
        $set: {
          nama: req.body.nama,
          nohp: req.body.nohp,
          email: req.body.email
        }
      }
      ).then((result) => {
        req.flash('msg', 'Data contact berhasil diubah!')
        res.redirect('/contact');
      })
  }
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
