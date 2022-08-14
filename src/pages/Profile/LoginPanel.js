import { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLine,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import getJwtToken from "../../utils/getJwtToken";
import LogInContext from "../../contexts/LogInContext";
import api from "../../utils/api";

const LoginPanel = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const NativeLogInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-right: 40px;
  border-right: 1px solid #8b572a;
  padding-right: 10px;
`;
const SwitchWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;
const Switch = styled.div`
  border-radius: 5px;
  margin-right: 10px;
  font-size: 18px;
  letter-spacing: 1px;
  color: #8b572a;
  border: 1px solid #8b572a;
  padding: 5px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #8b572a;
  }
`;
const InputWrapper = styled.div`
  diplay: flex;
  flex-direction: column;
  width: 100%;
`;
const Label = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;
const TextInput = styled.input`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  padding-left: 5px;
  &:focus {
    background-color: #fbf3f2;
  }
`;
const NativeLogInBtn = styled.button`
  font-size: 14px;
  border: none;
  color: #fff;
  display: block;
  background-color: #8b572a;
  padding: 5px;
  cursor: pointer;
`;
const LoginBtnWrapper = styled.div`
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

function LogInPanel({ setProfile }) {
  const [switchSignIn, setSwitchSignIn] = useState(false);
  const logInController = useContext(LogInContext);
  const changeLogInStatus = logInController.changeLogInStatus;
  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let passwordCheckRef = useRef();
  let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*\d).{6,30}$/);

  async function userSignIn() {
    if (passwordRef.current.value !== passwordCheckRef.current.value) {
      alert("密碼不相符");
      return;
    }
    if (!emailRegex.test(emailRef.current.value)) {
      alert("Invalid email form");
      return;
    } else if (!passwordRegex.test(passwordRef.current.value)) {
      alert("Password must be 6~30 numbers & lower case characters.");
      return;
    }
    const { data } = await api.signup({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    window.localStorage.setItem("jwtToken", data.access_token);
    window.localStorage.setItem("user", JSON.stringify(data.user));
    changeLogInStatus(true);
    setProfile(data.user);
  }

  async function userLogIn() {
    if (!emailRegex.test(emailRef.current.value)) {
      alert("Invalid email form");
      return;
    } else if (!passwordRegex.test(passwordRef.current.value)) {
      alert("Password must be 6~30 numbers & lower case characters.");
      return;
    }
    const { data } = await api.signin({
      provider: "native",
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    window.localStorage.setItem("jwtToken", data.access_token);
    window.localStorage.setItem("user", JSON.stringify(data.user));
    changeLogInStatus(true);
    setProfile(data.user);
  }

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
    <LoginPanel>
      <NativeLogInWrapper>
        <SwitchWrapper>
          <Switch onClick={() => setSwitchSignIn(false)}>登入</Switch>
          <Switch onClick={() => setSwitchSignIn(true)}>註冊</Switch>
        </SwitchWrapper>
        <InputWrapper>
          {switchSignIn && (
            <>
              <Label>姓名</Label>
              <TextInput type="text" ref={nameRef} />
            </>
          )}
          <Label>電子信箱</Label>
          <TextInput type="text" ref={emailRef} />
          <Label>密碼</Label>
          <TextInput type="password" ref={passwordRef} />
          {switchSignIn && (
            <>
              <Label>確認密碼</Label>
              <TextInput type="password" ref={passwordCheckRef} />
            </>
          )}
          {switchSignIn ? (
            <NativeLogInBtn onClick={userSignIn}>註冊</NativeLogInBtn>
          ) : (
            <NativeLogInBtn onClick={userLogIn}>登入</NativeLogInBtn>
          )}
        </InputWrapper>
      </NativeLogInWrapper>
      <LoginBtnWrapper>
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
      </LoginBtnWrapper>
    </LoginPanel>
  );
}

export default LogInPanel;
