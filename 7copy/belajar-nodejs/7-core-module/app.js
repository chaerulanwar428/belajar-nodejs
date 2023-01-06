// Core Module
// File System
const fs = require('fs');

// menuliskan string ke file (synchronous)
// fs.writeFileSync('test.txt', 'Hello World secara synchronous!');

// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara synchronous!');
// } catch(err) {
//     console.log(err);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous!', (err) => {
//     console.log(err);
// });

// membaca string file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca string (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan no HP anda : ', (noHp) => {
        const contact = {nama, noHp};
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
        console.log(contacts);
        rl.close()
    })
})
