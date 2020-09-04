const coded = Buffer.from("rohit").toString('base64');
const decoded = Buffer.from(coded,'base64').toString();
console.log(coded);
console.log(decoded);