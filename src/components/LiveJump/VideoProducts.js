import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import VideoVariants from './VideoVariants';

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝選購清單＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const Introduce = styled.div`
  margin: 0 auto;
  overflow: auto;
  height: 650px;
  padding: 0px 20px;
  z-index: 80;
  width: 75%;
  position: fixed;
  left: 5vw;
  right: 5vw;
  top: 930px;
`;

const IntroduceProduct = styled.div`
  margin-top: 7px;
  width: 100%;
  background: #f3efef;
  border: 3px solid white;
  display: flex;
  justify-content: space-around;
  border-radius: 8px;
  align-items: center;
  padding: 7px 15px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

const IntroduceProductOutside = styled.div``;

const ProductName = styled.div`
  font-size: 25px;
  letter-spacing: 2px;
  width: 25%;
  text-align: center;
  margin-left: 70px;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
    margin-top: 10px;
    width: auto;
    margin-left: 0px;
  }
`;

const ProductPrice = styled.div`
  font-size: 25px;
  width: 25%;
  text-align: center;

  @media screen and (max-width: 1279px) {
    font-size: 20px;
    margin-top: 10px;
    width: auto;
  }
`;

const ProductPictureOutside = styled.div`
  width: 100px;
`;

const ProductPicture = styled.img`
  border-radius: 50%;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  display: block;

  margin-left: 40px;
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
  }
`;

const ProductAdd = styled.div`
  font-size: 28px;
  color: brown;
  letter-spacing: 5px;
  cursor: pointer;
  width: 25%;
  text-align: center;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
    margin-top: 10px;
    width: auto;
  }
`;

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝選購清單＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝選購細節＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const ProductDetail = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

const StopProductDetailOutsideRange = styled.div`
  position: absolute;
  left: 5px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    left: 0px;
    top: 0px;
  }
`;

const StopProductDetailOutside = styled.div`
  width: 30px;
  height: 30px;
  background-color: #d2b48c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const StopProductDetail = styled.div`
  font-size: 20px;
  @media screen and (max-width: 1279px) {
    font-size: 15px;
  }
`;

const ProductPics = styled.div`
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
  }
`;

const ProductPicOneOutside = styled.div`
  width: 250px;
  @media screen and (max-width: 1279px) {
    width: 100px;
  }
`;
const ProductPicOne = styled.img`
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 250px;
  display: block;
  border-radius: 10px;
  @media screen and (max-width: 1279px) {
    height: 100px;
    margin: 0 auto;
  }
`;

const ProductDetailContent = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝選購細節＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const VideoProducts = () => {
  //抓取現在是誰
  const paramId = useParams().id;
  let userId = JSON.parse(localStorage.getItem('user'))?.id;
  //================關閉或開啟商品細部項目================
  const [closeProduct, setCloseProduct] = useState('none');

  const ProductDetailRange = styled.div`
    background-color: #fff5ee;
    border-radius: 18px;
    padding: 15px;
    display: ${closeProduct};
  `;

  function closeProductDetail() {
    setCloseProduct('none');
  }

  function openProductDetail() {
    setCloseProduct('block');
  }

  //================抓取直播主選的要推廣商品================
  const [product, setProduct] = useState();

  useEffect(() => {
    getVideoProducts();
  }, []);

  // https://www.domingoos.store/api/1.0/user/${paramId}/live-products

  // https://www.domingoos.store/api/1.0/products/all
  function getVideoProducts() {
    fetch('https://api.appworks-school.tw/api/1.0/products/women')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => console.log(error));
  }

  console.log(product);

  if (!product) return null;

  return (
    <Introduce>
      {product.map((product) => (
        <IntroduceProductOutside key={product.id}>
          <IntroduceProduct>
            <ProductPictureOutside>
              <ProductPicture src={product.main_image} />
            </ProductPictureOutside>
            <ProductName>{product.title}</ProductName>
            <ProductPrice>TWD.{product.price}</ProductPrice>
            <ProductAdd onClick={openProductDetail}>➕加入購物車</ProductAdd>
          </IntroduceProduct>
          <ProductDetailRange>
            <ProductDetail>
              <StopProductDetailOutsideRange>
                <StopProductDetailOutside>
                  <StopProductDetail onClick={closeProductDetail}>X</StopProductDetail>
                </StopProductDetailOutside>
              </StopProductDetailOutsideRange>
              <ProductPics>
                <ProductPicOneOutside>
                  <ProductPicOne src={product.main_image} />
                </ProductPicOneOutside>
              </ProductPics>
              <ProductDetailContent>
                <VideoVariants product={product} />
              </ProductDetailContent>
            </ProductDetail>
          </ProductDetailRange>
        </IntroduceProductOutside>
      ))}
    </Introduce>
  );
};

export default VideoProducts;
