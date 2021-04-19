const Gift = artifacts.require("GiftCard");

contract("GiftCard", async function(accounts){


    it(
        "Issue a Gift card", async function(){
            let instance = await Gift.deployed()  
            await instance.GiftCardbBuyFee( {from: accounts[0], value: 1675656656455544232});
    });

    it(
        "Transfer the Gift card", async function(){
            let instance = await Gift.deployed()            
            await instance.transferGiftCardTo(accounts[1], {from: accounts[0]});
    });

    





});