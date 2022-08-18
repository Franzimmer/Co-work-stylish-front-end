import React from 'react';
import styled from 'styled-components';

// ========================coupon開始========================

const CouponZone = styled.div`
  margin: 0 auto;
  position: relative;
  width: 80%;
`;

const CouponList = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Coupon = styled.div`
  width: 450px;
  height: auto;
  background: #f0f8ff;
  margin: 20px 20px;
  text-align: center;
  padding: 15px 0px;
  padding-left: 90px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 1% 50%);
  border: thick double #32a1ce;
  cursor: pointer;
`;

const CouponTop = styled.div`
  display: flex;
  width: 270px;
`;

const CouponTitle = styled.div`
  padding-bottom: 15px;
  font-size: 23px;
  color: #008b8b;
  margin-left: 10px;
`;
const CouponName = styled.div`
  padding-bottom: 15px;
  color: #2f4f4f;
`;
const CouponDescription = styled.div`
  color: #2f4f4f;
  padding-bottom: 15px;
`;

const CouponWin = styled.div`
  background: #2f4f4f;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  poaition: fixed;
  transform: rotate(-30deg);
  animation: scale 1.5s linear infinite;
  @keyframes scale {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.1;
    }
    100% {
      scale: 1;
    }
  }
`;

const CouponWinName = styled.div`
  color: white;
  font-size: 20px;
`;

const CouponExpiredOutside = styled.div`
  background: #2f4f4f;
  display: flex;
  width: 80px;
  border-radius: 10px;
  justify-content: center;
  margin-left: auto;
  margin-right: 10px;
`;

const CouponExpired = styled.div`
  font-size: 15px;
  padding: 5px;
  color: white;
`;

// ========================coupon開始========================

const couponPage = (props) => {
  return (
    <CouponZone>
      <CouponList>
        {props.coupon.map((item) => (
          <Coupon>
            <CouponTop>
              <CouponWin>
                <CouponWinName>限</CouponWinName>
              </CouponWin>
              <CouponTitle>{item.title}</CouponTitle>
            </CouponTop>
            <CouponName>{item.name}</CouponName>
            <CouponDescription>{item.description}</CouponDescription>
            <CouponExpiredOutside>
              <CouponExpired>{item.expire}未到期</CouponExpired>
            </CouponExpiredOutside>
          </Coupon>
        ))}
      </CouponList>
    </CouponZone>
  );
};

export default couponPage;
