# Tron CREATE2

A smart contract implementation for deterministic contract deployment on the TRON blockchain using CREATE2 opcode pattern.

## Overview

This project provides a CREATE2 implementation for TRON, enabling deterministic address calculation and deployment of contracts. With CREATE2, you can predict contract addresses before deployment and ensure the same address across different networks when using the same bytecode and salt.

## Features

- **Deterministic Deployment**: Deploy contracts to predictable addresses using CREATE2
- **Address Prediction**: Calculate contract addresses before deployment
- **Clone Pattern**: Efficient minimal proxy pattern implementation

## Prerequisites

- Node.js >= 14.0.0
- PNPM or NPM
- TronBox CLI
- TRX for deployment and testing on Shasta testnet

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tron-create2.git
cd tron-create2

# Install dependencies
pnpm install
```

## Configuration

1. Create a `.env` file in the root directory:

```env
PRIVATE_KEY=your_private_key_here
```

2. Configure your network settings in `tronbox.js` if needed.

## Usage

### Compile Contracts

```bash
pnpm compile
```

### Deploy Contracts

Deploy to Shasta testnet:

```bash
pnpm migrate
```

### Run Tests

```bash
pnpm test
```

## Contract Architecture

### Core Contracts

- **Demo.sol**: Main contract demonstrating CREATE2 deployment functionality
  - `getPredictAddress()`: Calculate deterministic address before deployment
  - `deploy()`: Deploy contract using CREATE2 with specified salt

- **Template.sol**: Example implementation contract that can be cloned
  - Simple ownership management
  - Demonstrates contract initialization pattern

- **Clones.sol**: Library implementing the CREATE2 clone pattern
  - Minimal proxy pattern for gas-efficient deployments
  - Deterministic address calculation

## How It Works

1. **Address Prediction**: Before deploying, you can calculate the exact address where your contract will be deployed using the implementation bytecode and a salt value.

2. **Deterministic Deployment**: Using the same implementation and salt will always result in the same contract address, making deployments predictable and repeatable.

3. **Clone Pattern**: Instead of deploying full contract bytecode each time, the system deploys minimal proxies that delegate calls to an implementation contract, saving significant gas costs.