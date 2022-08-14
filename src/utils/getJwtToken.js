import api from "./api";
import fb from "./fb";

async function getJwtToken() {
  await fb.loadScript();
  fb.init();
  const response = await fb.getLoginStatus();
  let accessToken;
  if (response.status === "connected") {
    accessToken = response.authResponse.accessToken;
  } else {
    const response = await fb.login();
    if (response.status === "connected") {
      accessToken = response.authResponse.accessToken;
    } else {
      throw new Error("登入失敗");
    }
  }
  const { data } = await api.signin({
    provider: "facebook",
    access_token: accessToken,
  });
  return data;
}

export default getJwtToken;
