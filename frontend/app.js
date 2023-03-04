App = {
  init: async function () {
    console.log('Initializing');

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText = "Your wallet address is: " + userAddress;


    $.getJSON("../sampleData.json", function (data) {
      console.log(data);
      const allItemsDiv = $("#all-items");
      const itemTemplate = $("#item-template");
      for (let i = 0; i < data.length; i++) {
        itemTemplate.find(".item-name").text(data[i].itemName)
        itemTemplate.find(".item-creator").text(data[i].itemCreator)
        itemTemplate.find(".item-owner").text(data[i].itemOwner)
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
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-add", App.handleAdd);
    $(document).on("click", ".btn-buy", {id: this.id }, App.handleBuy);
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