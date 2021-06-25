import { BigNumber, ethers } from "ethers"
import { Button } from "@components/ui"
import { slc, sliceCore, slice, slicer } from "@lib/initProvider"

const getName = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const signerAddress = await signer.getAddress()

  const slccontract = slc(signer)
  const sliceCorecontract = sliceCore(signer)
  const slicecontract = slice(signer)
  const slicerContract = await slicer(0, signer)
  const slicerAddress = await sliceCore(signer).slicers(0)

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

  const data = await slccontract.balanceOf(slicerAddress)
  console.log(data)
}

export default function Home() {
  return (
    <main className="py-12 md:py-16 text-center">
      <h1>Welcome to Slice</h1>
      <Button label="Get name" onClick={() => getName()} />
    </main>
  )
}
