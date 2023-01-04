import { Input, InputSwitch } from "@components/ui"
import { useEffect, useState } from "react"
import { defaultExternalCall, Hook, HookProps } from "../purchaseHooks"

import clonerInterface from "./abi/cloner.json"
import factoryInterface from "./abi/factory.json"
import deployments from "./deployments.json"

const label = "NFT Mint (ERC721A)"

const description =
  "Deploys an ERC721A contract which efficiently mints 1 NFT for each unit purchased."

const Component = ({ setParams }: HookProps) => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [uri, setUri] = useState("")
  const [isBaseUri, setIsBaseUri] = useState(false)

  useEffect(() => {
    setParams({
      externalCall: defaultExternalCall,
      deploy: {
        deployments,
        abi: {
          clonerInterface: clonerInterface.abi,
          factoryInterface: factoryInterface.abi
        },
        args: [
          name,
          symbol,
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
          placeholder="My contract"
        />
      </div>
      <div>
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="MYCONTRACT"
        />
      </div>
      <InputSwitch
        label="Concatenated URI"
        questionText={
          <>
            <p>
              If enabled, the provided token URI is concatenated with the
              tokenId. As a result, each NFT can have unique metadata.
            </p>
            <p>
              If disabled, the provided token URI is used for all NFTs. As a
              result, all NFT will share the same metadata.
            </p>
            <p>
              If disabled, the provided token URI is used for all NFTs. As a
              result, all NFT will share the same metadata.
            </p>
          </>
        }
        enabled={isBaseUri}
        setEnabled={setIsBaseUri}
      />
      <div>
        <Input
          label="Token URI"
          value={uri}
          onChange={setUri}
          placeholder="Qm..."
        />
      </div>
    </>
  )
}

const hook: Hook = { label, description, Component, deployments }

export default hook
