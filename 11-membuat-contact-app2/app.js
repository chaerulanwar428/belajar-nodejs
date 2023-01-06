const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contact');

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    noHP: {
      describe: 'No Hp',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP)
  },
});

yargs.parse();
