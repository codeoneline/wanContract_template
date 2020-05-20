const B = artifacts.require("B");

// 0x92AD67637eD46257636E11364DaF0988b8ccAD2F
contract('B', (accounts) => {
  console.log(JSON.stringify(accounts))
  describe('setA', () => {
    it('setA 2', async () => {
      const b = await B.deployed();
      console.log("b2 = " + b.address);
      await b.setA(200);
      const aBalance = await b.a();
      assert.equal(200, aBalance);
    });

    it('setA ', async () => {
      const b = await B.deployed();
      console.log("b = " + b.address);
      await b.setA(100);
      const aBalance = await b.a();
      assert.equal(100, aBalance);
    });
  });
});