/** @type import('hardhat/config').HardhatUserConfig */

import "@nomiclabs/hardhat-waffle";

export const solidity = "0.8.17";
export const networks = {
  hardhat: {
    chainId: 31337,
  }
};
