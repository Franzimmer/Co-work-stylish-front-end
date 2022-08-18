import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ========================許願清單開始========================

const WishList = styled.div`
  ${
    '' /* width: 80%;
  margin: 20px auto; */
  }
`;

const WishListOutside = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  width: 80%;
  background: #fff5ee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const WishListProductZone = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-right: 1%;
  padding: 5px 20px;
  width: 48%;
  border: 0.5px dashed #4c9292;
  @media (max-width: 1279px) {
    width: 98%;
    flex-direction: column;
  }
`;

const WishName = styled.div`
  font-size: 20px;
  flex-grow: 1;
  @media (max-width: 1279px) {
    margin-bottom: 15px;
  }
`;

const WishPicZone = styled.div`
  width: 100px;
  display: block;
  flex-grow: 1;
  @media (max-width: 1279px) {
    margin-bottom: 15px;
  }
`;

const WishPic = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const WishFinger = styled.div`
  margin-right: 10px;
  animation: clickme 0.8s linear infinite;

  @keyframes clickme {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(5px, 0px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;

const WishButton = styled(Link)`
  background: #efc660;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  color: black;

  &:hover {
    scale: 1.2;
  }
  @media (max-width: 1279px) {
    margin-bottom: 15px;
  }
`;

// const WishDeleteButton = styled.div`
//   background: #dcdcdc;
//   padding: 5px;
//   border-radius: 10px;
//   cursor: pointer;
//   display: flex;
//   text-decoration: none;
//   color: black;
//   margin-left: 10px;
//   @media (max-width: 1279px) {
//     margin-bottom: 15px;
//   }
// `;

// ========================許願清單結束========================

const WishPage = (props) => {
  return (
    <WishList>
      <WishListOutside>
        {props.wish.map((item) => (
          <WishListProductZone>
            <WishPicZone>
              <WishPic src={item.main_image} />
            </WishPicZone>
            <WishName>{item.title}</WishName>
            <WishButton to={`/products/${item.product_id}`}>
              <WishFinger>☞</WishFinger> 點我看商品
            </WishButton>
            {/* <WishDeleteButton>刪除</WishDeleteButton> */}
          </WishListProductZone>
        ))}
      </WishListOutside>
    </WishList>
  );
};

export default WishPage;
