import { Dispatch, SetStateAction } from "react"
import Input from "../Input"
import { InputPrice, InputSwitch } from "@components/ui"

type Props = {
  isMultiple: boolean
  isLimited: boolean
  units: number
  ethValue: number
  usdValue: number
  isUSD: boolean
  loading: boolean
  setIsMultiple: Dispatch<SetStateAction<boolean>>
  setIsLimited: Dispatch<SetStateAction<boolean>>
  setUnits: Dispatch<SetStateAction<number>>
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  setIsUSD: Dispatch<SetStateAction<boolean>>
}

const AddProductFormPrice = ({
  isMultiple,
  isLimited,
  units,
  ethValue,
  usdValue,
  isUSD,
  loading,
  setIsMultiple,
  setIsLimited,
  setUnits,
  setEthValue,
  setUsdValue,
  setIsUSD,
}: Props) => {
  return (
    <>
      <h2 className="pb-6">Price and availability</h2>

      <p className="pb-3">
        Apart from the <i>multiple purchases</i> option, you can change these
        details afterwards by paying the relative blockchain transaction fee.
      </p>
      <div>
        <InputSwitch
          label="Multiple purchases"
          questionText={
            <>
              <p className="pb-4">
                If enabled, users will be able to buy this product multiple
                times.
              </p>
              <p>
                <b>Note:</b> You cannot change this later.
              </p>
            </>
          }
          enabled={isMultiple}
          setEnabled={setIsMultiple}
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
              required={isLimited}
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
        label="Price per unit"
        error={ethValue === 0}
        required
      />
      <InputSwitch
        label="Dynamic pricing"
        questionText={
          <>
            <p className="pb-4">
              If enabled, it&apos;s like setting the product price in USD. The
              user will always pay in ETH the corresponding USD value set
              {usdValue && usdValue != 0 && <b> ${usdValue}</b>}. This can be
              useful to protect against changes in ETH value over time.
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
      <p className="pt-3">
        <b>Note:</b> You can edit the price later, but only to reduce it.
      </p>
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormPrice
