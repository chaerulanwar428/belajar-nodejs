const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(expressLayouts);

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
      title: 'Halaman About' ,
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
      layout: 'layouts/main-layout.ejs',
      title: 'Halaman Contact',
    });
});

app.get('/product/:id', (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
