const api = {
  hostname: 'https://api.appworks-school.tw/api/1.0',
  hostname1: 'https://www.domingoos.store/api/1.0',
  async getProducts(category, paging) {
    const response = await fetch(`${this.hostname1}/products/${category}?paging=${paging}`);
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname1}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(`${this.hostname1}/products/search?keyword=${keyword}&paging=${paging}`);
    return await response.json();
  },
  async getProduct(id) {
    const response = await fetch(`${this.hostname1}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname1}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async signin(data) {
    const response = await fetch(`${this.hostname1}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async signup(data) {
    const response = await fetch(`${this.hostname1}/user/signup`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async searchUsers(keyword) {
    const response = await fetch(`${this.hostname1}/user/search?keyword=${keyword}`);
    return await response.json();
  },
  async getProfile(id) {
    const response = await fetch(`${this.hostname1}/user/${id}/info`);
    return await response.json();
  },
  async getFollowStatus(id, token) {
    const response = await fetch(`${this.hostname1}/user/${id}/followStatus`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    return await response.json();
  },
  async getGameStatus(id, token) {
    const response = await fetch(`${this.hostname1}/user/${id}/game`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'GET',
    });
    return await response.json();
  },
  //格式
  async updateGameStatus(id, token) {
    const response = await fetch(`${this.hostname1}/user/${id}/game`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'POST',
    });
    return await response.json();
  },
};

export default api;
