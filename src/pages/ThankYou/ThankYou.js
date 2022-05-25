import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Message = styled.div`
  padding-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
`;

const Number = styled.div`
  background-color: #eeeeee;
  padding: 5px 10px;
`;

const BackButton = styled.button`
  margin-top: 24px;
`;

function ThankYou() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  return (
    <Wrapper>
      <Message>感謝您的購買，我們會盡快將商品送達！</Message>
      <Message>請記住以下訂單編號，以便查詢</Message>
      <Number>{state.orderNumber}</Number>
      <BackButton onClick={() => navigate('/')}>繼續購物</BackButton>
    </Wrapper>
  );
}

export default ThankYou;
