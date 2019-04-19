var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var DiplomaViewer = artifacts.require("./DiplomaViewer.sol");
var Institution = artifacts.require("./Institution.sol");
var Person = artifacts.require("./Person.sol");
var PlatForm = artifacts.require("./Platform.sol");

module.exports = function(deployer) {
  deployer.deploy(PlatForm)
  // .then(() => deployer.deploy(DiplomaViewer))
  // .then(() => deployer.deploy(Institution))
  // .then(() => deployer.deploy(Person))
};
