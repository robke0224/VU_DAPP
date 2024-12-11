# Smart Contracts and Decentralized Applications (DApps) Project

## Table of Contents
- [Overview](#overview)
- [Goals](#goals)
- [Requirements](#requirements)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [References](#references)

## Overview
This project involves the creation of a **Smart Contract** using Solidity to implement business logic securely and reliably on the Ethereum blockchain. A **Decentralized Application (DApp)** is also developed to facilitate interaction with the smart contract through a front-end interface.

## Goals
- Implement a smart contract that ensures secure and reliable transactions between parties.
- Develop a front-end application for users to interact with the smart contract.
- Test the smart contract on both local and public Ethereum test networks.

## Requirements
- [Remix IDE](https://remix.ethereum.org/) for smart contract development.
- [Truffle Suite](https://www.trufflesuite.com/) for testing and deployment.
- [Ganache](https://www.trufflesuite.com/ganache) for local Ethereum testing.
- [MetaMask](https://metamask.io/) to interface with Ethereum networks.
- An Ethereum test network (e.g., Goerli) for public testing.

## Features
1. **Smart Contract**:
   - Implements business logic for a secure purchase/delivery process involving buyer, seller, and courier.
   - Ensures trustless interactions using Ethereum blockchain.

2. **DApp Front-End**:
   - Minimalist design to interact with the smart contract.
   - Extended functionality (optional) with enhanced features and UI.

3. **Testing**:
   - Local testing using Ganache.
   - Public testing on Goerli network with Etherscan logs.

## Technologies Used
- **Programming Language**: Solidity
- **Development Tools**: Remix IDE, Truffle Suite
- **Blockchain Platform**: Ethereum
- **Testing Tools**: Ganache, MetaMask
- **Front-End Framework**: (Choose your framework, e.g., React, Vue.js, or HTML/CSS/JavaScript)

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/robke0224/VU_DAPP/tree/v0.2

2. Install Dependencies
  Run the following command to install required dependencies:
  ```bash
  npm install
   ```
3. Set up the development environment:

      Install Truffle:
        ```bash
           npm install -g truffle
       ```
      Install Ganache.
      Install the MetaMask browser extension.

4. Compile the smart contract:
         ```bash
            truffle compile
         ```
5. Deploy the smart contract:
         ```bash
            truffle migrate
         ```
6. Start the local server for the DApp front-end:
         ```bash
            npm start
         ```




