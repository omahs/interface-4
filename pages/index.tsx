import { BigNumber, ethers } from "ethers"
import { Button, DoubleText } from "@components/ui"
import { slc, sliceCore, slice, slicer } from "@lib/initProvider"
import { initialize } from "@lib/useProvider"

const getName = async () => {
  const { provider, signer, signerAddress } = await initialize()

  const slccontract = slc(signer)
  const sliceCorecontract = sliceCore(signer)
  const slicecontract = slice(signer)
  const slicerContract = await slicer(0, signer)
  const slicerAddress = await sliceCorecontract.slicers(0)

  // ADD PRODUCT
  // const decimals = BigNumber.from(10).pow(18)
  // const amountBN = BigNumber.from(1).mul(decimals)
  // const data = await slicerContract.addProduct(
  //   0,
  //   amountBN,
  //   false,
  //   true,
  //   0,
  //   [],
  //   []
  // )

  // PAY PRODUCT
  // const productId = 1
  // const quantity = 2
  // const price = await slicerContract.productInfo(productId)
  // const totalPrice = BigNumber.from(price[1]).mul(quantity)

  // const data = await slicerContract.payProduct(
  //   signerAddress,
  //   productId,
  //   quantity,
  //   {
  //     value: totalPrice,
  //   }
  // )
  // const data = await slicecontract.payProducts(
  //   [slicerAddress],
  //   [productId],
  //   [quantity],
  //   {
  //     value: totalPrice,
  //   }
  // )

  console.log(signerAddress)

  const data = await slccontract.balanceOf(signerAddress)
  console.log(data)
}

export default function Home() {
  return (
    <main className="py-12 md:py-16 text-center">
      <div className="pb-8 relative">
        <DoubleText
          inactive
          logoText={`Slice`}
          size="text-7xl sm:text-[5rem]"
          position="block"
        />
      </div>
      <p className="font-semibold leading-snug text-3xl">
        Unlocking the true power of NFTs
      </p>
      <Button label="Get name" onClick={() => getName()} />
    </main>
  )
}
