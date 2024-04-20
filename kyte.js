const axios = require('axios');

class Kyte {
    static VERSION = '1.0.0';

    constructor(url, accessKey, identifier, account_number, applicationId = null) {
        this.url = url;
        this.access_key = accessKey;
        this.identifier = identifier;
        this.account_number = account_number;
        this.applicationId = applicationId;
        this.txToken = 0;
        this.sessionToken = 0;
    }

    async apiVersion() {
        try {
            const response = await axios.get(this.url);
            console.log("Engine: " + response.data.engine_version + "; Framework: " + response.data.framework_version);
            return response.data;
        } catch (error) {
            console.error(error.response.data.error);
            throw error;
        }
    }

    async sign() {
        const d = new Date();
        try {
            const response = await axios.post(this.url, {
                key: this.access_key,
                identifier: this.identifier,
                token: this.txToken,
                time: d.toUTCString()
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    }

    async sendData(method, model, data = {}, headers = []) {
        const { data: signData } = await this.sign();
        const identity = Buffer.from(`${this.access_key}%${this.sessionToken}%${new Date().toUTCString()}%${this.account_number}`).toString('base64');
        const apiURL = `${this.url}/${model}`;

        try {
            const response = await axios({
                method: method,
                url: apiURL,
                headers: {
                    'x-kyte-signature': signData.signature,
                    'x-kyte-identity': identity,
                    ...headers.reduce((acc, header) => ({ ...acc, [header.name]: header.value }), {})
                },
                data
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    }
}

module.exports = Kyte;
