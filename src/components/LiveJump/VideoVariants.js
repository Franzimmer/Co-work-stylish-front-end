import { useContext, useState } from 'react';
import styled from 'styled-components';

import CartContext from '../../contexts/CartContext';

const Color = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;
const ColorName = styled.div`
  font-size: 30px;
  margin-right: 10px;
  @media screen and (max-width: 1279px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;
const ColorItemsOutside = styled.div`
  display: flex;
  @media screen and (max-width: 1279px) {
    margin-top: 15px;
  }
`;
const ColorItems = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 6px;
  border: 6px solid white;
  box-shadow: 0px 0px 1px #bbbbbb;
  cursor: pointer;
  margin-right: 30px;
  background-color: rgb(221, 240, 255);
  background-color: ${(props) => props.$colorCode};
  ${(props) => props.$isSelected && 'outline: 1px solid #979797;'}
  @media screen and (max-width: 1279px) {
    width: 30px;
    height: 30px;
    padding: 3px;
    border: 3px solid white;
  }
`;
const Size = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 40px;
  font-size: 30px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;
const SizeName = styled.div`
  font-size: 30px;
  margin-right: 10px;
  @media screen and (max-width: 1279px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
const SizeItemsOutside = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SizeItems = styled.div`
  border: 1px black solid;
  padding: 3px 27px;
  margin-right: 15px;
  background: #fffafa;
  font-size: 23px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? 'black' : '#ececec')};
  color: ${(props) => (props.$isSelected ? 'white' : '#3f3a3a')};
  ${(props) => props.$isDisabled && 'opacity: 0.25;'}

  @media screen and (max-width: 1279px) {
    margin-top: 5px;
    width: 100%;
    padding: 3px 10px;
    font-size: 15px;
    margin-right: 5px;
    text-align: center;
    width: 90px;
  }
`;
const Number = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: start;
  align-items: center;
  font-size: 30px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    font-size: 25px;
    margin-top: 15px;
    text-align: center;
  }
`;
const NumberName = styled.div`
  margin-right: 10px;
  @media screen and (max-width: 1279px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const NumberChoice = styled.div`
  display: flex;
  border: 1px black solid;
  padding: 0px 20px;
  justify-content: space-between;
  width: 200px;
  height: 40px;
  align-items: center;
  @media screen and (max-width: 1279px) {
    font-size: 18px;
    margin-bottom: 10px;
    height: 25px;
  }
`;
const Reduce = styled.div`
  cursor: pointer;
`;
const NumberDecide = styled.div`
  font-size: 25px;
  @media screen and (max-width: 1279px) {
    font-size: 18px;
  }
`;
const Add = styled.div`
  cursor: pointer;
`;
const Buy = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  font-size: 23px;
  padding: 15px;
  background: brown;
  color: white;
  width: 250px;
  letter-spacing: 3px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
    width: 200px;
    padding: 8px;
    font-size: 16px;
  }
`;

function VideoVariants({ product }) {
  const [selectedColorCode, setSelectedColorCode] = useState(product.colors[0].code);
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const cart = useContext(CartContext);

  function getStock(colorCode, size) {
    return product.variants.find((variant) => variant.color_code === colorCode && variant.size === size).stock;
  }

  function addToCart() {
    if (!selectedSize) {
      window.alert('請選擇尺寸');
      return;
    }

    cart.addItem({
      color: product.colors.find((color) => color.code === selectedColorCode),
      id: product.id,
      image: product.main_image,
      name: product.title,
      price: product.price,
      qty: quantity,
      size: selectedSize,
      stock: getStock(selectedColorCode, selectedSize),
    });
  }
  return (
    <>
      <Color>
        <ColorName>顏色｜</ColorName>
        <ColorItemsOutside>
          {product.colors.map((color) => (
            <ColorItems
              key={color.code}
              $isSelected={color.code === selectedColorCode}
              $colorCode={`#${color.code}`}
              onClick={() => {
                setSelectedColorCode(color.code);
                setSelectedSize();
                setQuantity(1);
              }}
            />
          ))}
        </ColorItemsOutside>
      </Color>
      <Size>
        <SizeName>尺寸｜</SizeName>
        <SizeItemsOutside>
          {product.sizes.map((size) => {
            const stock = getStock(selectedColorCode, size);
            return (
              <SizeItems
                key={size}
                $isSelected={size === selectedSize}
                $isDisabled={stock === 0}
                onClick={() => {
                  const stock = getStock(selectedColorCode, size);
                  if (stock === 0) return;
                  setSelectedSize(size);
                  if (stock < quantity) setQuantity(1);
                }}
              >
                {size}
              </SizeItems>
            );
          })}
        </SizeItemsOutside>
      </Size>
      <Number>
        <NumberName>數量｜</NumberName>
        <NumberChoice>
          <Reduce
            onClick={() => {
              if (!selectedSize || quantity === 1) return;
              setQuantity(quantity - 1);
            }}
          >
            -
          </Reduce>
          <NumberDecide>{quantity}</NumberDecide>
          <Add
            onClick={() => {
              const stock = getStock(selectedColorCode, selectedSize);
              if (!selectedSize || quantity === stock) return;
              setQuantity(quantity + 1);
            }}
          >
            +
          </Add>
        </NumberChoice>
      </Number>
      <Buy onClick={addToCart}> {selectedSize ? '加入購物車' : '請選擇尺寸'}</Buy>
    </>
  );
}

export default VideoVariants;
