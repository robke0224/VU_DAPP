// Import Web3.js
import Web3 from "web3";

// Your smart contract's ABI and address
const contractABI = [ 

    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ];
const contractAddress = "0x1Ec038A4a0253c88c95953002fA11881925C37d1"; 

// Global variables
let web3;
let contract;
let userAddress;

/**
 * Initializes Web3 and connects to MetaMask.
 */
async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum); // Connect Web3 to MetaMask

    try {
      // Request account connection from MetaMask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      userAddress = accounts[0]; // Get the first connected account

      // Store user address in local storage
      localStorage.setItem("userAddress", userAddress);

      // Initialize the smart contract
      contract = new web3.eth.Contract(contractABI, contractAddress);

      console.log("MetaMask connected, user address:", userAddress);
      updateUserInterface(); // Update UI with user information
    } catch (error) {
      alert("Failed to connect MetaMask. Please try again.");
      console.error("MetaMask connection error:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask to use this DApp.");
    console.error("MetaMask is not detected.");
  }
}

/**
 * Connects the wallet, retrieves user balance, and validates connection.
 */
async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request accounts from MetaMask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      userAddress = accounts[0];

      // Store user address in local storage
      localStorage.setItem("userAddress", userAddress);

      // Fetch user balance
      const balance = await web3.eth.getBalance(userAddress);
      const balanceInEth = web3.utils.fromWei(balance, "ether"); // Convert balance to Ether

      // Update the UI
      document.getElementById(
        "user-avatar"
      ).src = `https://avatars.dicebear.com/api/identicon/${userAddress}.svg`;
      document.getElementById(
        "user-address"
      ).textContent = `Address: ${userAddress}`;
      document.getElementById(
        "user-balance"
      ).textContent = `Balance: ${balanceInEth} ETH`;
      document.getElementById("user-profile").style.display = "block";

      console.log(`Connected with address: ${userAddress}`);
      console.log(`Balance: ${balanceInEth} ETH`);
    } catch (error) {
      alert("Failed to connect MetaMask. Please try again.");
      console.error("MetaMask connection error:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask to use this DApp.");
    console.error("MetaMask is not detected.");
  }
}

/**
 * Updates the user interface with wallet information.
 */
async function updateUserInterface() {
  try {
    const balance = await web3.eth.getBalance(userAddress);
    const balanceInEth = web3.utils.fromWei(balance, "ether");

    document.getElementById(
      "user-avatar"
    ).src = `https://avatars.dicebear.com/api/identicon/${userAddress}.svg`;
    document.getElementById(
      "user-address"
    ).textContent = `Address: ${userAddress}`;
    document.getElementById(
      "user-balance"
    ).textContent = `Balance: ${balanceInEth} ETH`;
    document.getElementById("user-profile").style.display = "block";
  } catch (error) {
    console.error("Error updating user interface:", error);
  }
}

/**
 * Verifies if the wallet is connected.
 */
function isWalletConnected() {
  const storedAddress = localStorage.getItem("userAddress");
  return storedAddress !== null;
}

/**
 * Loads the DApp interface.
 */
function loadDApp() {
  if (isWalletConnected()) {
    userAddress = localStorage.getItem("userAddress");
    updateUserInterface();
  } else {
    alert("Please connect your wallet to use this DApp.");
  }
}

// Initialize Web3 and load the DApp
initWeb3();
