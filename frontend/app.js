App = {
  init: async function () {
    console.log('Initializing');
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

        if(data[i].isSold)
        {
          itemTemplate.find(".btn-buy").hide();
        } else {
          itemTemplate.find(".btn-buy").show();
        }

        allItemsDiv.append(itemTemplate.html());
      }
    })

  },
}

$(function () {

  $(window).load(function () {
    App.init()
  })

})