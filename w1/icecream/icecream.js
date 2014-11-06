function validateTopping() {

  var form = document.forms["topping"];
  var sprinkles = form["sprinkles"];
  var chocolate = form["chocolate"];
  var strawberry = form["strawberry"];
  var banana = form["banana"];
  var caramel = form["caramel"];
  var message = document.getElementById("message");
  
  function tooMuchTopping() {
    var res = 0;
    if (sprinkles.checked) res++;
    if (chocolate.checked) res++;
    if (strawberry.checked) res++;
    if (banana.checked) res++;
    if (caramel.checked) res++;
    if (res > 3)
      return true;
    else
      return false;
  }

  function toppingTooMessy() {
    return strawberry.checked && caramel.checked;
  }

  function clearMessage() {
    while (message.hasChildNodes()) {
      message.removeChild(message.lastChild);
    }
  }

  function insertMessage(m) {
    var p = document.createElement('p');
    p.textContent = m;
    p.className = "messages";
    message.appendChild(p);
  }
 
  clearMessage();
  if (tooMuchTopping())
    insertMessage("Too much topping. Pick at most 3 different kinds.");
  if (toppingTooMessy())
    insertMessage("Topping is too messy. Please don't mix Strawberry syrup and caramel!");
  if (!tooMuchTopping() && !toppingTooMessy())
    window.alert("Your icecream has been ordered.");
}
