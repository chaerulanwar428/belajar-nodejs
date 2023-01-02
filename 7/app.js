//core module

//file system

const fs = require('fs');

// try {
//   fs.writeFileSync('data/test.txt', 'Hello world secara syncronus');
// } catch (e) {
//   console.log(e);
// }

fs.writeFile('data/test.txt', 'Hello world secara Asynchronus', (e) => {
  console.log(e);
});
