/** @format */

const express = require("express");
const router = express.Router();
const { con } = require("../models/index");

router.get("/", async function (req, res, next) {
  let productList = [];
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    productList = result;
    console.log("prod--" + JSON.stringify(productList));

    res.render("products", {
      title: "Product List",
      items: productList,
    });
  });
});

router.get("/detail/:id", function (req, res, next) {
  // res.send(req.params.id);
  let prodDet = {};
  con.query(
    `SELECT * FROM products WHERE id =${req.params.id}`,
    function (err, result, fields) {
      if (err) throw err;
      if (result && result.length > 0) prodDet = result[0];
      console.log("prod--" + JSON.stringify(prodDet));
      res.render("productDetail", {
        title: "Product Detail",
        product: prodDet,
      });
    }
  );
});

router.get("/addToCart/:id", function (req, res, next) {
  let prodDet = [];

  con.query(
    `SELECT * FROM products WHERE id =${req.params.id}`,
    function (err, result, fields) {
      if (err) throw err;
      prodDet = result;
      console.log("result" + JSON.stringify(result));
      var sql = `INSERT INTO carts (name, price) VALUES ('${prodDet[0].name}',${prodDet[0].price})`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/cart");
      });
    }
  );
});

module.exports = router;
