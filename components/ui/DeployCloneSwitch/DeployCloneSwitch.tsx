import React, { Dispatch, SetStateAction } from "react"
import { InputSwitch } from ".."
import { Deployments } from "@components/hooks/purchaseHooks"
import useEthUsd, { formatEthUsd } from "@utils/useEthUsd"

type Props = {
  deployments: Deployments
  clonePurchaseHook: boolean
  setClonePurchaseHook: Dispatch<SetStateAction<boolean>>
}

const DeployCloneSwitch = ({
  deployments,
  clonePurchaseHook,
  setClonePurchaseHook
}: Props) => {
  const calldata = useEthUsd()
  const ethUsd = formatEthUsd(calldata)
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

  return (
    deployments?.factory[chainId] &&
    deployments?.cloner[chainId] && (
      <div className="pt-4">
        <InputSwitch
          label="Deploy as clone"
          questionText={
            <>
              <p>
                Deploying the hook as an immutable clone allows you to reduce
                the cost of deployment, but slightly increases the purchase cost
                for buyers.
              </p>
              <p>
                The cost increase for each buyer is ~5k gas, so 0.0001 ETH (${" "}
                {Math.floor(0.01 * ethUsd) / 100}) with a gas price of 20 gwei.
              </p>
            </>
          }
          enabled={clonePurchaseHook}
          setEnabled={setClonePurchaseHook}
        />
      </div>
    )
  )
}

export default DeployCloneSwitch
