import Arrow from "@components/icons/Arrow"
import Metamask from "@components/icons/Metamask"
import ShoppingBag from "@components/icons/ShoppingBag"
import Units from "@components/icons/Units"
import {
  Button,
  CardImage,
  CartButton,
  DoubleText,
  FilesList,
  LoadingStep,
  MarkdownBlock,
  OwnerBlock
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { ProductCart } from "@lib/handleUpdateCart"
import formatNumber from "@utils/formatNumber"
import { useRouter } from "next/dist/client/router"
import { useCookies } from "react-cookie"
import { handleConnectMetamask, handleConnectWC } from "@lib/handleConnect"
import WalletConnect from "@components/icons/WalletConnect"

export type View = {
  name: ViewNames
  cross?: boolean
  params?: object
}
type ViewNames =
  | ""
  | "NETWORK_VIEW"
  | "CONNECT_VIEW"
  | "IRREVERSIBLE_VIEW"
  | "OWNERS_VIEW"
  | "CREATE_PRODUCT_VIEW"
  | "CREATE_PRODUCT_CONFIRM_VIEW"
  | "PRODUCT_VIEW"
  | "REDEEM_PRODUCT_VIEW"

export const NETWORK_VIEW = () => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Pick the right chain" />
      </div>
      <p className="text-lg text-center">
        Connect to the{" "}
        <span className="font-black">
          {chainId === "4" ? "Rinkeby" : "Ethereum Mainnet"}
        </span>{" "}
        Network
      </p>
    </>
  )
}

export const CONNECT_VIEW = () => {
  const { connector, setModalView } = useAppContext()
  return (
    <>
      <div className="pb-12 text-center">
        <DoubleText inactive logoText="Connect wallet" />
      </div>
      <div className="space-y-6">
        {window.ethereum && (
          <div
            className="flex items-center justify-between max-w-sm p-6 mx-auto transition-all duration-300 ease-out border-2 border-yellow-100 cursor-pointer flex-between hover:scale-105 shadow-base hover:border-yellow-500 rounded-xl group"
            onClick={async () => await handleConnectMetamask(setModalView)}
          >
            <div className="flex items-center">
              <Metamask className="w-6 h-6" />
              <p className="ml-6 font-semibold">Metamask</p>
            </div>
            <div>
              <Arrow className="transition-colors duration-300 ease-out group-hover:text-yellow-500" />
            </div>
          </div>
        )}
        <div
          className="flex items-center justify-between max-w-sm p-6 mx-auto transition-all duration-300 ease-out border-2 border-blue-100 cursor-pointer flex-between hover:scale-105 shadow-base hover:border-blue-600 rounded-xl group"
          onClick={async () => await handleConnectWC(connector, setModalView)}
        >
          <div className="flex items-center">
            <WalletConnect className="w-6 h-6" />
            <p className="ml-6 font-semibold">WalletConnect</p>
          </div>
          <div>
            <Arrow className="transition-colors duration-300 ease-out group-hover:text-blue-600" />
          </div>
        </div>
      </div>
    </>
  )
}

export const IRREVERSIBLE_VIEW = () => {
  const { setModalView } = useAppContext()
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Be careful" />
      </div>
      <div className="text-lg text-center">
        <p className="pb-4">
          This action is irreversible, you cannot change the name, description
          and image of your slicer a second time.
        </p>
        <p className="font-semibold">
          Make sure the slicer details and image are correct
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <Button label="Continue" onClick={() => setModalView({ name: "" })} />
      </div>
    </>
  )
}

export const OWNERS_VIEW = (params: any) => {
  const { slicerId, totalSlices, owners, unreleased, setUnreleased } = params

  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Slicer owners" />
        <p className="pt-4">{formatNumber(totalSlices)} Total slices 🍰</p>
      </div>
      <ul className="max-w-sm pt-6 mx-auto">
        {owners.map((el, key) => (
          <li key={key}>
            <OwnerBlock
              index={Number(key)}
              slicerId={slicerId}
              totalSlices={totalSlices}
              owner={owners[Number(key)]}
              unreleasedOwner={unreleased[Number(key)]}
              unreleased={unreleased}
              setUnreleased={setUnreleased}
            />
            {key != owners.length - 1 && (
              <hr className="my-8 border-gray-300" />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export const CREATE_PRODUCT_CONFIRM_VIEW = (params: any) => {
  const { submitEl, uploadStep, setModalView } = params
  const handleClick = () => {
    submitEl.current.click()
    if (uploadStep == 0) {
      setModalView({ name: "" })
    }
  }
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Ready to mint?" />
        <p className="pt-8">
          Make sure the information you added is correct, you won&apos;t be able
          to change all details later.
        </p>
      </div>

      <div className="text-center">
        <Button label="Go ahead!" onClick={() => handleClick()} />
      </div>
      <div className="flex justify-center pt-8">
        <p
          className="font-medium text-red-500 cursor-pointer hover:underline"
          onClick={() => setModalView({ name: "" })}
        >
          Go back
        </p>
      </div>
    </>
  )
}

export const CREATE_PRODUCT_VIEW = (params: any) => {
  const { uploadStep, uploadPct, setModalView } = params
  const processing = uploadStep !== 8

  let uploadState: string
  switch (uploadStep) {
    case 1:
      uploadState = "Uploading image"
      break
    case 2:
      uploadState = "Saving metadata"
      break
    case 3:
      uploadState = "Encrypting files"
      break
    case 4:
      uploadState = `Uploading files: ${uploadPct < 100 ? uploadPct : 100}%`
      break
    case 5:
      uploadState = "Finishing setting up"
      break
    case 6:
      uploadState = "Transaction in progress"
      break
    case 7:
      uploadState = "Reverting"
      break
    case 8:
      uploadState = "Done, reverted!"
      break
    case 9:
      uploadState = "Finalizing"
      break
  }
  return (
    <div className="text-center">
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Minting in progress" />
      </div>
      <p className="pb-8">Please wait until the process is completed</p>
      <div className="grid items-center grid-cols-6 gap-2 px-4">
        <LoadingStep
          initCondition={uploadStep < 3}
          uploadState={uploadState}
          endState="Done"
        />
        <LoadingStep
          nullCondition={uploadStep < 3}
          initCondition={uploadStep < 6}
          uploadState={uploadState}
          waitingState="File upload"
          endState="Done"
        />
        <LoadingStep
          nullCondition={uploadStep < 6}
          initCondition={processing}
          uploadState={uploadState}
          waitingState="Blockchain interaction"
        />
      </div>
      <div className="pt-10">
        {uploadStep === 8 ? (
          <Button
            label={"Go back to product"}
            onClick={() => setModalView({ name: "" })}
          />
        ) : (
          <p className="max-w-sm mx-auto text-sm">
            To make the product immediately appear on the website{" "}
            <b className="text-yellow-600">
              do not leave this page until the process has completed
            </b>
          </p>
        )}
      </div>
    </div>
  )
}

export const PRODUCT_VIEW = (params: any) => {
  const [cookies] = useCookies(["cart"])
  const {
    slicerId,
    productId,
    name,
    shortDescription,
    description,
    image,
    productPrice,
    isUSD,
    isInfinite,
    isMultiple,
    uid,
    creator,
    texts,
    availableUnits,
    totalPurchases,
    purchaseInfo,
    slicerAddress,
    price,
    editMode,
    purchasedQuantity,
    availabilityColor,
    preview
  } = params

  const cookieCart: ProductCart[] = cookies?.cart
  const productCart: ProductCart = cookieCart?.find(
    (product) =>
      product.slicerAddress == slicerAddress && product.productId == productId
  )
  const purchaseElArray = Object.keys(purchaseInfo).filter(
    (el) => purchaseInfo[el] == true
  )
  const purchaseEl = purchaseElArray.join(", ")

  return (
    <>
      <div className="pt-4 pb-12 text-center sm:pb-16">
        <DoubleText inactive logoText={name} size="text-3xl sm:text-4xl" />
        {shortDescription && (
          <p className="max-w-sm pt-6 mx-auto text-gray-500">
            {shortDescription}
          </p>
        )}
      </div>
      <div>
        <CardImage
          name={name}
          imageUrl={image}
          size="h-52 xs:h-72"
          disableHover
          product
          topLeft={{
            title: "Purchases",
            content: (
              <>
                <p className="mr-2 text-indigo-600">
                  {formatNumber(totalPurchases)}
                </p>
                <ShoppingBag className="w-[18px] h-[18px] text-indigo-600" />
              </>
            )
          }}
          topRight={{
            title: "Product price",
            content: (
              <p className="text-sm font-medium text-black">
                {productPrice.usd}
              </p>
            )
          }}
          bottomLeft={
            !isInfinite && {
              title: "Available units",
              content: (
                <>
                  <p className={`mr-2 ${availabilityColor}`}>
                    {formatNumber(availableUnits)}
                  </p>
                  <Units className={`w-[18px] h-[18px] ${availabilityColor}`} />
                </>
              )
            }
          }
        />
        <div className="py-8">
          <div>
            <MarkdownBlock content={description} />
          </div>
        </div>
        {!editMode && (
          <div className="mx-auto cursor-pointer w-60">
            <CartButton
              slicerId={slicerId}
              productCart={productCart}
              slicerAddress={slicerAddress}
              productId={productId}
              price={price}
              isUSD={isUSD}
              name={name}
              image={image}
              isMultiple={isMultiple}
              availableUnits={isInfinite ? -1 : availableUnits}
              purchasedQuantity={purchasedQuantity}
              uid={uid}
              creator={creator}
              texts={texts}
              labelAdd={`Get it for ${productPrice.eth}`}
              labelRemove={productPrice.eth}
              preview={preview}
            />
          </div>
        )}
        {!editMode && isMultiple && productCart?.quantity && (
          <p className="pt-4 text-sm text-center ">{`Ξ ${
            Math.floor(
              Number(productPrice.eth.substring(1)) *
                productCart?.quantity *
                1000
            ) / 1000
          }`}</p>
        )}
        <p className="pt-6 text-sm text-center mx-auto max-w-[340px]">
          This product contains <b>{purchaseEl}</b>
        </p>
      </div>
    </>
  )
}

export const REDEEM_PRODUCT_VIEW = (params: any) => {
  const {
    slicerId,
    productId,
    name,
    image,
    purchasedQuantity,
    texts,
    decryptedFiles,
    decryptedTexts
  } = params

  const { thanks, instructions } = texts
  const { notes } = decryptedTexts

  return (
    <>
      <div className="pt-4 pb-12 text-center sm:pb-16">
        <DoubleText inactive logoText={name} size="text-3xl sm:text-4xl" />
      </div>
      <div>
        <CardImage
          name={name}
          imageUrl={image}
          size="h-52 xs:h-72"
          product
          disableHover
        />
        {purchasedQuantity != 1 && (
          <p className="pt-6 text-sm text-center text-gray-500">
            You bought this product {purchasedQuantity} times
          </p>
        )}
        <div className="pb-6 pt-14">
          <div>
            <MarkdownBlock
              className="prose text-center"
              content={thanks || "Thank you for buying our product! ❤️"}
            />
          </div>
        </div>
        {instructions && (
          <div className="py-8">
            <h3 className="pb-4">Instructions</h3>
            <div>
              <MarkdownBlock content={instructions} />
            </div>
          </div>
        )}
        {notes && (
          <div className="py-8">
            <h3>Notes</h3>
            <div>
              <MarkdownBlock content={notes} />
            </div>
          </div>
        )}
        {decryptedFiles.length != 0 && (
          <div className="max-w-sm py-6 mx-auto text-center">
            <FilesList
              title="Download files"
              files={decryptedFiles}
              uploadable={false}
              backgroundColor="nightwind-prevent bg-blue-600 text-white"
              downloadable={true}
            />
          </div>
        )}
      </div>
    </>
  )
}
// TODO: Do not decrypt thankMessage and instructions

// Todo: Add 'download all' button
