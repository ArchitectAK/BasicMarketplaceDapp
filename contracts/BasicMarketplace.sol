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
        addProduct("Product 1", 100);
    }

    function addProduct(string memory itemName, uint256 askingPrice) public {
        Product storage product = products[numProduct];

        product.creator = msg.sender;
        product.owner = msg.sender;
        product.askingPrice = askingPrice;
        product.itemName = itemName;
        product.isSold = false;

        products[numProduct] = Product(
            numProduct,
            product.itemName,
            product.creator,
            product.owner,
            product.askingPrice,
            product.isSold
        );

        numProduct++;
    }

    function getProduct(
        uint256 productId
    ) public view returns (Product memory) {
        return products[productId];
    }

    function getProducts() public view returns (Product[] memory) {
        Product[] memory productList = new Product[](numProduct);
        for (uint256 i = 0; i < numProduct; i++) {
            Product storage product = products[i];
            productList[i] = product;
        }

        return productList;
    }

    function sellProduct(uint256 productId) public {
        Product storage product = products[productId];
        product.owner = msg.sender;
        product.isSold = true;
    }
}
