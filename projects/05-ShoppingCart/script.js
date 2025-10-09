var mobileQty = 0;
var laptopQty = 0;
var headphonesQty = 0;
var watchQty = 0;

function addMobile() {
  mobileQty++;
  updateCart();
}
function addLaptop() {
  laptopQty++;
  updateCart();
}
function addHeadphones() {
  headphonesQty++;
  updateCart();
}
function addWatch() {
  watchQty++;
  updateCart();
}

function changeQty(product, type) {
  if (product === "mobile") {
    if (type === "plus") mobileQty++;
    else mobileQty = mobileQty - 1 < 0 ? 0 : mobileQty - 1;
  }
  if (product === "laptop") {
    if (type === "plus") laptopQty++;
    else laptopQty = laptopQty - 1 < 0 ? 0 : laptopQty - 1;
  }
  if (product === "headphones") {
    if (type === "plus") headphonesQty++;
    else headphonesQty = headphonesQty - 1 < 0 ? 0 : headphonesQty - 1;
  }
  if (product === "watch") {
    if (type === "plus") watchQty++;
    else watchQty = watchQty - 1 < 0 ? 0 : watchQty - 1;
  }
  updateCart();
}

function updateCart() {
  var cartBox = document.getElementById("cartDetails");
  var totalItems = document.getElementById("totalItems");
  cartBox.innerHTML = "";

  var total = mobileQty + laptopQty + headphonesQty + watchQty;

  if (mobileQty > 0) {
    cartBox.innerHTML +=
      "Mobile x " + mobileQty + " (₹" + 15000 * mobileQty + ")" +
      " <button onclick=\"changeQty('mobile', 'minus')\">-</button>" +
      " <button onclick=\"changeQty('mobile', 'plus')\">+</button><br>";
  }

  if (laptopQty > 0) {
    cartBox.innerHTML +=
      "Laptop x " +
      laptopQty +
      " (₹" +
      60000 * laptopQty +
      ")" +
      " <button onclick=\"changeQty('laptop', 'minus')\">-</button>" +
      " <button onclick=\"changeQty('laptop', 'plus')\">+</button><br>";
  }

  if (headphonesQty > 0) {
    cartBox.innerHTML +=
      "Headphones x " +
      headphonesQty +
      " (₹" +
      800 * headphonesQty +
      ")" +
      " <button onclick=\"changeQty('headphones', 'minus')\">-</button>" +
      " <button onclick=\"changeQty('headphones', 'plus')\">+</button><br>";
  }

  if (watchQty > 0) {
    cartBox.innerHTML +=
      "Smartwatch x " +
      watchQty +
      " (₹" +
      3000 * watchQty +
      ")" +
      " <button onclick=\"changeQty('watch', 'minus')\">-</button>" +
      " <button onclick=\"changeQty('watch', 'plus')\">+</button><br>";
  }

  totalItems.innerHTML = total;
}
