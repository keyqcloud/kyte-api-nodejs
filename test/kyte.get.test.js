const assert = require('assert');
const axios = require('axios');
const KyteClient = require('../kyte');

// Load environment variables from .env file
require('dotenv').config();

(async () => {
  let client;

  try {
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    const kyteAccount = process.env.KYTE_ACCOUNT;
    const kyteIdentifier = process.env.KYTE_IDENTIFIER;
    const kyteEndpoint = process.env.KYTE_ENDPOINT;
    const kyteAppId = process.env.KYTE_APP_ID;
    const testModel = process.env.KYTE_TEST_MODEL;

    client = new KyteClient(publicKey, privateKey, kyteAccount, kyteIdentifier, kyteEndpoint, kyteAppId);

    const model = testModel;
    const field = null;
    const value = null;
    const headers = {};

    console.log('Making GET request...');
    const response = await client.get(model, field, value, headers);

    console.log('GET request made. Response received:', response);

    // Assertions
    assert.strictEqual(typeof response, 'object', 'The response should be an object');
    assert(response !== null, 'The response should not be null');

    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
})();
