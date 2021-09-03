import { Dispatch, SetStateAction } from "react"
import Input from "../Input"
import { InputPrice, InputSwitch } from "@components/ui"

type Props = {
  isSingle: boolean
  isLimited: boolean
  units: number
  ethValue: number
  usdValue: number
  isUSD: boolean
  loading: boolean
  setIsSingle: Dispatch<SetStateAction<boolean>>
  setIsLimited: Dispatch<SetStateAction<boolean>>
  setUnits: Dispatch<SetStateAction<number>>
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  setIsUSD: Dispatch<SetStateAction<boolean>>
}

const AddProductFormPrice = ({
  isSingle,
  isLimited,
  units,
  ethValue,
  usdValue,
  isUSD,
  loading,
  setIsSingle,
  setIsLimited,
  setUnits,
  setEthValue,
  setUsdValue,
  setIsUSD,
}: Props) => {
  return (
    <>
      <h2 className="pb-6">Price and details</h2>
      <div>
        <InputSwitch
          label="Single purchase"
          questionText={
            <>
              <p>
                If enabled, each user will be able to buy this product only
                once.
              </p>
            </>
          }
          enabled={isSingle}
          setEnabled={setIsSingle}
        />
        <InputSwitch
          label="Limited availability"
          questionText={
            <>
              <p className="pb-4">
                If enabled, purchases will be disabled once available units drop
                to 0.
              </p>
              <p>
                <b>Note:</b> As a creator, you will be able to set a new amount
                of available units.
              </p>
            </>
          }
          enabled={isLimited}
          setEnabled={setIsLimited}
        />
        {isLimited && (
          <div className="pt-5 pb-0">
            <Input
              label="Available units for sale"
              type="number"
              value={units}
              onChange={setUnits}
            />
          </div>
        )}
      </div>
      <InputPrice
        ethValue={ethValue}
        setEthValue={setEthValue}
        usdValue={usdValue}
        setUsdValue={setUsdValue}
        loading={loading}
        label="Price"
      />
      <InputSwitch
        label="Dynamic pricing"
        questionText={
          <>
            <p className="pb-4">
              If enabled, it&apos;s like setting the product price in USD. The
              user will always pay in ETH the corresponding USD value set (
              <b>${usdValue / 100}</b>). This can be useful to protect against
              changes in ETH value over time.
            </p>
            <p className="pb-4">
              <b>Note:</b> Products with dynamic pricing have a higher
              transaction fee for the buyer.
            </p>
            <p>
              <b>Note:</b> As a creator, you can enable/disable dynamic pricing
              anytime.
            </p>
          </>
        }
        enabled={isUSD}
        setEnabled={setIsUSD}
      />
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormPrice
