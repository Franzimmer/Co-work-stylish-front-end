import styled from "styled-components";
import { Link } from "react-router-dom";

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
  width: 85%;
  font-size: 16px;
  letter-spacing: 1px;
  color: #000;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 5px;
  }
`;

const MsgAlert = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
`;

const MsgWrapper = styled(Link)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  text-decoration: none;
`;

function Notification({ switchSidebar, notice, setNotice }) {
  const fakeNotice = [
    {
      id: 10256,
      name: "test100",
      status: 1,
      url: "test.m3u8",
      read: 0,
    },
    {
      id: 10257,
      name: "test200",
      status: 1,
      url: "test.m3u8",
      read: 1,
    },
    {
      id: 10258,
      name: "test300",
      status: 1,
      url: "test.m3u8",
      read: 0,
    },
  ];
  return (
    <Push display={switchSidebar["notification"]}>
      {notice &&
        notice.map((msg) => {
          return (
            <MsgWrapper to={`/profile/${msg.id}`} id={`msg_${msg.id}`}>
              <Messages>{msg.name}開始直播了！</Messages>
              {/* {!msg.read && <MsgAlert />} */}
            </MsgWrapper>
          );
        })}
    </Push>
  );
}

export default Notification;
