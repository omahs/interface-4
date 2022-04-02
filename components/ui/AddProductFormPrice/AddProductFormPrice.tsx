import { Dispatch, SetStateAction } from "react"
import Input from "../Input"
import { InputPrice, InputSwitch } from "@components/ui"

type Props = {
  isMultiple: boolean
  isLimited: boolean
  isFree: boolean
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
  isFree,
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
  setIsUSD
}: Props) => {
  return (
    <>
      <h2 className="pb-6">Price and availability</h2>
      <div>
        <InputSwitch
          label="Allow multiple purchases"
          questionText={
            <>
              <p>
                If enabled, a buyer will be able to buy this product multiple
                times.
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
              <p>
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
      />
      <InputSwitch
        label="Dynamic pricing"
        questionText={
          <>
            <p>
              If enabled, it&apos;s like setting the product price in USD. The
              user will always pay in ETH the corresponding USD value set
              {usdValue && usdValue != 0 && (
                <b> ${Number(usdValue).toFixed(2)}</b>
              )}
              . This can be useful to protect against changes in ETH value over
              time.
            </p>
            <p>
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
      {isFree ? (
        <p className="text-yellow-600">
          <b>
            If a price is not specified this product can be purchased for free
          </b>
        </p>
      ) : null}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormPrice
