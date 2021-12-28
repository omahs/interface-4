# Slice Interface

Slice frontend application.

- Mainnet: https://slice.so
- Rinkeby: https://testnet.slice.so

## Development

### Installation

1. Create a
   [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) of this repository.
2. Clone your fork and navigate to the root directory.
3. Install project dependencies.

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory which mirrors the `.example.env`
   file. Learn how to define each field in the `.env` file in [Setup](#setup).

### Setup

`Slice-interface` relies on a number of services for development. An apposite infrastructure has been setup to facilitate spinning up the repo for development purposes, as well as a separate set of contracts on Rinkeby appositely for development purposes.

The following sections describe how to set up each service for local
development.

#### Alchemy

Slice uses [Alchemy](https://www.alchemy.com) to connect to an Ethereum network
(mainnet, or one of the testnets).

Take the following steps to create an Alchemy key for local development:

1. Create an account on [Alchemy](https://www.alchemy.com)
2. Create a new App, specifying Rinkeby as network
3. Enter the app and click on **View Key**
4. Copy the HTTP key and paste it into the **NEXT_PUBLIC_NETWORK_URL** in your `.env` file

#### Reach out on Discord

Some environmental variables are not made public due to problems which may arise in the development environment in case of malicious usage.

[Reach out on discord](https://discord.gg/CdyHUzdZks) to introduce yourself in the #dev channel and ask for the missing variables.

### Usage

1. Start the app.

   ```bash
   npm run dev
   ```

## Deployment

Frontend application(s) is hosted on [Vercel](https://vercel.com/) and new versions are automatically deployed when pushed to `main` or `testnet`.
