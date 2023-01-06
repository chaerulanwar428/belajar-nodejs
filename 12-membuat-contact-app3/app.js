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
}).demandCommand();

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no Hp contact',
  handler() {
    listContact();
  }
})

yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  }
});

yargs.command({
  command: 'delete',
  describe: 'Menghapus detail contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
