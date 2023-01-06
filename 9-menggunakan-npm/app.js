// const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('muhamadiksan@gmail.com'));
// console.log(validator.isMobilePhone('081234567', 'id-ID'));
// console.log(validator.isNumeric('081234567'));

// console.log(chalk.italic.black.bgRed('Hello World!'));
const nama = 'Muhamad Iksan';
const pesan = chalk`Lorem, ipsum dolor {bgBlue.black.bold sit amet} consectetur {bgGreen.black.italic adipisicing} elit. Nama saya : ${nama}`;
console.log(pesan);

