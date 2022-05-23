import api from './api';
import fb from './fb';

async function getJwtToken() {
  await fb.loadScript();
  fb.init();
  let response = await fb.getLoginStatus();
  let accessToken;
  if (response.status === 'connected') {
    accessToken = response.authResponse.accessToken;
  } else {
    response = await fb.login();
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
    }
  }
  const { data } = await api.signin({
    provider: 'facebook',
    access_token: accessToken,
  });
  const jwtToken = data.access_token;
  return jwtToken;
}

export default getJwtToken;
