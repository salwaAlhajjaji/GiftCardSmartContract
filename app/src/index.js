import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/GiftCard.json";

const App = {
  web3: null,
  account:null,
  meta: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  GiftCardbBuyFee: async function() {
  var status = document.getElementById("msg");
  status.value = "Creating Gift Card ... (please wait)";
  var amount = document.getElementById("amount").value;

  const { GiftCardbBuyFee } = this.meta.methods;
  await GiftCardbBuyFee().send({ from: this.account, value: amount});
  status.innerHTML = "Creating Gift Card complete!";
},

transferGiftCardTo: async function() {
  var status = document.getElementById("msg");
  status.value = "Transfer Gift Card ... (please wait)";
  var walletAddress = document.getElementById("walletAddress").value;

  const { transferGiftCardTo } = this.meta.methods;
  await transferGiftCardTo(walletAddress).send({ from: this.account});
  status.innerHTML = "Transfer Gift Card complete!";
},

withdrawMerchantBalance: async function() {
  var status = document.getElementById("msg");
  status.value = "Withdraw from Gift Card ... (please wait)";
  var withdrawAmount = document.getElementById("withdrawAmount").value;

  const { withdrawMerchantBalance } = this.meta.methods;
  await withdrawMerchantBalance(withdrawAmount).send({from: this.account});
  status.innerHTML = "Withdraw from Gift Card complete!";
},

GiftCardAddFee: async function() {
  var status = document.getElementById("msg");
  status.value = "Add Funds to Gift Card ... (please wait)";
  var addAmount = document.getElementById("addAmount").value;

  const { GiftCardAddFee } = this.meta.methods;
  await GiftCardAddFee(addAmount).send({from: this.account,value: addAmount});
  status.innerHTML = "Add Funds to Gift Card complete!";
},


};


window.App = App;
// Not the same local
window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
      // new Web3.providers.HttpProvider("http://127.0.0.1:5500/"),

    );
  }

  App.start();
});
