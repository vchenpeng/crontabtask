const fetch = require('node-fetch');
const HttpProxyAgent = require('http-proxy-agent');

const proxyUrl = 'http://127.0.0.1:7890';

const agent = new HttpProxyAgent(proxyUrl);

module.exports.fetch = fetch;
module.exports.agent = agent;