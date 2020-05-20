const Web3 = require('web3');
const B = artifacts.require("B");
const P = artifacts.require("P");

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

const myWeb3 = new Web3(web3.currentProvider);
contract('P', (accounts) => {
  console.log(JSON.stringify(accounts));
  describe('setA', () => {
    it('setA ', async () => {
      const b = await B.deployed();
      const p = await P.deployed();
      console.log("p = " + p.address);
      console.log("p impl= " + await p.implementation.call());

      const bp = await B.at(p.address);
      const result = await bp.setA(100,{from: "0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e"});
      // console.log(JSON.stringify(result));
      const balance = await bp.a();
      console.log("balance:" + balance);
      // printObject(bp);

      console.log("b = " + b.address);
      console.log("bp = " + bp.address);
      

      assert.equal(100, balance);
    });
  });
});