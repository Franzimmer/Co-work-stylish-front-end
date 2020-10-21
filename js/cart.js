app.init = function () {
  TPDirect.setupSDK(
    "12348",
    "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
    "sandbox"
  );
  TPDirect.card.setup({
    fields: {
      number: {
        element: "#card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        element: "#card-expiration-date",
        placeholder: "MM / YY",
      },
      ccv: {
        element: "#card-ccv",
        placeholder: "CCV",
      },
    },
  });
  app.setEventHandlers(app.get("#checkout"), {
    click: app.evts.checkout,
  });
  app.cart.init();
  app.showCart();
};
app.evts.checkout = function () {
  let cart = app.state.cart;
  let recipient = cart.recipient;
  recipient.name = app.get("#recipient-name").value.trim();
  recipient.email = app.get("#recipient-email").value.trim();
  recipient.phone = app.get("#recipient-phone").value.trim();
  recipient.address = app.get("#recipient-address").value.trim();
  let times = document.getElementsByName("recipient-time");
  for (let i = 0; i < times.length; i++) {
    if (times[i].checked) {
      recipient.time = times[i].value;
      break;
    }
  }
  if (recipient.name.length === 0) {
    alert("請輸入收件人姓名");
    return;
  } else if (recipient.email.length === 0) {
    alert("請輸入 Email");
    return;
  } else if (recipient.phone.length === 0) {
    alert("請輸入聯絡電話");
    return;
  } else if (recipient.address.length === 0) {
    alert("請輸入收件地址");
    return;
  }
  let creditCart = TPDirect.card.getTappayFieldsStatus();
  if (creditCart.canGetPrime) {
    TPDirect.card.getPrime(function (result) {
      if (result.status !== 0) {
        console.log("TapPay GetPrime Error");
        return;
      }
      let prime = result.card.prime;
      app.checkout(prime);
    });
  } else {
    alert("信用卡資訊填寫錯誤");
    return;
  }
};
app.checkout = function (prime) {
  let data = {
    prime: prime,
    order: app.state.cart,
  };
  let headers = {};
  if (app.state.auth !== null) {
    headers["Authorization"] = "Bearer " + app.state.auth.accessToken;
  }
  app.showLoading();
  app.ajax(
    "post",
    app.cst.API_ENDPOINT + "/order/checkout",
    data,
    headers,
    function (req) {
      app.closeLoading();
      let result = JSON.parse(req.responseText);
      if (result.error) {
        alert("交易失敗，請再試一次：" + result.error);
      } else {
        app.cart.clear();
        window.location = "./thankyou.html?number=" + result.data.number;
      }
    }
  );
};
app.showCart = function () {
  let cart = app.state.cart;
  let list = cart.list;
  let enabled = true;
  // show list
  let container = app.get("#cart-list");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<h4 style='margin-left:20px;'>購物車空空的耶</h4>";
  } else {
    for (let i = 0; i < list.length; i++) {
      let data = list[i];
      let item = app.createElement(
        "div",
        {
          atrs: {
            className: "row",
          },
        },
        container
      );
      // variant
      let variant = app.createElement(
        "div",
        {
          atrs: {
            className: "variant",
          },
        },
        item
      );
      let picture = app.createElement(
        "div",
        {
          atrs: {
            className: "picture",
          },
        },
        variant
      );
      app.createElement(
        "div",
        {
          atrs: {
            className: "details",
            innerHTML:
              data.name +
              "<br/>" +
              data.id +
              "<br/><br/>顏色：" +
              data.color.name +
              "<br/>尺寸：" +
              data.size,
          },
        },
        variant
      );
      app.createElement(
        "img",
        {
          atrs: {
            src: data.main_image,
          },
        },
        picture
      );
      // qty
      let qty = app.createElement(
        "div",
        {
          atrs: {
            className: "qty",
          },
        },
        item
      );
      let qtySelector = app.createElement(
        "select",
        {
          atrs: {
            index: i,
          },
          evts: {
            change: app.evts.changeQty,
          },
        },
        qty
      );
      for (let j = 1; j <= data.stock; j++) {
        qtySelector.add(
          app.createElement("option", {
            atrs: {
              value: j,
              textContent: j,
            },
          })
        );
      }
      qtySelector.selectedIndex = data.qty - 1;
      // price
      app.createElement(
        "div",
        {
          atrs: {
            className: "price",
            textContent: "NT. " + data.price,
          },
        },
        item
      );
      // subtotal
      app.createElement(
        "div",
        {
          atrs: {
            className: "subtotal",
            textContent: "NT. " + data.price * data.qty,
          },
        },
        item
      );
      // remove
      app.createElement(
        "img",
        {
          atrs: {
            src: "imgs/cart-remove.png",
            index: i,
          },
        },
        app.createElement(
          "div",
          {
            atrs: {
              className: "remove",
              index: i,
            },
            evts: {
              click: app.evts.removeCart,
            },
          },
          item
        )
      );
    }
  }
  // show prices
  app.get("#subtotal").textContent = cart.subtotal;
  app.get("#freight").textContent = cart.freight;
  app.get("#total").textContent = cart.total;
  enabled = enabled && cart.subtotal > 0;
  // show recipient
  app.get("#recipient-name").value = cart.recipient.name;
  app.get("#recipient-email").value = cart.recipient.email;
  app.get("#recipient-phone").value = cart.recipient.phone;
  app.get("#recipient-address").value = cart.recipient.address;
  let times = document.getElementsByName("recipient-time");
  for (let i = 0; i < times.length; i++) {
    if (times[i].value === cart.recipient.time) {
      times[i].checked = true;
    } else {
      times[i].checked = false;
    }
  }
  // show btn
  app.get("#checkout").disabled = !enabled;
};
app.evts.removeCart = function (e) {
  app.cart.remove(e.currentTarget.index);
  app.showCart();
};
app.evts.changeQty = function (e) {
  let selector = e.currentTarget;
  let qty = selector.options[selector.selectedIndex].value;
  app.cart.change(e.currentTarget.index, qty);
  app.showCart();
};
window.addEventListener("DOMContentLoaded", app.init);
