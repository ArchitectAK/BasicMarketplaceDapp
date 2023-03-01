// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract BasicMarketplace {
    struct Product {
        uint256 id;
        string itemName;
        address creator;
        address owner;
        uint256 askingPrice;
        bool isSold;
    }

    mapping(uint256 => Product) public products;
    uint256 public numProduct;

    event savingsEvent(uint256 indexed _productId);

    constructor() {
        numProduct = 0;
    }
}
