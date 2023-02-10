import {
  strategiesRender,
  Strategy,
  StrategyParams
} from "@components/priceStrategies/strategies"
import ethToWei from "@utils/ethToWei"
import { formatNumberWithUnit } from "@utils/formatNumber"
import { ethers, Signer } from "ethers"
import { useEffect, useState } from "react"
import AddProductFormAvailability from "../AddProductFormAvailability"
import AddProductFormPrice from "../AddProductFormPrice"
import Button from "../Button"
import InputSwitch from "../InputSwitch"
import { useContractWrite, usePrepareContractWrite, useSigner } from "wagmi"
import constants from "constants.json"
import ProductsModuleContract from "artifacts/contracts/ProductsModule.sol/ProductsModule.json"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit"
import saEvent from "@utils/saEvent"
import fetcher from "@utils/fetcher"
import executeTransaction from "@utils/executeTransaction"
import { useRouter } from "next/router"
import timeout from "@utils/timeout"

type Props = {
  slicerId: number
  productId: number
  maxUnits: number
  isInfinite: boolean
  availableUnits: number
  productPrice: {
    eth: string
    usd: string
  }
  isUSD: boolean
  externalPriceAddress: string
}

const EditProductForm = ({
  slicerId,
  productId,
  maxUnits,
  isInfinite,
  availableUnits,
  productPrice,
  isUSD,
  externalPriceAddress
}: Props) => {
  const router = useRouter()
  const { id } = router.query
  const { data: signer } = useSigner()

  const [newIsMultiple, setNewIsMultiple] = useState(
    maxUnits == 1 ? false : true
  )
  const [loadingLabel, setLoadingLabel] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPriceEdited, setIsPriceEdited] = useState(false)
  const [newIsLimited, setNewIsLimited] = useState(!isInfinite)
  const [newUnits, setNewUnits] = useState(availableUnits)
  const [newMaxUnits, setNewMaxUnits] = useState(0)
  const [newUsdValue, setNewUsdValue] = useState(
    formatNumberWithUnit(productPrice.usd == "free" ? "$ 0" : productPrice.usd)
  )
  const [newEthValue, setNewEthValue] = useState(
    formatNumberWithUnit(productPrice.eth == "free" ? "$ 0" : productPrice.eth)
  )
  const [newIsUSD, setNewIsUSD] = useState(isUSD)
  const [newPriceParams, setNewPriceParams] = useState<StrategyParams>()
  const [priceStrategy, setPriceStrategy] = useState<Strategy>(
    strategiesRender[0]
  )
  const isFree = newPriceParams?.address
    ? false
    : newEthValue != 0
    ? false
    : true
  const weiValue = ethToWei(newEthValue)
  const newProductPrice = newIsUSD ? Math.floor(newUsdValue * 1e6) : weiValue
  const isStrategyConfigurable =
    newPriceParams?.address && newPriceParams?.abi && true
  const currencyPrices =
    isPriceEdited &&
    (Number(newProductPrice) != 0 ||
      newPriceParams?.address.toLowerCase() != externalPriceAddress)
      ? [
          {
            currency: ethers.constants.AddressZero,
            value: newProductPrice,
            dynamicPricing: newIsUSD,
            externalAddress:
              newPriceParams?.address || ethers.constants.AddressZero
          }
        ]
      : []

  const isProductToBeUpdated =
    newIsLimited != !isInfinite ||
    newUnits != availableUnits ||
    Number(newMaxUnits) != Number(maxUnits) ||
    currencyPrices.length != 0 ||
    (newPriceParams?.address &&
      newPriceParams.address.toLowerCase() != externalPriceAddress)

  const addRecentTransaction = useAddRecentTransaction()
  const { config } = usePrepareContractWrite({
    address:
      constants[process.env.NEXT_PUBLIC_CHAIN_ID][
        process.env.NEXT_PUBLIC_ENVIRONMENT
      ].addresses.ProductsModule,
    abi: ProductsModuleContract.abi,
    functionName: "setProductInfo",
    args: [
      slicerId,
      productId,
      newMaxUnits,
      isFree,
      !newIsLimited,
      newUnits,
      currencyPrices
    ]
  })
  const { writeAsync } = useContractWrite(config)

  const settlementLogic = async () => {
    saEvent("update_product_success")
    await fetcher(`/api/slicer/${id}/refresh`, {
      method: "GET"
    })
    router.reload()
  }

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)
    saEvent("update_product_attempt")

    try {
      let txData
      if (isProductToBeUpdated) {
        setLoadingLabel("Updating product...")
        txData = await executeTransaction(
          writeAsync,
          setLoading,
          `Update product ${slicerId}/${productId}`,
          addRecentTransaction
        )
      }

      if (isStrategyConfigurable && (!isProductToBeUpdated || txData)) {
        setLoadingLabel("Updating pricing...")
        const contract = new ethers.Contract(
          newPriceParams.address,
          newPriceParams.abi,
          signer as unknown as Signer
        )

        const tx = await contract.setProductPrice(
          slicerId,
          productId,
          [ethers.constants.AddressZero],
          ...newPriceParams.args
        )
        txData = await tx.wait()
      } else if (txData) {
        await timeout(3500)
      }

      if (txData) {
        await settlementLogic()
      }
    } catch (error) {
      console.log(error)
    }

    setLoadingLabel("")
    setLoading(false)
  }

  useEffect(() => {
    setNewMaxUnits(
      newIsMultiple ? (Number(maxUnits) > 1 ? Number(maxUnits) : 0) : 1
    )
  }, [newIsMultiple])

  return (
    <form className="w-full mx-auto space-y-6 text-left" onSubmit={submit}>
      <h2 className="py-6 text-center">Edit product</h2>
      <div>
        <AddProductFormAvailability
          isMultiple={newIsMultiple}
          isLimited={newIsLimited}
          units={newUnits}
          maxUnits={newMaxUnits}
          setIsMultiple={setNewIsMultiple}
          setIsLimited={setNewIsLimited}
          setUnits={setNewUnits}
          setMaxUnits={setNewMaxUnits}
          priceParams={newPriceParams}
          setPriceParams={setNewPriceParams}
          disabled={loading}
        />
        <InputSwitch
          label="Edit pricing"
          questionText={
            <>
              <p>
                If enabled, a buyer will be able to buy more than one unit of
                this product.
              </p>
              <p className="font-medium text-yellow-600">
                Note: You can only edit prices once every 24h
              </p>
            </>
          }
          enabled={isPriceEdited}
          setEnabled={setIsPriceEdited}
          disabled={loading}
        />
      </div>
      {isPriceEdited && (
        <>
          <AddProductFormPrice
            isFree={isFree}
            ethValue={newEthValue}
            usdValue={newUsdValue}
            isUSD={newIsUSD}
            setEthValue={setNewEthValue}
            setUsdValue={setNewUsdValue}
            setIsUSD={setNewIsUSD}
            units={newUnits}
            setPriceParams={setNewPriceParams}
            disabled={loading}
            priceParams={newPriceParams}
            priceStrategy={priceStrategy}
            setPriceStrategy={setPriceStrategy}
          />
        </>
      )}
      <div className="py-6 text-center">
        <Button
          label="Update"
          loadingLabel={loadingLabel}
          loading={loading}
          disabled={!isProductToBeUpdated && !isStrategyConfigurable}
          type="submit"
        />
        {loading && (
          <p className="max-w-sm pt-8 mx-auto text-sm font-bold text-yellow-600">
            Please wait until the process is completed
          </p>
        )}
      </div>
    </form>
  )
}

export default EditProductForm
