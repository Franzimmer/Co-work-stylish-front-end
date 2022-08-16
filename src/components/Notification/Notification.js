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

function Notification({ switchSidebar, notice }) {
  return (
    <Push display={switchSidebar["notification"]}>
      {/* {notice &&
        notice.map((msg) => {
          return <Messages>test</Messages>;
        })} */}
    </Push>
  );
}

export default Notification;
