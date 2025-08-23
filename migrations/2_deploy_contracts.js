const Demo = artifacts.require('./Demo.sol');
const Template = artifacts.require('./Template.sol');

module.exports = async function (deployer) {
  await deployer.deploy(Demo);
  const demoInstance = await Demo.deployed();
  await deployer.deploy(Template, demoInstance.address);
};
