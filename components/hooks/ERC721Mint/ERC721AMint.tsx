import { Input, InputSwitch } from "@components/ui"
import { useEffect, useState } from "react"
import { defaultExternalCall, Hook, HookProps } from "../purchaseHooks"

import clonerInterface from "./abi/cloner.json"
import factoryInterface from "./abi/factory.json"
import deployments from "./deployments.json"

const label = "Mint NFT (ERC721A)"

const description =
  "Deploys an ERC721A contract which efficiently mints 1 NFT for each unit purchased."

const Component = ({ setParams }: HookProps) => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [isRoyalty, setIsRoyalty] = useState(false)
  const [royaltyFraction, setRoyaltyFraction] = useState(10)
  const [uri, setUri] = useState("")
  const [isBaseUri, setIsBaseUri] = useState(false)

  useEffect(() => {
    setParams({
      externalCall: {
        ...defaultExternalCall,
        checkFunctionSignature: "0x00000000"
      },
      deploy: {
        deployments,
        abi: {
          clonerInterface: clonerInterface.abi,
          factoryInterface: factoryInterface.abi
        },
        args: [
          name,
          symbol,
          isRoyalty ? royaltyFraction * 100 : 0,
          isBaseUri ? `ipfs://${uri}/` : "",
          isBaseUri ? "" : `ipfs://${uri}`
        ]
      }
    })
  }, [name, symbol, isBaseUri, uri])

  return (
    <>
      <div>
        <Input
          label="Name"
          value={name}
          onChange={setName}
          placeholder="My NFT collection"
          required
        />
      </div>
      <div>
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="MYNFT"
          required
        />
      </div>
      <InputSwitch
        label="On-chain royalties"
        questionText={
          <>
            <p>
              Defines owner royalties of secondary sales on marketplaces that
              support the ERC2981 standard.
            </p>
            <p>
              Note that ERC2981 is a way to signal royalty information, and does
              not enforce its payment. In NFT marketplaces that don&apos;t
              support the standard, such as Opensea, the contract owner will
              need to set up royalties manually on their website.
            </p>
          </>
        }
        enabled={isRoyalty}
        setEnabled={setIsRoyalty}
      />
      {isRoyalty && (
        <div>
          <Input
            type="number"
            label="Royalty (%)"
            value={royaltyFraction}
            onChange={setRoyaltyFraction}
            step={0.1}
            max={100}
            min={0}
            placeholder="10"
            required
          />
        </div>
      )}
      <InputSwitch
        label="Variable metadata"
        questionText={
          <>
            <p>If disabled, all NFTs will have the same metadata.</p>
            <p>
              If enabled, the tokenId is appended to the provided CID. As a
              result, each NFT can have unique metadata (useful for
              collections).
            </p>
            <p>
              So a <b>Qm...</b> CID will become <b>ipfs://Qm.../[tokenId]</b>{" "}
              when enabled, or <b>ipfs://Qm...</b> when disabled.
            </p>
          </>
        }
        enabled={isBaseUri}
        setEnabled={setIsBaseUri}
      />
      <div className="flex items-center !mt-0">
        <span className="flex-grow">
          <Input
            label="Token URI"
            prefix="ipfs://"
            after="/{tokenId}"
            value={uri}
            onChange={setUri}
            required
            placeholder="Qm..."
            question={
              <>
                <p>
                  This is the IPFS hash containing the metadata of your NFT
                  collection.
                </p>
                <p>
                  You can create it on services like{" "}
                  <a
                    href="https://nft.storage/"
                    target="_blank"
                    rel="noreferrer"
                    className="highlight"
                  >
                    nft.storage
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://www.pinata.cloud/</p>"
                    target="_blank"
                    rel="noreferrer"
                    className="highlight"
                  >
                    pinata.cloud
                  </a>
                  .
                </p>
              </>
            }
          />
        </span>
        {isBaseUri && (
          <p className="flex-grow-0 mt-8 ml-2 text-sm text-gray-500 sm:ml-4">
            / {"{tokenId}"}
          </p>
        )}
      </div>
    </>
  )
}

const hook: Hook = { label, description, Component, deployments }

export default hook
