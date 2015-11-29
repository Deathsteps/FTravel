# FTravel
Travel Products Booking Application.

## Play

Run this project, do as followings:

* Start Mongodb
* Switch to the project directory, and type `npm start` in shell.
* Visit `http://localhost:3000/product`

## Function List

The main pages which a user interact with are the followings: 

### Product 

* **/product** : list products, show advertisements
* **/product:id**	: show a product by id
* **/route:productId** : show product price calendar

## ChangeLog

Due to the upgrade of React and Node, most of the dependent modules are outdate, and at same time new better practices emerged. So I decied to upgrade the whole system to embrace the new [Node](https://nodejs.org/en/docs/) and the better [React](http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html). As we know some significant changes happened in node v4.0.0, many third party modules are not fast enough to response to it, so I branch a stable version of this project to focus on the main features. Checkout `stable_ReactV0.13.3_NodeV0.10.32` and enjoy it yourself.

