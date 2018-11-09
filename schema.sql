DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

-- table for the products
CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  ProductName varchar(50) NOT NULL,
  DepartmentName varchar(50) NOT NULL,
  Price DECIMAL(4,2) NOT NULL,
  StockQuantity int NOT NULL,
  product_sales DECIMAL(11,2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Playstation',
'Electronics',
399.99,
200);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'keyboard',
'Electronics',
29.99,
800);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Shot Glass',
'Home',
19.99,
100);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Record Player',
'Electronics',
249.99,
150);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Toy car',
'Toys',
15.00,
400);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Leeroy Jenkins T-shirt',
'Clothing',
25.99,
100);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'socks (pack of 25)',
'Clothing',
24.99,
500);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Gloves',
'Clothing',
29.99,
120);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Large Dog cage',
'Pets',
149.99,
70);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (
'Snuggie',
'Home',
29.99,
600);

-- table for the departments
CREATE TABLE Departments(
Department_Id INTEGER AUTO_INCREMENT,
Department_name varchar(50) NOT NULL,
Over_head_costs DECIMAL(11,2) NOT NULL,
product_sales INTEGER NULL,
PRIMARY KEY(Department_Id)
);

INSERT INTO Departments (Department_name, Over_head_costs, product_sales) VALUES (
'Clothing',
10000,
0
);

INSERT INTO Departments (Department_name, Over_head_costs, product_sales) VALUES (
'Pets',
10000,
0
);

INSERT INTO Departments (Department_name, Over_head_costs, product_sales) VALUES (
'Home',
20000,
0
);

INSERT INTO Departments (Department_name, Over_head_costs, product_sales) VALUES (
'Electronics',
50000,
0
);

INSERT INTO Departments (Department_name, Over_head_costs, product_sales) VALUES (
'Toys',
25000,
0
);