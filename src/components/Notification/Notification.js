import styled from "styled-components";

const Push = styled.div`
  z-index: 3;
  position: fixed;
  right: 0;
  height: 100%;
  width: 20vw;
  background: #fbf3f2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  opacity: 90%;
  display: ${(props) => props.display};
  @media screen and (max-width: 1279px) {
    width: 100%;
    height: auto;
  }
`;

const Messages = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 5px;
  }
`;

function Notification({ switchSidebar }) {
  return (
    <Push display={switchSidebar["notification"]}>
      <Messages>您被OOO追蹤中</Messages>
      <Messages>您已完成取貨</Messages>
      <Messages>您獲得了一張優待券</Messages>
      <Messages>您追蹤的網紅正在直播</Messages>
    </Push>
  );
}

export default Notification;
