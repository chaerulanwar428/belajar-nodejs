const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!')
    );
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('Email tidak valid!'));
      return false;
    }
  }

  // cek No Hp
  if (!validator.isMobilePhone(noHP, 'id-ID')) {
    console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold('Terimakasih telah memasukkan data'));
};


module.exports = { simpanContact, listContact, detailContact, deleteContact };
