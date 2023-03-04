App = {
  contract: {},
  init: async function () {
    console.log('Initializing');

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText = "Your wallet address is: " + userAddress;

    const resourceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa";

    $.getJSON('../artifacts/contracts/BasicMarketplace.sol/BasicMarketplace.json', function (BasicMarketplaceArtifact) {
      const contract = new ethers.Contract(resourceAddress, BasicMarketplaceArtifact.ABI, signer);

      App.contract = contract;

      const allItemsDiv = $("#all-items");
      const itemTemplate = $("#item-template");
      for (let i = 0; i < BasicMarketplaceArtifact.length; i++) {
        itemTemplate.find(".item-name").text(BasicMarketplaceArtifact[i].itemName)
        itemTemplate.find(".item-creator").text(BasicMarketplaceArtifact[i].itemCreator)
        itemTemplate.find(".item-owner").text(BasicMarketplaceArtifact[i].itemOwner)
        itemTemplate.find(".asking-price").text(BasicMarketplaceArtifact[i].askingPrice)
        itemTemplate.find(".item-status").text(BasicMarketplaceArtifact[i].isSold ? 'sold' : 'available')
        itemTemplate.find(".btn-buy").attr("data-id", BasicMarketplaceArtifact[i].id);

        if (BasicMarketplaceArtifact[i].isSold) {
          itemTemplate.find(".btn-buy").hide();
        } else {
          itemTemplate.find(".btn-buy").show();
        }

        allItemsDiv.append(itemTemplate.html());
      }
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-add", App.handleAdd);
    $(document).on("click", ".btn-buy", { id: this.id }, App.handleBuy);
  },

  handleAdd: function () {
    console.log('Add clicked')
  },

  handleBuy: function (event) {
    const productId = parseInt($(event.target).data("id"));
    console.log('Buy clicked', productId)
  }
}

$(function () {

  $(window).load(function () {
    App.init()
  })

})