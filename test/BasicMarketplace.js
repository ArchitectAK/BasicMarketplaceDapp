const { except } = require("chai");
const { ethers } = require("hardhat");
const { describe, it } = require("mocha");

describe("BasicMarketplace", function () {
  it("Should return a new product once deployed", async function () {
    const Contract = await ethers.getContractFactory("BasicMarketplace");
    const contract = await Contract.deploy();
    await contract.deployed()

    except(await contract.numProduct()).to.equal(1);
  })

})