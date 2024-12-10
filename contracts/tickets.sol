// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tickets {
    uint256 public constant TOTAL_TICKETS = 20;
    uint256 public constant DEFAULT_PRICE = 0.1 ether;

    address public owner;

    struct Ticket {
        uint256 price;
        address owner;
    }

    mapping(uint256 => Ticket) public tickets;

    event TicketPurchased(uint256 indexed ticketId, address indexed buyer, uint256 price);
    event TicketPriceUpdated(uint256 indexed ticketId, uint256 oldPrice, uint256 newPrice);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
            tickets[i] = Ticket({
                price: DEFAULT_PRICE,
                owner: address(0)
            });
        }
    }

    /**
     * @dev Purchase a ticket if it's available and the price is met.
     * @param _ticketId The ID of the ticket to purchase.
     */
    function buyTicket(uint256 _ticketId) external payable {
        require(_ticketId < TOTAL_TICKETS, "Invalid ticket ID");
        require(tickets[_ticketId].owner == address(0), "Ticket already sold");
        require(msg.value >= tickets[_ticketId].price, "Insufficient funds sent");

        // Update ownership before transferring funds to avoid reentrancy
        tickets[_ticketId].owner = msg.sender;

        // Refund any overpayment
        if (msg.value > tickets[_ticketId].price) {
            uint256 refund = msg.value - tickets[_ticketId].price;
            payable(msg.sender).transfer(refund);
        }

        emit TicketPurchased(_ticketId, msg.sender, tickets[_ticketId].price);
    }

    /**
     * @dev Update the price of a ticket.
     * @param _ticketId The ID of the ticket.
     * @param _newPrice The new price for the ticket.
     */
    function updateTicketPrice(uint256 _ticketId, uint256 _newPrice) external onlyOwner {
        require(_ticketId < TOTAL_TICKETS, "Invalid ticket ID");
        uint256 oldPrice = tickets[_ticketId].price;
        tickets[_ticketId].price = _newPrice;

        emit TicketPriceUpdated(_ticketId, oldPrice, _newPrice);
    }

    /**
     * @dev Withdraw all contract funds to the owner's address.
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner).transfer(balance);

        emit FundsWithdrawn(owner, balance);
    }

    /**
     * @dev Check if a specific ticket is available for purchase.
     * @param _ticketId The ID of the ticket.
     * @return True if the ticket is available, false otherwise.
     */
    function isTicketAvailable(uint256 _ticketId) external view returns (bool) {
        require(_ticketId < TOTAL_TICKETS, "Invalid ticket ID");
        return tickets[_ticketId].owner == address(0);
    }

    /**
     * @dev Get a list of available tickets for purchase.
     * @return An array of ticket IDs that are available.
     */
   function getAvailableTickets() external view returns (uint256[] memory) {
    uint256 availableCount = 0;

    // Count available tickets
    for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
        if (tickets[i].owner == address(0)) {
            availableCount++;
        }
    }

    uint256[] memory availableTickets = new uint256[](availableCount);
    uint256 index = 0;

    // Populate available ticket IDs
    for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
        if (tickets[i].owner == address(0)) {
            availableTickets[index] = i;
            index++;
        }
    }

    return availableTickets;
}


    /**
     * @dev Get ticket details by ID.
     * @param _ticketId The ID of the ticket.
     * @return price The price of the ticket.
     * @return ticketOwner The current owner of the ticket.
     */
    function getTicketDetails(uint256 _ticketId)
        external
        view
        returns (uint256 price, address ticketOwner)
    {
        require(_ticketId < TOTAL_TICKETS, "Invalid ticket ID");
        Ticket memory ticket = tickets[_ticketId];
        return (ticket.price, ticket.owner);
    }

    /**
     * @dev Transfer ownership of the contract to a new owner.
     * @param _newOwner The address of the new owner.
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address");
        owner = _newOwner;
    }
}
