# Tokenized Decentralized University Degree System

This project implements a smart contract for a Tokenized Decentralized University Degree System on the Stacks blockchain. It allows universities to issue verifiable degrees as NFTs, providing a transparent and tamper-proof method of credential verification.

## Features

- University registration by contract owner
- Degree issuance as NFTs by registered universities
- Public degree verification
- Retrieval of degree details and university-issued degrees

## Getting Started

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet)
- [Node.js](https://nodejs.org/) (for running Vitest)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tokenized-university-degrees.git
   cd tokenized-university-degrees
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running Tests

To run the Vitest tests:

```
npm test
```

## Smart Contract Functions

- `register-university`: Register a new university (contract owner only)
- `issue-degree`: Issue a new degree as an NFT (registered universities only)
- `get-degree-details`: Retrieve details of a specific degree
- `get-university-degrees`: Get all degrees issued by a specific university
- `verify-degree`: Verify the authenticity of a degree

## Future Improvements

- Implement staking system for ongoing certification
- Add more metadata fields for degrees
- Implement upgradability pattern for future enhancements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
