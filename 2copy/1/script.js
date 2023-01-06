// function getData(id) {
//     // let nama = '';
//     // if(id === 1) {
//     //     nama = 'Iksan'
//     // } else {
//     //     nama = 'Muhamad'
//     // }
//     let nama = id === 1 ? 'Iksan' : 'Muhamad';
//     return {id, nama}
// }


// // synchronous

// const dataSatu = getData(1);
// console.log(dataSatu);

// const dataDua = getData(2);
// console.log(dataDua);

// const halo = 'Hello World';
// console.log(halo);


function getData(id, cb) {
    const waktu = id === 1 ? '3000' : '2000';
    setTimeout(() => {
        const nama = id === 1 ? 'Iksan' : 'Muhamad';
        cb({id, nama});
    }, waktu)
}


// asynchronous

const dataSatu = getData(1, (hasil) => {
    console.log(hasil)
});

const dataDua = getData(2, (hasil) => {
  console.log(hasil);
});

const halo = 'Hello World';
console.log(halo);