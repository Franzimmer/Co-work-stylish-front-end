import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import styled from "styled-components";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FollowList from "./components/FollowList/FollowList";
import Notification from "./components/Notification/Notification";
import CartContext from "./contexts/CartContext";
import LogInContext from "./contexts/LogInContext";
import PingFangTCRegular from "./fonts/PingFang-TC-Regular-2.otf";
import PingFangTCThin from "./fonts/PingFang-TC-Thin-2.otf";
import NotoSansTCRegular from "./fonts/NotoSansTC-Regular.otf";
import NotoSansTCBold from "./fonts/NotoSansTC-Bold.otf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCThin}) format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCBold}) format('opentype');
    font-weight: bold;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: NotoSansTC;
   
  }

  #root {
    min-height: 100%;
    padding: 140px 0 115px;
    position: relative;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: ${(props) => (props.display ? "block" : "none")};
`;

function App() {
  const [switchSidebar, setSwitchSidebar] = useState({
    followList: "none",
    notification: "none",
  });
  const [showMask, setShowMask] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(window.localStorage.getItem("jwtToken"))
  );

  const changeLogInStatus = (status) => {
    setIsLoggedIn(status);
    return;
  };
  const logInController = {
    isLoggedIn,
    changeLogInStatus,
  };
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );
  function getItems() {
    return cartItems;
  }
  function addItem(item) {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已加入商品");
  }
  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已修改數量");
  }
  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已刪除商品");
  }

  function clearItems() {
    const newCartItems = [];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  const cart = {
    getItems,
    addItem,
    changeItemQuantity,
    deleteItem,
    clearItems,
  };

  return (
    <CartContext.Provider value={cart}>
      <LogInContext.Provider value={logInController}>
        <Reset />
        <GlobalStyle />
        <Mask display={showMask}></Mask>
        <Header
          switchSidebar={switchSidebar}
          setSwitchSidebar={setSwitchSidebar}
        />
        {isLoggedIn && <FollowList switchSidebar={switchSidebar} />}
        {isLoggedIn && <Notification switchSidebar={switchSidebar} />}
        <Outlet />
        <Footer />
      </LogInContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
