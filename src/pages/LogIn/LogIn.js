import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import LoginPanel from "./LoginPanel";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;
const UserMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: ${(props) => (props.position ? null : "center")};
`;

function LogIn() {
  const [profile, setProfile] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  return (
    <>
      <Wrapper>
        <UserMainColumn position={isLoggedIn}>
          {!isLoggedIn && (
            <LoginPanel setProfile={setProfile} setIsLoggedIn={setIsLoggedIn} />
          )}
        </UserMainColumn>
      </Wrapper>
    </>
  );
}

export default LogIn;
