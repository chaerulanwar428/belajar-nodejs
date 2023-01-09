const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/iksan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Menambahkan 1 data
// const contact1 = new Contact({
//     nama: 'Yuana Bachtiar',
//     nohp: '0815566778899',
//     email: 'yuanabachtiar@gmail.com'
// });

// contact1.save().then((contact) => console.log(contact));
