const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const B = artifacts.require("B");
const P = artifacts.require("P");


const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) };

function printObject(b) {
  for (let k in b) {
    console.log(`key = ${k}`);
    if (k !== "contract") {
      console.log(`v = ${JSON.stringify(b[k])}`);
    } else {
      for (let j in b[k]) {
        console.log(`key111 = ${j}`);
        try {
          console.log(`v111 = ${JSON.stringify(b[k][j])}`);
        } catch (e) {
          console.log(`v222 = ${b[k][j]}`)
        }
      }
    }
  }
}

module.exports = async function(deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);

  // const b = await B.new();    <===>     await deployer.deploy(B); 
  //                                   const b = await B.deployed(); 

	const deployedContracts = [];
  const deploy = async (...args) => {
    await deployer.deploy(...args);
    const contract = await B.deployed();
    deployedContracts.push(contract);
    return contract;
  };

  const deployWithNew = async (ContractName, ...args) => {
    const contract = await ContractName.new(...args);
    deployedContracts.push(contract);
    return contract;
  };

  const b = await deploy(B);

  // console.log("b:" + b.address);
  // printObject(b);
  // await deployer.deploy(B);
  // const bb = await B.deployed();
  // console.log("bb:" + bb.address);
  // await deployer.deploy(B);
  // const cc = await B.deployed();
  // console.log("cc:" + cc.address);


  await deployer.deploy(P);
  const p = await P.deployed();
  
  await p.upgradeTo(b.address);
  const impl = await p.implementation();
  console.log("impl = " + impl);
  console.log("p = " + p.address);
  console.log("b = " + b.address);
};
