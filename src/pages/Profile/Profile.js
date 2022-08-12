import { useState, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLine,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import getJwtToken from "../../utils/getJwtToken";
import LogInContext from "../../contexts/LogInContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  background-color: #fbf3f2;
  height: 100%;
  color: #e27d60;
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;

  @media (max-width: 1279px) {
    display: none;
  }
`;
const MenuItem = styled.div`
  margin: 0px 0px 20px 40px;
  white-space: nowrap;
`;

const UserMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3efef;
  width: 100%;
  position: relative;
  height: 18vh;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  left: 400px;

  @media (max-width: 1279px) {
    margin-top: 20px;
    left: 130px;
    bottom: 15px;
  }
`;

const Photo = styled.img`
  margin-top: 50px;
  border-radius: 50%;
  width: 150px;
  position: absolute;
  left: 200px;
  bottom: -35px;

  @media (max-width: 1279px) {
    width: 90px;
    margin-top: 20px;
    left: 30px;
    bottom: 10px;
  }
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 40px;

  @media (max-width: 1279px) {
    font-size: 20px;
  }
`;

const Mail = styled.div`
  margin-top: 10px;
  color: #999;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;
const Followers = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  left: 580px;

  @media (max-width: 1279px) {
    margin-top: 20px;
    left: 280px;
    bottom: 15px;
  }
`;

const FollowersTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;

  @media (max-width: 1279px) {
    font-size: 16px;
  }
`;

const FollowersNumbers = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: center;

  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  color: #fff;
  letter-spacing: 1px;
  margin: 10px 20px 10px 0px;
  padding: 5px 20px;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  white-space: nowrap;
  @media (max-width: 1279px) {
    padding: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1279px) {
    flex-direction: column;
  }
`;

const LiveButton = styled(Button)`
  background-color: #e27d60;
  border: 1px solid #e27d60;
  left: 700px;
  bottom: 50px;

  @media (min-width: 600px) and (max-width: 1279px) {
    margin-top: 20px;
    left: 380px;
    bottom: 20px;
  }

  @media (max-width: 599px) {
    margin-top: 20px;
    left: 250px;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #8b572a;
  border: 1px solid #8b572a;
  left: 700px;
  bottom: 10px;

  @media (min-width: 600px) and (max-width: 1279px) {
    margin-top: 20px;
    left: 450px;
    bottom: 20px;
  }

  @media (max-width: 599px) {
    margin-top: 20px;
    left: 310px;
    bottom: 60px;
  }
`;

const DailyTaskReminder = styled.div`
  color: #8b572a;
  height: 10vh;
  text-align: center;
  line-height: 10vh;
  font-size: 24px;
  border-bottom: 1px solid #f3efef;

  @media (max-width: 1279px) {
    font-size: 16px;
  }
`;

const Tabs = styled.div`
  border-bottom: 4px solid #f3efef;
  height: 8vh;
  width: 80%;
  margin: 30px auto 0px auto;
  display: flex;
`;

const Tab = styled.div`
  height: 3vh;
  line-height: 3vh;
  background-color: #f3efef;
  color: #8b572a;
  border-radius: 5px;
  margin: 4vh 15px 0px 0px;
  padding: 0px 10px;
`;
const Game = styled.div`
  background-color: #f3efef;
  height: auto;
  width: 80%;
  margin: 20px auto;
`;
const LoginPanel = styled.div`
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginBtn = styled.div`
  width: 300px;
  height: 50px;
  text-align: center;
  border-radius: 30px;
  letter-spacing: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const FbLoginBtn = styled(LoginBtn)`
  background-color: #1877f2;
  margin-bottom: 20px;
`;
const LineLoginBtn = styled(LoginBtn)`
  background-color: #00ba00;
  margin-bottom: 20px;
`;
const GoogleLoginBtn = styled(LoginBtn)`
  background-color: red;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 30px;
  margin-right: 10px;
`;

function Profile() {
  const [profile, setProfile] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const logInController = useContext(LogInContext);
  const logInStatus = logInController.isLoggedIn;
  const changeLogInStatus = logInController.changeLogInStatus;

  async function getProfile() {
    let jwtToken = window.localStorage.getItem("jwtToken");
    let userData;
    if (!jwtToken) {
      try {
        userData = await getJwtToken();
      } catch (e) {
        window.alert(e.message);
        return;
      }
    }
    window.localStorage.setItem("jwtToken", userData.access_token);
    window.localStorage.setItem("user", JSON.stringify(userData.user));
    changeLogInStatus(true);
    setProfile(userData.user);
  }

  return (
    <Wrapper>
      {logInStatus && (
        <Menu>
          <MenuItem>- Order</MenuItem>
          <MenuItem>- Coupon</MenuItem>
        </Menu>
      )}
      <UserMainColumn>
        {!logInStatus && (
          <LoginPanel>
            <FbLoginBtn onClick={getProfile}>
              <StyledFontAwesomeIcon icon={faFacebook} />
              以Facebook登入
            </FbLoginBtn>
            <LineLoginBtn>
              <StyledFontAwesomeIcon icon={faLine} />
              以Line登入
            </LineLoginBtn>
            <GoogleLoginBtn>
              <StyledFontAwesomeIcon icon={faGoogle} />
              以Google帳號登入
            </GoogleLoginBtn>
          </LoginPanel>
        )}
        {logInStatus && profile && (
          <UserWrapper>
            <Photo src={profile.picture} />
            <UserInfoWrapper>
              <Name>{profile.name}</Name>
              <Mail>{profile.email}</Mail>
            </UserInfoWrapper>
            <Followers>
              <FollowersTitle>粉絲數量</FollowersTitle>
              <FollowersNumbers>209</FollowersNumbers>
            </Followers>
            <ButtonWrapper>
              <LiveButton>直播</LiveButton>
              <LogoutButton
                onClick={() => {
                  window.localStorage.removeItem("jwtToken");
                  changeLogInStatus(false);
                }}
              >
                登出
              </LogoutButton>
            </ButtonWrapper>
          </UserWrapper>
        )}
        {logInStatus && (
          <DailyTaskReminder>你還未執行每日任務！</DailyTaskReminder>
        )}
        {logInStatus && (
          <Tabs>
            <Tab>每日任務</Tab>
            <Tab>貼文</Tab>
            <Tab>心願清單</Tab>
          </Tabs>
        )}
        {logInStatus && <Game></Game>}
      </UserMainColumn>
    </Wrapper>
  );
}

export default Profile;
