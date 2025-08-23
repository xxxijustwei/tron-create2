const Demo = artifacts.require('./Demo.sol');
const Template = artifacts.require('./Template.sol');
const { TronWeb } = require('tronweb');
const { stringToHex } = require('../lib/helpers');

const tronWeb = new TronWeb({
  fullHost: 'https://api.shasta.trongrid.io',
  privateKey: process.env.PRIVATE_KEY_SHASTA,
});

contract('Demo', (accounts) => {
  let demoInstance;
  let templateInstance;
  const owner = accounts[0];

  before(async () => {
    demoInstance = await Demo.deployed();
    templateInstance = await Template.deployed();
    console.log('Demo contract address (hex):', demoInstance.address);
    console.log('Demo contract address (base58):', tronWeb.address.fromHex(demoInstance.address));
    console.log('Template contract address (hex):', templateInstance.address);
    console.log('Template contract address (base58):', tronWeb.address.fromHex(templateInstance.address));
  });

  describe('Clone2 functionality', () => {
    it('should predict and deploy to the same address', async () => {
      // Generate a random salt
      const salt = `0x${stringToHex(crypto.randomUUID().replaceAll('-', ''), 32)}`;
      console.log('Using salt:', salt);

      // Get predicted address
      const predictedAddress = await demoInstance.getPredictAddress(templateInstance.address, salt);
      console.log('Predicted address (hex):', predictedAddress);
      console.log('Predicted address (base58):', tronWeb.address.fromHex(predictedAddress));

      // Deploy clone with same salt
      const tx = await demoInstance.deploy(templateInstance.address, salt);
      const events = await waitForTransaction(tx);
      const deployedAddress = `41${events.data[0].result[0].slice(2)}`;

      console.log('Deployed address (hex):', deployedAddress);
      console.log('Deployed address (base58):', tronWeb.address.fromHex(deployedAddress));

      // Verify addresses match
      assert.equal(
        predictedAddress.toLowerCase(),
        deployedAddress.toLowerCase(),
        'Predicted and deployed addresses should match'
      );
    });
  });
});

async function waitForTransaction(tx) {
  let attempts = 0;
  while (attempts < 20) {
    const res = await tronWeb.event.getEventsByTransactionID(tx, { only_unconfirmed: true });
    if (res.data && res.data.length > 0) {
      return res;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  throw new Error('Transaction event not found');
}