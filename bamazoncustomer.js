var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hagrid",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    products();
});

var products = function() {
  var query = 'SELECT * FROM products';
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].itemID + " || Product: " + res[i].productName + " || Department: " + res[i].productDepartment + " || Price: " + res[i].price + " || Stock: " + res[i].stockQuantity);
      }
      items();
    });
};

var items = function() {
    inquirer.prompt({
        name: "item",
        type: "input",
        message: "What is the ID of the item you are interested in?",
        // validate: function(value) {
        //     if (isNaN(value) == false) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
      }, {
             name: "quantity",
             type: "input",
             message: "How many would you like to buy?",
            //  validate: function(value) {
            //      if (isNaN(value) == false) {
            //          return true;
            //      } else {
            //          return false;
            //      }
            //  }
    }).then(function(answer) {
      var query = 'SELECT * FROM products WHERE id=' + answer.quantity;
       connection.query(query, function(err, res) {
         if (answer.quantity <= res) {
           for (var i = 0; i < res.length; i++) {
               console.log("We have " + res[i].stockQuantity + " " + res[i].productName + ".");
             }
           } else {
             console.log("Not enough of this product in stock.");
           }
           products();
       });
   });
};
