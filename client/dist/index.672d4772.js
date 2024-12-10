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
    },
    {
        "inputs": [],
        "name": "getAvailableTickets",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = "0x1Ec038A4a0253c88c95953002fA11881925C37d1";
let web3;
let ticketsContract;
// Connect wallet
document.getElementById("connect-wallet").addEventListener("click", async ()=>{
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        document.getElementById("wallet-info").innerText = `Connected: ${accounts[0]}`;
        ticketsContract = new web3.eth.Contract(contractABI, contractAddress);
        loadAvailableTickets();
    } else alert("Please install MetaMask to use this DApp.");
});
// Load available tickets
async function loadAvailableTickets() {
    if (!ticketsContract) {
        alert("Please connect your wallet first.");
        return;
    }
    console.log("Fetching available tickets...");
    const tickets = await ticketsContract.methods.getAvailableTickets().call();
    console.log("Available tickets:", tickets);
    const ticketList = document.getElementById("available-tickets");
    ticketList.innerHTML = "";
    tickets.forEach((ticketId)=>{
        const listItem = document.createElement("li");
        listItem.textContent = `Ticket ID: ${ticketId}`;
        ticketList.appendChild(listItem);
    });
}
// Buy ticket
document.getElementById("buy-ticket").addEventListener("click", async ()=>{
    const ticketId = document.getElementById("ticket-id").value;
    if (!ticketId) {
        alert("Please enter a valid ticket ID.");
        return;
    }
    const accounts = await web3.eth.getAccounts();
    const ticketPrice = web3.utils.toWei("0.1", "ether");
    await ticketsContract.methods.buyTicket(ticketId).send({
        from: accounts[0],
        value: ticketPrice
    });
    alert("Ticket purchased successfully!");
    loadAvailableTickets();
});

//# sourceMappingURL=index.672d4772.js.map
