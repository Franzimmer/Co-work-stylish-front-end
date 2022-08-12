import styled from "styled-components";
import personhead from "./personhead.png";

const Live = styled.div`
  z-index: 3;
  position: fixed;
  right: 0;
  height: 100%;
  width: 20vw;
  background: #fbf3f2;
  display: flex;
  flex-direction: column;
  opacity: 90%;
  padding-left: 35px;
  display: ${(props) => props.display};
  @media screen and (max-width: 1279px) {
    width: 100%;
    height: auto;
    padding-bottom: 30px;
  }
`;

const Person = styled.div`
  display: flex;
  align-items: center;
  width: 15vw;
  padding-top: 30px;
  @media screen and (max-width: 1279px) {
    width: 170px;
    padding-top: 20px;
  }
`;

const PersonHead = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background-image: url(${personhead});
  background-repeat: no-repeat;
  background-size: 100%;
  @media screen and (max-width: 1279px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const PersonName = styled.div`
  font-size: 20px;
  letter-spacing: 2px;
  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 1px;
  }
`;

const Tracked = styled.div`
  font-size: 24px;
  padding-top: 40px;
  letter-spacing: 7px;
  color: brown;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
    padding-top: 30px;
    color: brown;
  }
`;

function FollowList({ switchSidebar }) {
  return (
    <Live display={switchSidebar["followList"]}>
      <Tracked>追蹤名單</Tracked>
      <Person>
        <PersonHead />
        <PersonName>周杰倫</PersonName>
      </Person>
      <Person>
        <PersonHead />
        <PersonName>蔡依林</PersonName>
      </Person>
      <Person>
        <PersonHead />
        <PersonName>告五人</PersonName>
      </Person>
      <Person>
        <PersonHead />
        <PersonName>美秀姐</PersonName>
      </Person>
    </Live>
  );
}

export default FollowList;
