var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Buddy#67",
  database: "bamazon"
});

var itemID;
var orderquantity;
var stockquantity;
var currentCost;
var totalCost = 0;
var totalSale;

connection.connect(function(err) {
  if (err) throw err;
  readProducts();
});

// lists out all of the inventory
function readProducts() {
  console.log("Listing all available products: \n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

  for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " || Product Name: " +
          res[i].product_name +
          " || Department Name: " +
          res[i].department_name +
          " || Price: " +
          res[i].price +
          " || Stock Quantity: " +
          res[i].stock_quantity
      );
    }
    purchase();
  });
}

// function where the customer decides what they are ordering
function purchase() {

  inquirer.prompt([
    {
      name: "itemID",
      message: "What is the item ID of the product you are ordering?"
    }, {
      name: "quantity",
      message: "How many are you ordering?"
    }
  ]).then(function(answers) {
    
    itemID = answers.itemID;
    orderquantity = parseInt(answers.quantity);
    orderProduct();
    totalSale = 0;
  });
}

function orderProduct() {
  
  var query = connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function(err, res) {
  stockquantity = res[0].stock_quantity;
  totalSale = res[0].product_sales;
  price = res[0].price;

  

  updateProduct();
 
  });

}

// after the customer orders something this function asks if they want ot order more or quit
function startOver() {
  inquirer
    .prompt( {
      type: "confirm",
      message: "Do you want to order more products? ",
      name: "confirm",
      default: false
    },)
    .then(function(answer) {
      if (answer.confirm) {
        purchase();
      }
      else {
        console.log("Your total cost is: $", totalCost);
        connection.end();
      }
    });
}

// updates the stock and shows price of order
function updateProduct() {
 console.log("Updating below: \n");
 if((stockquantity-orderquantity)>0){
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stockquantity-orderquantity,
        product_sales: totalSale+=(price * orderquantity)
      },
      {
        item_id: itemID
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
    }
  );

   console.log(query.sql);
   calculateCost();
   startOver();
}

  else{
 console.log("Insufficient quantity!")
 console.log("Your total cost is: $", totalCost);
 connection.end();
  }
} 

//calculating cost
function calculateCost() {
  currentCost = price * orderquantity;
  totalCost+=currentCost;
  console.log("Your current cost is: $", currentCost);
  console.log("Your total cost is: $", totalCost);
  console.log("The " + itemID + " product total sale now is: $" + totalSale)
}