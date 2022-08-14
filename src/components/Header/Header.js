import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import LogInContext from "../../contexts/LogInContext";
import logo from "./logo.png";
import search from "./search.png";
import cart from "./cart.png";
import cartMobile from "./cart-mobile.png";
import profile from "./profile.png";
import profileMobile from "./profile-mobile.png";
import CartContext from "../../contexts/CartContext";
import follow from "./follower.png";
import bell from "./bell.png";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 140px;
  width: 100%;
  padding: 0 24px 0 60px;
  border-bottom: 40px solid #313538;
  z-index: 9;
  background-color: white;
  display: flex;
  align-items: center;
  font-family: PingFangTC;

  @media screen and (max-width: 1279px) {
    height: 52px;
    padding: 0;
    border: none;
    justify-content: center;
  }
`;

const Logo = styled(Link)`
  width: 230px;
  height: 48px;
  margin-top: 10px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (max-width: 1279px) {
    width: 129px;
    height: 24px;
    margin-top: 0px;
  }
`;

const CategoryLinks = styled.div`
  margin: 16px 0 0 20px;

  @media screen and (max-width: 1279px) {
    margin: 0;
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #313538;
  }
`;

const CategoryLink = styled(Link)`
  font-size: 20px;
  letter-spacing: 30px;
  padding-left: 30px;
  padding-right: 1px;
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.$isActive ? "#8b572a" : "#3f3a3a")};

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: normal;
    padding: 0;
    text-align: center;
    color: ${(props) => (props.$isActive ? "white" : "#828282")};
    line-height: 50px;
    flex-grow: 1;
  }

  &:hover {
    color: #8b572a;

    @media screen and (max-width: 1279px) {
      color: white;
    }
  }

  & + &::before {
    content: "|";
    position: absolute;
    left: 0;
    color: #3f3a3a;

    @media screen and (max-width: 1279px) {
      color: #828282;
    }
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  @media screen and (max-width: 1279px) {
    position: absolute;
    z-index: 1;
    width: 100%;
  }
`;
const SearchInput = styled.input`
  width: 280px;
  border: none;
  outline: none;
  height: 44px;
  border: solid 1px #979797;
  color: #8b572a;
  border-radius: 20px;
  background-repeat: no-repeat;
  font-size: 20px;
  line-height: 24px;
  background-position: 230px;
  padding: 6px 45px 6px 80px;

  @media screen and (max-width: 1279px) {
    position: absolute;
    display: ${(props) => props.display};
    width: calc(100% - 30px);
    margin-left: 20px;
    border: solid 1px #979797;
    padding-left: 80px;
    top: -22px;
  }
`;

const SerachIcon = styled.div`
  background-image: url(${search});
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  right: 0;
  @media screen and (max-width: 1279px) {
    top: -22px;
    right: 10px;
  }
`;

const SearchSelect = styled.select`
  width: 70px;
  height: 44px;
  border: solid 1px #979797;
  padding-left: 10px;
  background-color: #f3efef;
  border-radius: 20px 0px 0px 20px;
  position: absolute;
  margint-right: 20px;
  @media screen and (max-width: 1279px) {
    display: ${(props) => props.display};
    z-index: 5;
    left: 20px;
    top: -22px;
  }
`;
const SearchSelectOption = styled.option``;

const TrackIcon = styled.div`
  margin-right: 15px;
  background-image: url(${follow});
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-size: contain;
  position: relative;
  @media screen and (max-width: 1279px) {
    position: fixed;
    right: 120px;
  }
`;

const BellIcon = styled.div`
  margin-right: 20px;
  background-image: url(${bell});
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-size: contain;
  position: relative;
  @media screen and (max-width: 1279px) {
    position: fixed;
    right: 50px;
  }
`;

const BellIconAlert = styled.div`
  width: 15px;
  height: 15px;
  background: red;
  position: absolute;
  border-radius: 50%;
  bottom: 0px;
  right: 0px;
`;

const PageLinks = styled.div`
  margin-left: auto;
  display: flex;
  align-item: center;
  justify-content: center;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-left: 0;
    height: 60px;
    position: fixed;
    z-index: 5;
    left: 0;
    bottom: 0;
    background-color: #313538;
  }
`;

const PageLink = styled(Link)`
  @media screen and (max-width: 1279px) {
    width: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & + & {
    ${"" /* margin-left: 42px; */}
    margin-right: 15px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
    }
  }

  & + &::before {
    @media screen and (max-width: 1279px) {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 24px;
      background-color: #828282;
    }
  }
`;

const PageLinkIcon = styled.div`
  width: 44px;
  height: 44px;
  cursor: pointer;
  background-size: contain;
  position: relative;
`;

const PageLinkCartIcon = styled(PageLinkIcon)`
  margin-right: 15px;
  background-image: url(${cart});

  @media screen and (max-width: 1279px) {
    background-image: url(${cartMobile});
  }
`;

const PageLinkProfileIcon = styled(PageLinkIcon)`
  background-image: url(${profile});

  @media screen and (max-width: 1279px) {
    background-image: url(${profileMobile});
  }
`;

const PageLinkIconNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-color: #8b572a;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
`;

const PageLinkText = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    color: white;
  }
`;

const categories = [
  {
    name: "women",
    displayText: "女裝",
  },
  {
    name: "men",
    displayText: "男裝",
  },
  {
    name: "accessories",
    displayText: "配件",
  },
];

function Header({ switchSidebar, setSwitchSidebar }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { getItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(LogInContext);
  const [mobileSearch, setMobileSearch] = useState("none");

  function sidebarToggle(target) {
    let defaultCondition = { followList: "none", notification: "none" };
    if (switchSidebar[target] === "none") defaultCondition[target] = "block";
    else if (switchSidebar[target] === "block")
      defaultCondition[target] = "none";
    setSwitchSidebar(defaultCondition);
  }

  function mobileSearchToggle() {
    if (mobileSearch === "none") setMobileSearch("block");
    else if (mobileSearch === "block") setMobileSearch("none");
  }

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);

  return (
    <Wrapper>
      <Logo to="/" />
      <CategoryLinks>
        {categories.map(({ name, displayText }, index) => (
          <CategoryLink
            to={`/?category=${name}`}
            $isActive={category === name}
            key={index}
          >
            {displayText}
          </CategoryLink>
        ))}
      </CategoryLinks>
      <PageLinks>
        <PageLink to="/checkout">
          <PageLinkCartIcon icon={cart}>
            <PageLinkIconNumber>{getItems().length}</PageLinkIconNumber>
          </PageLinkCartIcon>
          <PageLinkText>購物車</PageLinkText>
        </PageLink>
        <PageLink to="/profile">
          <PageLinkProfileIcon icon={profile} />
          <PageLinkText>會員</PageLinkText>
        </PageLink>
      </PageLinks>
      <TrackIcon icon={follow} onClick={() => sidebarToggle("followList")} />
      <BellIcon icon={bell} onClick={() => sidebarToggle("notification")}>
        {isLoggedIn && <BellIconAlert />}
      </BellIcon>
      <SearchWrapper>
        <SearchSelect display={mobileSearch}>
          <SearchSelectOption>商品</SearchSelectOption>
          <SearchSelectOption>帳號</SearchSelectOption>
        </SearchSelect>
        <SearchInput
          display={mobileSearch}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate(`/?keyword=${inputValue}`);
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        ></SearchInput>
        <SerachIcon onClick={mobileSearchToggle} />
      </SearchWrapper>
    </Wrapper>
  );
}

export default Header;
