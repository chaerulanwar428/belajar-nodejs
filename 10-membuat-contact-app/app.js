const contacts = require('./contact.js');

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukan email anda : ', (email) => {
//       resolve(email);
//     });
//   });
// };

const main = async () =>  {
    const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ');
    const email = await contacts.tulisPertanyaan('Masukkan email anda : ');
    const noHP = await contacts.tulisPertanyaan('Masukkan no HP anda : ');

    contacts.simpanContact(nama, email, noHP);
}

main();

// rl.question('Masukkan nama anda : ', (nama) => {
//     rl.question('Masukkan no HP anda : ', (noHp) => {
//         const contact = {nama, noHp};
//         const file = fs.readFileSync('data/contacts.json', 'utf8');
//         const contacts = JSON.parse(file);

//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
//         console.log(contacts);
//         rl.close()
//     })
// })
