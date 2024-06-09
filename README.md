# kyte-api-nodejs

[![Node.js CI](https://github.com/keyqcloud/kyte-api-nodejs/actions/workflows/test.yml/badge.svg)](https://github.com/keyqcloud/kyte-api-nodejs/actions/workflows/test.yml)

## Description

This repository contains the Node.js API for Kyte, designed to provide seamless integration and efficient management of Kyte's core features. Whether you're looking to automate tasks, handle complex user data, or offer real-time interactions, kyte-api-nodejs provides the necessary endpoints.

## Features

- **User Authentication**: Securely manage user sessions and data.
- **Real-time Data Processing**: Handle and process data in real-time.
- **Scalable Architecture**: Designed to scale effortlessly with your needs.

## Installation

To get started with `kyte-api-nodejs`, clone the repository and install the dependencies.

```bash
git clone https://github.com/keyqcloud/kyte-api-nodejs.git
cd kyte-api-nodejs
npm install
```

## Testing

To run the tests, you need to have the necessary environment variables set up. You can use a `.env` file to manage these variables locally. Create a `.env` file in the root of the project with the following content:

```plaintext
PUBLIC_KEY=your-public-key
PRIVATE_KEY=your-private-key
KYTE_ACCOUNT=your-kyte-account
KYTE_IDENTIFIER=your-kyte-identifier
KYTE_ENDPOINT=your-kyte-endpoint
KYTE_APP_ID=your-kyte-app-id
KYTE_TEST_MODEL=your-test-model
```

Run the tests using the following command:

```bash
npm test
```

## Example Usage

### Example GET Call

Here's an example of how to make a GET request using the `KyteClient`:

```javascript
const KyteClient = require('kyte-api-nodejs');

// Load environment variables from .env file
require('dotenv').config();

// Replace these placeholders with actual values from your .env file
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const kyteAccount = process.env.KYTE_ACCOUNT;
const kyteIdentifier = process.env.KYTE_IDENTIFIER;
const kyteEndpoint = process.env.KYTE_ENDPOINT;
const kyteAppId = process.env.KYTE_APP_ID;

const client = new KyteClient(publicKey, privateKey, kyteAccount, kyteIdentifier, kyteEndpoint, kyteAppId);

async function testGetCall() {
  try {
    const model = 'MODEL_NAME'; // replace with actual model
    const field = null; // Can be null if not needed
    const value = null; // Can be null if not needed
    const headers = {}; // Add any headers if needed

    const response = await client.get(model, field, value, headers);
    console.log('GET call response:', response);
  } catch (error) {
    console.error('Error making GET call:', error);
  }
}

testGetCall();
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
