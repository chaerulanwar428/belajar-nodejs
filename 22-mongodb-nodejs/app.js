const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'iksan';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log('Koneksi gagal!');
  }

  // pilih database
  const db = client.db(dbName);

  // Menambahkan 1 data ke collection mahasiswa
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama: 'Erik',
  //     email: 'erik@gmail.com',
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('gagal menambahkan data!');
  //     }

  //     console.log(result);
  //   }
  // );

  // Menambahkan banyak data ke collection mahasiswa
  //   db.collection('mahasiswa').insertMany(
  //     [
  //       {
  //         nama: 'Nugy',
  //         email: 'nugy@gmail.com',
  //       },
  //       {
  //         nama: 'iqbal',
  //         email: 'iqbal@gmail.com',
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log('menambahkan data');
  //       }

  //       console.log(result);
  //     }
  //   );

  // menampilkan semua data collection mahasiswa
  // db.collection('mahasiswa')
  //     .find()
  //     .toArray((error, result) => {
  //         console.log(result);
  // });

  // menampilkan data berdasarkan kriteria collection 'mahasiswa'
  // db.collection('mahasiswa')
  //   .find({ _id: ObjectID('6361240160da781cecaf2764') })
  //   .toArray((error, result) => {
  //     console.log(result);
  //   });

  // meungabah 1 data berdasarkan kriteria colecction 'mahasiswa'
  // const updatePromise = db.collection('mahasiswa').updateOne(
  //   {
  //     nama: 'Erik',
  //   },
  //   {
  //     $set: {
  //       nama: 'Erik Doank',
  //     },
  //   }
  // );

  // meungabah banyak data berdasarkan kriteria colecction 'mahasiswa'
  // const updatePromise = db.collection('mahasiswa').updateMany(
  //   {
  //     nama: 'Erik',
  //   },
  //   {
  //     $set: {
  //       nama: 'Erik Doank',
  //     },
  //   }
  // );

  // updatePromise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // menghapus 1 data berdasarkan kriteria colecction 'mahasiswa'
  // db.collection('mahasiswa').deleteOne({
  //   _id: ObjectID('63612536bda7f03224315cd9'),
  // })
  // .then((result) => {
  //   console.log(result)
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  // menghapus banayk data berdasarkan kriteria colecction 'mahasiswa'
  db.collection('mahasiswa')
    .deleteMany({
      nama: 'Erik Doank',
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
