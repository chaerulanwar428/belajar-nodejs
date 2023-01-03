const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('chaeerul@gmail.com'));
// console.log(validator.isMobilePhone('08231313131','id-ID'));
// console.log(validator.isNumeric('10054542'));

// console.log(chalk.bgBlue.black('Hello wolrd!'));
const nama = 'Chaerul';
const pesan = chalk`lorem, ipsum tahak {bgRed.bold.black lik hsjai} lalain kiki {bgGreen.italic.black efej kaka} poin. Nama saya : ${nama}`;

console.log(pesan);
