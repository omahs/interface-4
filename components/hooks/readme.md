# Purchase hooks

Purchase hooks in this folder will be added as official hooks on the Slice interface, appearing when creating a new product.

## How to add a hook

1. Add your purchase hook to the [contracts-hooks repo](https://github.com/slice-so/contracts-hooks) with a PR
2. Add a folder named like your purchase hook, containing the following files:

- `{YourHook}.tsx`: The component that will be displayed in the frontend
- `cloneInterface.json`: The interface of the factory contract used for your hook (you'll find it after compiling the contracts in `artifacts/contracts/hooks/{YourHook}/{YourHookFactory}.sol/{YourHookFactory}.json`)
- `index.ts`: Export component

3. Export component in `components/hooks/index.ts`

## How to write component

The component will be rendered in the Add product page, in the `Purchase Hooks` section. It will need to export the following

- `component`: The component to be rendered on page
- `label`: Text inside the hook card
- `description`: Short description of the hook
- `factoryAddresses`: List of deployments for each chainId (1 for ETH mainnet, 4 for Rinkeby)

> Hint: keep the component minimal and use the existing ones as reference, like [ERC20Gated](ERC20Gated/ERC20Gated.tsx) or [Allowlisted](Allowlisted/Allowlisted.tsx)

### Set params correctly

The `params` object defines what happens when the user submits the form and creates the product. In your component you can use `setParams` to set it.

You can set 3 keys in the `params` object:

- `externalCall`: Defines the params of the purchase hook that will be called during purchase. In most cases, you can use `defaultExternalCall`.
- `deploy` (optional): If present, deploys and initializes the contract via a pre-deployed factory contract.
- `allowedAddresses` (optional): Addresses used on the frontend to generate from the connected account a Merkle proof verification and send it as `buyerCustomData` param

You can use the `Params` type as reference for the various fields

```ts
type Params = {
  externalCall: {
    data: BytesLike // `slicerCustomData` in purchase hook. Default: []
    value: BigNumberish // Wei amount to be sent to the contract. Default: 0
    externalAddress: string // Contract called upon purchase. Default: ZeroAddress
    checkFunctionSignature: BytesLike // Selector of function to call from the frontend to check requirements are met. Default: "0x95db9368"
    execFunctionSignature: BytesLike //  Selector of function called during product purchase. Default: "0xa23fffb9"
  }
  deploy?: {
    factoryAddresses?: { [chainId: number]: string } // Deployment addresses of factory contracts based on chainId
    abi: ContractInterface // factory contract abi
    args: any[] // Initialization params (excluding productsModule address and slicerId)
  }
  allowedAddresses?: string[] // Array of allowlisted addresses
}
```
