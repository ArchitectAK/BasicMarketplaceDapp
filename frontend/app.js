App = {
  contract: {},
  init: async function () {
    console.log('Initializing');

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText = "Your wallet address is: " + userAddress;

    const resourceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    $.getJSON("../artifacts/contracts/BasicMarketplace.sol/BasicMarketplace.json", function (BasicMarketplaceArtifact) {
      const contract = new ethers.Contract(resourceAddress, BasicMarketplaceArtifact.abi, signer);

      App.contract = contract;

      contract.getProducts().then(data => {
        console.log(data);

        const allItemsDiv = $("#all-items");
        const itemTemplate = $("#item-template");
        for (let i = 0; i < data.length; i++) {
          itemTemplate.find(".item-name").text(data[i].itemName)
          itemTemplate.find(".item-creator").text(data[i].creator)
          itemTemplate.find(".item-owner").text(data[i].owner)
          itemTemplate.find(".asking-price").text(data[i].askingPrice)
          itemTemplate.find(".item-status").text(data[i].isSold ? 'sold' : 'available')
          itemTemplate.find(".btn-buy").attr("data-id", data[i].id);

          if (data[i].isSold) {
            itemTemplate.find(".btn-buy").hide();
          } else {
            itemTemplate.find(".btn-buy").show();
          }

          allItemsDiv.append(itemTemplate.html());
        }
      })
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-add", App.handleAdd);
    $(document).on("click", ".btn-buy", { id: this.id }, App.handleBuy);
  },

  handleAdd: function () {
    console.log('Add clicked');
    const newItemName = $("#new-item-name").val();
    const newAskingPrice = $("#new-asking-prices").val();

    App.contract.addProduct(newItemName, newAskingPrice);
  },

  handleBuy: function (event) {
    const productId = parseInt($(event.target).data("id"));
    console.log('Buy clicked', productId);

    App.contract.sellProduct(productId);

  }
}

$(function () {

  $(window).load(function () {
    App.init()
  })

})