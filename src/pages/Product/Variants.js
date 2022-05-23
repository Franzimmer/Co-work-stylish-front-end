import styled from 'styled-components';

import getStock from './getStock';
import add from './add.png';
import minus from './minus.png';

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const OptionName = styled.div`
  line-height: 24px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    letter-spacing: 2.8px;

    ${(props) => props.hideOnMobile && 'display: none;'}
  }
`;

const Color = styled.div`
  width: 36px;
  height: 36px;
  padding: 6px;
  border: 6px solid white;
  box-shadow: 0px 0px 1px #bbbbbb;
  cursor: pointer;
  margin-left: 21px;
  background-color: ${(props) => props.$colorCode};
  ${(props) => props.$isSelected && 'outline: 1px solid #979797;'}

  & + & {
    margin-left: 15px;
  }
`;

const Size = styled.div`
  width: 34px;
  height: 34px;
  background-color: ${(props) => (props.$isSelected ? 'black' : '#ececec')};
  color: ${(props) => (props.$isSelected ? 'white' : '#3f3a3a')};
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 22px;
  cursor: ${(props) => (props.$isDisabled ? ' not-allowed' : 'pointer')};
  ${(props) => props.$isDisabled && 'opacity: 0.25;'}

  & + & {
    margin-left: 20px;
  }
`;

const QuantitySelector = styled.div`
  margin-left: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  height: 44px;
  padding: 0 10px;
  border: 1px solid #979797;
  font-size: 20px;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    width: 100%;
    padding: 0 30px;
  }
`;

const Quantity = styled.div`
  color: #8b572a;
`;

const Button = styled.div`
  cursor: pointer;
  background-size: contain;
  width: 16px;
  height: 16px;
`;

const DecrementButton = styled(Button)`
  background-image: url(${minus});
`;

const IncrementButton = styled(Button)`
  background-image: url(${add});
`;

function Variants({
  colors,
  sizes,
  variants,
  selectedColorCode,
  selectedSize,
  quantity,
  onColorCodeChange,
  onSizeChange,
  onQuantityChange,
}) {
  return (
    <>
      <Option>
        <OptionName>顏色｜</OptionName>
        {colors.map((color) => (
          <Color
            key={color.code}
            $isSelected={color.code === selectedColorCode}
            $colorCode={`#${color.code}`}
            onClick={() => onColorCodeChange(color.code)}
          />
        ))}
      </Option>
      <Option>
        <OptionName>尺寸｜</OptionName>
        {sizes.map((size) => {
          const stock = getStock(variants, selectedColorCode, size);
          return (
            <Size
              key={size}
              $isSelected={size === selectedSize}
              $isDisabled={stock === 0}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </Size>
          );
        })}
      </Option>
      <Option>
        <OptionName hideOnMobile>數量｜</OptionName>
        <QuantitySelector>
          <DecrementButton onClick={() => onQuantityChange(quantity - 1)} />
          <Quantity>{quantity}</Quantity>
          <IncrementButton onClick={() => onQuantityChange(quantity + 1)} />
        </QuantitySelector>
      </Option>
    </>
  );
}

export default Variants;
