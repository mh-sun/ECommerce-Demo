
let json = require('./db.json')
json.products.forEach(p=>{
    console.log(p.image);
    // download(p.image)
})