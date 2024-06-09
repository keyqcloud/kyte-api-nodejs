const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');  // Ensure you have the correct import

class KyteClient {
  constructor(publicKey, privateKey, kyteAccount, kyteIdentifier, kyteEndpoint, kyteAppId) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.kyteAccount = kyteAccount;
    this.kyteIdentifier = kyteIdentifier;
    this.kyteEndpoint = kyteEndpoint;
    this.kyteAppId = kyteAppId;
    this.sessionToken = '0';
    this.transactionToken = '0';
    this.usernameField = 'email';
    this.passwordField = 'password';
  }

  encode(data) {
    return Buffer.from(data, 'utf-8').toString('base64');
  }

  hmacSha256(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest();
  }

  bytesToHex(bytes) {
    return Array.from(bytes, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  }

  async getIdentity(timestamp) {
    const identityStr = `${this.publicKey}%${this.sessionToken}%${timestamp}%${this.kyteAccount}`;
    return encodeURIComponent(this.encode(identityStr));
  }

  async getSignature(epoch) {
    const txToken = '0';
    const key1 = this.hmacSha256(txToken, Buffer.from(this.privateKey, 'utf-8'));
    const key2 = this.hmacSha256(this.kyteIdentifier, key1);
    return this.bytesToHex(this.hmacSha256(epoch, key2));
  }

  async request(method, model, field, value, data, headers = {}) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const epoch = Math.floor(Date.now() / 1000).toString();
    const timestamp = formatter.format(new Date());

    const signature = await this.getSignature(epoch);
    const identity = await this.getIdentity(timestamp);

    let endpoint = `${this.kyteEndpoint}/${model}`;
    if (field && value) {
      endpoint += `/${field}/${value}`;
    }

    const config = {
      method,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-kyte-signature': signature,
        'x-kyte-identity': identity,
        ...headers
      },
      data: data ? JSON.stringify(data) : undefined
    };

    if (this.kyteAppId) {
      config.headers['x-kyte-appid'] = this.kyteAppId;
    }

    const response = await axios(config);
    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status} - ${response.data}`);
    }
    return response.data;
  }

  async post(model, data, headers) {
    return await this.request('post', model, null, null, data, headers);
  }

  async put(model, field, value, data, headers) {
    return await this.request('put', model, field, value, data, headers);
  }

  async get(model, field, value, headers) {
    return await this.request('get', model, field, value, null, headers);
  }

  async delete(model, field, value, headers) {
    return await this.request('delete', model, field, value, null, headers);
  }

  async createSession(username, password) {
    const data = {};
    data[this.usernameField] = username;
    data[this.passwordField] = password;
    const result = await this.post('Session', data);
    this.sessionToken = result.sessionToken;
    this.transactionToken = result.transactionToken;
    return result;
  }
}

module.exports = KyteClient;
