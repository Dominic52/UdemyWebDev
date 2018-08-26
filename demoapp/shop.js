var faker = require('faker');

console.log(
"============================\nWelcome To My Snphop\n==========================");

for (var i = 0; i < 10; i++){
    var adj = faker.commerce.productAdjective();
    var mat = faker.commerce.productMaterial();
    var name = faker.commerce.product();
    var price = faker.commerce.price();
    console.log(adj + " " + mat + " " + name + " - $" + price);
}