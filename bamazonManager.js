var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});

// prompt user on what thye want to do
function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory(with an inventory count lower than five)",
          "Add to Inventory",
          "Add New Product",
          "Delete A Product"
        ]
    }).then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory(with an inventory count lower than five)":
        viewLowInv();
        break;

      case "Add to Inventory":
        addInv();
        break;

      case "Add New Product":
        addNewproduct();
        break;

      case "Delete A Product":
        deleteProduct();
      break;
      }
    });
}

// lists all available products
function viewProducts() {

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
      runSearch()
    });
  
  }
  
  //shows all inventory between 5 units and 0 units
function viewLowInv(){
    console.log("Listing low inventory products: \n");
    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?";
    connection.query(query, [0, 5], function(err, res) {
      if(res.length === 0){ 
        console.log("No products lower than 5 stock quantity!")
     }
    else{
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
    }
    runSearch()
    });
}

function addInv() {
    var stockquantity;
    var itemID;
    var addquantity;
    addInvInquire();
}

// asks what the user wants to add and how many
function addInvInquire()  {
    inquirer.prompt([
      {
        name: "itemID",
        message: "Add more inventory. Please enter the item ID: "
      }, {
        name: "addquantity",
        message: "How many inventory do you want to add?"
      }
    ]).then(function(answers) {
      itemID = answers.itemID;
      addquantity = parseInt(answers.addquantity)
      logProduct();
    });
  }

function logProduct() {
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function(err, res) {
    stockquantity = res[0].stock_quantity;
    updateProduct(); 
    });
  }

  function updateProduct() {
    console.log("Updating below: \n");
     var query = connection.query(
       "UPDATE products SET ? WHERE ?",
       [
         {
           stock_quantity: stockquantity+addquantity
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
      viewProducts();
   }
   
function addNewproduct()  {
    var itemID;
    var name;
    var dept;
    var price;
    var stock;
  
    console.log("Input the new product information below: "); 
    inquirer.prompt([
      {
        name: "itemID",
        message: "Item ID: "
      }, {
        name: "name",
        message: "Product Name: "
      }, {
        name: "dept",
        message: "Department: "
      }, {
        name: "price",
        message: "Price: "
      } ,{
        name: "stock",
        message: "Stock Quantity: "
      }
    ]).then(function(answers) {
      itemID = answers.itemID;
      name = answers.name;
      dept = answers.dept;
      price = parseInt(answers.price);
      stock = parseInt(answers.stock)

      console.log("Adding a new product...\n");
      var query = connection.query(
        "INSERT INTO products SET ?",
        {
          item_id: itemID,
          product_name: name,
          department_name: dept,
          price: price,
          stock_quantity: stock
        },
        function(err, res) {
          console.log(res.affectedRows + " product inserted!\n");
        }
      );
      console.log(query.sql);
      viewProducts();
    });
  }

function deleteProduct()  {
  var itemIDD;

  console.log("Which product do you want to delete? "); 
  inquirer.prompt([
    {
      name: "itemID",
      message: "Item ID: "
    }
  ]).then(function(answers) {
    itemIDD = answers.itemID;

    console.log("Deleting product below: \n");
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        item_id: itemIDD
      },
      function(err, res) {
        console.log(res.affectedRows + " products deleted!\n");
      }
    );
    viewProducts();
  });
}