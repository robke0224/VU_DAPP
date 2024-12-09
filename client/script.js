import Web3 from 'web3';
import configuration from '../build/contracts/Tickets.json';
import 'bootstrap/dist/css/bootstrap.css';
import ticketImage from './images/ticket.jpg';

const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');
const connectWalletButton = document.getElementById('connectWallet');
const TOTAL_TICKETS = 10;
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

const buyTicket = async (ticket) => {
  await contract.methods
    .buyTicket(ticket.id)
    .send({ from: account, value: ticket.price });
};

const refreshTickets = async () => {
  ticketsEl.innerHTML = '';
  for (let i = 0; i < TOTAL_TICKETS; i++) {
    const ticket = await contract.methods.tickets(i).call();
    ticket.id = i;
    if (ticket.owner === EMPTY_ADDRESS) {
      const ticketEl = createElementFromString(
        `<div class="ticket card" style="width: 18rem;">
          <img src="${ticketImage}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Ticket</h5>
            <p class="card-text">${ticket.price / 1e18} Eth</p>
            <button class="btn btn-primary">Buy Ticket</button>
          </div>
        </div>`
      );
      ticketEl.onclick = buyTicket.bind(null, ticket);
      ticketsEl.appendChild(ticketEl);
    }
  }
};

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await web3.eth.requestAccounts();
      account = accounts[0];
      accountEl.innerText = `Connected: ${account}`;
      console.log('Prisijungta prie paskyros:', account);

      // Užkrauk bilietus
      await refreshTickets();
    } catch (error) {
      console.error('Klaida jungiantis prie MetaMask:', error);
    }
  } else {
    alert('MetaMask nerastas! Prašome įdiegti MetaMask plėtinį.');
  }
};

// Pridėk įvykio klausytoją
connectWalletButton.addEventListener('click', connectWallet);

// Pradinis paleidimas
const main = async () => {
  await refreshTickets();
};

main();
