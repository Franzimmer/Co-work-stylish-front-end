app.state.tag = null;
app.state.product = null;
app.state.keyvisual = null;
app.init = function () {
  window.addEventListener("scroll", app.evts.scroll);
  app.state.tag = app.getParameter("tag");
  // update menu item
  app.updateMenuItems(app.state.tag);
  // init index.html
  app.cart.init();
  app.getKeyvisuals();
  app.getProducts(app.state.tag, 0);
};
app.evts.scroll = function (e) {
  if (app.state.product === null) {
    // waiting for next page
    return;
  }
  let rect = document.body.getBoundingClientRect();
  let x = rect.bottom - window.innerHeight;
  if (x < 100) {
    if (app.state.product.next_paging !== undefined) {
      app.getProducts(app.state.tag, app.state.product.next_paging);
    }
  }
};
// keyvisuals
app.getKeyvisuals = function () {
  app.ajax(
    "get",
    app.cst.API_ENDPOINT + "/marketing/campaigns",
    "",
    {},
    function (req) {
      app.state.keyvisual = JSON.parse(req.responseText);
      app.state.keyvisual.step = 0;
      app.state.keyvisual.total = app.state.keyvisual.data.length;
      app.state.keyvisual.animeId;
      app.showKeyvisual(app.state.keyvisual);
    }
  );
};
app.showKeyvisual = function (keyvisual) {
  let container = app.get("#keyvisual");
  let step = app.get("#keyvisual>.step");
  // create key visuals and circle
  keyvisual.data.forEach(function (item, index) {
    // create circle
    let circle = app.createElement(
      "a",
      {
        atrs: {
          className: "circle" + (index === 0 ? " current" : ""),
          index: index,
        },
        evts: {
          click: app.evts.clickKeyvisual,
        },
      },
      step
    );
    // create visual
    let visual = app.createElement("a", {
      atrs: {
        className: "visual" + (index === 0 ? " current" : ""),
        href: "./product.html?id=" + item.product_id,
      },
      stys: {
        backgroundImage: "url(" + app.cst.API_HOST + item.picture + ")",
      },
    });
    app.createElement(
      "div",
      {
        atrs: {
          className: "story",
          innerHTML: item.story.replace(/\r\n/g, "<br/>"),
        },
      },
      visual
    );
    container.insertBefore(visual, step);
  });
  app.state.keyvisual.animeId = window.setInterval(
    app.evts.nextKeyvisual,
    5000
  );
};
app.evts.clickKeyvisual = function (e) {
  let step = e.currentTarget.index;
  let keyvisual = app.state.keyvisual;
  app
    .get("#keyvisual>.visual:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.remove("current");
  app
    .get("#keyvisual>.step>.circle:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.remove("current");
  keyvisual.step = step;
  app
    .get("#keyvisual>.visual:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.add("current");
  app
    .get("#keyvisual>.step>.circle:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.add("current");
  // reset interval
  window.clearInterval(app.state.keyvisual.animeId);
  app.state.keyvisual.animeId = window.setInterval(
    app.evts.nextKeyvisual,
    5000
  );
};
app.evts.nextKeyvisual = function () {
  let keyvisual = app.state.keyvisual;
  app
    .get("#keyvisual>.visual:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.remove("current");
  app
    .get("#keyvisual>.step>.circle:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.remove("current");
  keyvisual.step = (keyvisual.step + 1) % keyvisual.total;
  app
    .get("#keyvisual>.visual:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.add("current");
  app
    .get("#keyvisual>.step>.circle:nth-child(" + (keyvisual.step + 1) + ")")
    .classList.add("current");
};
// products
app.getProducts = function (tag, paging) {
  let path;
  let keyword;
  if (tag === null) {
    path = "/all";
  } else if (tag === "women") {
    path = "/women";
  } else if (tag === "men") {
    path = "/men";
  } else if (tag === "accessories") {
    path = "/accessories";
  } else {
    path = "/search";
    keyword = tag;
  }
  app.state.product = null;
  app.ajax(
    "get",
    app.cst.API_ENDPOINT + "/products" + path,
    "paging=" + paging + (keyword ? "&keyword=" + encodeURIComponent(tag) : ""),
    {},
    function (req) {
      app.state.product = JSON.parse(req.responseText);
      app.showProducts(app.state.product.data);
    }
  );
};
app.showProducts = function (data) {
  let container = app.get("#products");
  if (data.length === 0) {
    app.createElement(
      "h2",
      {
        atrs: {
          className: "no-result",
          textContent: "沒有搜尋到任何產品哦",
        },
      },
      container
    );
  } else {
    for (let i = 0; i < data.length; i++) {
      let product = data[i];
      let productContainer = app.createElement(
        "a",
        {
          atrs: {
            className: "product",
            href: "product.html?id=" + product.id,
          },
        },
        container
      );
      app.showProduct(product, productContainer);
    }
  }
};
app.showProduct = function (product, container) {
  // main Image
  app.createElement(
    "img",
    {
      atrs: {
        src: product.main_image,
      },
    },
    container
  );
  // colors
  let colorsContainer = app.createElement(
    "div",
    {
      atrs: {
        className: "colors",
      },
    },
    container
  );
  for (let key in product.colors) {
    let color = product.colors[key];
    app.createElement(
      "div",
      {
        atrs: {
          className: "color",
        },
        stys: {
          backgroundColor: "#" + color.code,
        },
      },
      colorsContainer
    );
  }
  // name and price
  app.createElement(
    "div",
    {
      atrs: {
        className: "name",
        textContent: product.title,
      },
    },
    container
  );
  app.createElement(
    "div",
    {
      atrs: {
        className: "price",
        textContent: "TWD." + product.price,
      },
    },
    container
  );
};
window.addEventListener("DOMContentLoaded", app.init);
