let express = require("express");
let router = express.Router();
const { con } = require("../models/index");

router.get("/", function (req, res, next) {
  let cartList = [];
  con.query(
    "SELECT ID, name, price, SUM(price) as totalPrice, COUNT(ID) as count FROM carts group by name",
    function (err, result, fields) {
      if (err) throw err;
      cartList = result;
      console.log(JSON.stringify(result));
      if (result && result.length > 0) {
        const total = cartList.reduce((a, b) => a + Number(b.totalPrice), 0);
        res.render("cart", {
          title: "Cart Page",
          items: cartList,
          total: total,
        });
      }
    }
  );
});

module.exports = router;
