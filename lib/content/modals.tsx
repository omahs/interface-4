import ShoppingBag from "@components/icons/ShoppingBag"
import Units from "@components/icons/Units"
import {
  Button,
  CardImage,
  CartButton,
  DoubleText,
  EditProductForm,
  FilesList,
  LoadingStep,
  MarkdownBlock,
  NoteText,
  OwnerBlock,
  ProductCardPreview
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { ProductCart } from "@lib/handleUpdateCart"
import getEthFromWei from "@utils/getEthFromWei"
import formatNumber from "@utils/formatNumber"
import { useCookies } from "react-cookie"
import { ethers } from "ethers"
import getFunctionFromSelector from "@utils/getFunctionFromSelector"
import { useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import saEvent from "@utils/saEvent"
import Share from "@components/icons/Share"
import { domain } from "@components/common/Head"
import copyText from "@utils/copyText"
import useDecodeShortcode from "@utils/useDecodeShortcode"
import Bolt from "@components/icons/Bolt"
import { strategiesList } from "@components/priceStrategies/strategies"
import constants from "constants.json"
import { useRouter } from "next/router"
import handleDecryptData from "@lib/handleDecryptData"
import Spinner from "@components/icons/Spinner"

export type View = {
  name: ViewNames
  cross?: boolean
  params?: object
}
type ViewNames =
  | ""
  | "LOADING_VIEW"
  | "NETWORK_VIEW"
  | "CONNECT_VIEW"
  | "REDEEM_INSTRUCTIONS_VIEW"
  | "IRREVERSIBLE_VIEW"
  | "OWNERS_VIEW"
  | "CREATE_PRODUCT_VIEW"
  | "CREATE_PRODUCT_CONFIRM_VIEW"
  | "PRODUCT_VIEW"
  | "REDEEM_PRODUCT_VIEW"
  | "FINGERPRINTING_VIEW"

export const LOADING_VIEW = () => {
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Loading..." />
      </div>
      <p className="text-lg text-center">🍰 Please wait 🍰</p>
    </>
  )
}

export const NETWORK_VIEW = () => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

  return (
    <div className="text-center">
      <div className="pb-6">
        <DoubleText inactive logoText="Pick the right chain" />
      </div>
      <p className="text-lg">
        Connect to the{" "}
        <span className="font-black">
          {chainId === "5" ? "Goerli" : "Ethereum Mainnet"}
        </span>{" "}
        Network
      </p>
      <div
        className="flex justify-center pt-6"
        onClick={() => saEvent("connect_wallet_attempt")}
      >
        <ConnectButton
          accountStatus={{
            smallScreen: "address",
            largeScreen: "full"
          }}
          chainStatus="full"
          showBalance={false}
        />
      </div>

      <p className="pt-6 text-gray-600">
        Or go to{" "}
        <a
          href={`https://${chainId === "5" ? "" : "testnet."}slice.so`}
          target="_blank"
          rel="noreferrer"
          className="highlight"
        >
          Slice {chainId === "5" ? "Mainnet" : "Goerli (testnet)"}
        </a>
      </p>
    </div>
  )
}

export const CONNECT_VIEW = () => {
  const { account, setModalView } = useAppContext()
  useEffect(() => {
    saEvent("connect_wallet_open_modal")
  }, [])

  useEffect(() => {
    if (account) {
      saEvent("connect_wallet_success")
      setModalView({ name: "" })
    }
  }, [account])

  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Before moving on" />
      </div>
      <div className="text-center">
        <p className="pb-6">
          You need to connect your wallet to complete this action
        </p>
      </div>
      <div
        className="flex justify-center"
        onClick={() => saEvent("connect_wallet_attempt")}
      >
        <ConnectButton />
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
      <div className="text-center">
        <p className="pb-4">
          You won&apos;t be able to change the name, description and image of
          your slicer a second time.
        </p>
        <p className="font-bold text-yellow-600">
          Make sure the slicer details and image are correct
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <Button label="Continue" onClick={() => setModalView({ name: "" })} />
      </div>
    </>
  )
}

export const REDEEM_INSTRUCTIONS_VIEW = () => {
  const { setModalView } = useAppContext()
  return (
    <div className="text-center">
      <div className="pb-6">
        <DoubleText inactive logoText="Congrats on your purchase!" />
      </div>
      <div className="pb-4 space-y-4 text-center">
        <p>
          You can <b>redeem</b> the products purchased anytime to see further
          info from the seller, and execute any required post-purchase step.
        </p>
        <p>
          To redeem a product, <b>click on the blue button</b> with the shopping
          bag icon on its card.
        </p>
        <ProductCardPreview />
        <div className="text-left">
          <NoteText
            text={
              <>
                You can also access all of <b>your purchases</b> from the user
                menu in the top-right corner of the page.
              </>
            }
          />
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <Button label="Continue" onClick={() => setModalView({ name: "" })} />
      </div>
    </div>
  )
}

export const OWNERS_VIEW = (params: any) => {
  const { slicerId, totalSlices, owners, unreleased, setUnreleased } = params

  useEffect(() => {
    saEvent("owners_open_modal")
  }, [])

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
        <DoubleText inactive logoText="Ready to create product?" />
        <p className="pt-8">
          Make sure the information added is correct, you won&apos;t be able to
          change all details later.
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
  const { uploadStep, uploadPct, setModalView, cloneAddress, strategyLabel } =
    params
  const processing = uploadStep !== 10

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
      uploadState = "Deploying action ..."
      break
    case 7:
      uploadState = "Transaction in progress ..."
      break
    case 8:
      uploadState = `Configuring ${strategyLabel} ...`
      break
    case 9:
      uploadState = "Reverting"
      break
    case 10:
      uploadState = "Done, reverted!"
      break
    case 11:
      uploadState = "Finalizing"
      break
    case 12:
      uploadState = "Almost done"
      break
  }
  return (
    <div className="text-center">
      <div className="pb-8 text-center">
        <DoubleText inactive logoText="Creating product" />
      </div>
      <div className="grid items-center grid-cols-6 gap-2 px-4">
        <LoadingStep
          initCondition={uploadStep < 3}
          uploadState={uploadState}
          endState="Done"
        />
        <LoadingStep
          nullCondition={uploadStep < 3}
          initCondition={uploadStep < 7}
          uploadState={uploadState}
          waitingState="File upload"
          endState={
            cloneAddress ? (
              <>
                Contract deployed!{" "}
                <a
                  href={`https://${
                    process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "goerli." : ""
                  }etherscan.io/address/${cloneAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="highlight"
                >
                  See on Etherscan
                </a>
              </>
            ) : (
              "Done"
            )
          }
        />
        <LoadingStep
          nullCondition={uploadStep < 7}
          initCondition={strategyLabel ? uploadStep < 8 : processing}
          uploadState={uploadState}
          waitingState="Blockchain interaction"
          endState={strategyLabel && "Done"}
        />
        {strategyLabel && (
          <LoadingStep
            nullCondition={uploadStep < 8}
            initCondition={processing}
            uploadState={uploadState}
            waitingState="Pricing strategy"
          />
        )}
      </div>
      <div className="pt-10">
        {uploadStep === 10 ? (
          <Button
            label={"Go back to product"}
            onClick={() => setModalView({ name: "" })}
          />
        ) : (
          <p className="max-w-sm mx-auto text-sm font-bold text-yellow-600">
            Please wait until the process is completed
          </p>
        )}
      </div>
    </div>
  )
}

export const PRODUCT_VIEW = (params: any) => {
  const [cookies] = useCookies(["cart"])
  const {
    account,
    dbId,
    slicerId,
    productId,
    name,
    shortDescription,
    description,
    image,
    productPrice,
    isUSD,
    extAddress,
    extValue,
    extCheckSig,
    extExecSig,
    isInfinite,
    maxUnits,
    uid,
    creator,
    texts,
    allowedAddresses,
    availableUnits,
    totalPurchases,
    purchaseInfo,
    slicerAddress,
    price,
    editMode,
    purchasedQuantity,
    availabilityColor,
    preview,
    externalPriceAddress,
    externalPrices,
    isCustomPriced
  } = params

  const router = useRouter()
  const { id } = router.query
  const [isCopied, setIsCopied] = useState(false)
  const cookieCart: ProductCart[] = cookies?.cart
  const productCart: ProductCart = cookieCart?.find(
    (product) =>
      product.slicerAddress == slicerAddress && product.productId == productId
  )
  const purchaseElArray = Object.keys(purchaseInfo).filter(
    (el) => purchaseInfo[el] == true
  )
  const purchaseEl = purchaseElArray.join(", ")

  const strategyAddresses =
    constants[process.env.NEXT_PUBLIC_CHAIN_ID][
      process.env.NEXT_PUBLIC_ENVIRONMENT
    ].strategies

  const strategy = Object.values(strategiesList).find(
    ({ label }) =>
      strategyAddresses[label].toLowerCase() == externalPriceAddress
  )

  useEffect(() => {
    saEvent("product_view_open_modal")
  }, [])

  return (
    <>
      <div
        className="absolute top-[24px] left-[24px] hover:text-blue-600 flex cursor-pointer items-center text-gray-700"
        onClick={async () =>
          await copyText(
            `${domain}/slicer/${id}?product=${productId}`,
            setIsCopied
          )
        }
      >
        <Share />
        <p className="pt-0.5 pl-2 text-sm font-semibold">
          {isCopied ? "Link copied! 🍰" : "Share"}
        </p>
      </div>
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
                  {totalPurchases ? formatNumber(totalPurchases) : 0}
                </p>
                <ShoppingBag className="w-[18px] h-[18px] text-indigo-600" />
              </>
            )
          }}
          topRight={{
            title: "Product price",
            content: (
              <div className="flex items-center justify-center">
                {isCustomPriced && (
                  <div className="w-5 h-5 mr-2 -ml-1 text-yellow-500 animate-pulse">
                    <Bolt />
                  </div>
                )}
                <p
                  className={`text-sm capitalize font-medium text-black${
                    productPrice.usd == "free" ? " text-green-600" : ""
                  }`}
                >
                  {productPrice.usd}
                </p>
              </div>
            )
          }}
          bottomLeft={
            extAddress &&
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
          {editMode && account == creator ? (
            <EditProductForm
              slicerId={slicerId}
              productId={productId}
              maxUnits={maxUnits}
              isInfinite={isInfinite}
              availableUnits={availableUnits}
              productPrice={productPrice}
              isUSD={isUSD}
              externalPriceAddress={externalPriceAddress}
            />
          ) : (
            <div>
              <MarkdownBlock content={description} />
            </div>
          )}
        </div>
        {extAddress &&
          (!isCustomPriced ||
            (externalPrices[slicerId] &&
              externalPrices[slicerId][productId])) && (
            <>
              <div className="mx-auto cursor-pointer w-72">
                {!editMode && (
                  <CartButton
                    slicerId={slicerId}
                    productCart={productCart}
                    slicerAddress={slicerAddress}
                    productId={productId}
                    price={
                      isCustomPriced &&
                      externalPrices[slicerId] &&
                      externalPrices[slicerId][productId]
                        ? parseInt(
                            externalPrices[slicerId][productId][
                              ethers.constants.AddressZero
                            ].ethPrice,
                            16
                          ).toString()
                        : price
                    }
                    isUSD={isCustomPriced ? false : isUSD}
                    extAddress={extAddress}
                    extCallValue={extValue}
                    extCheckSig={extCheckSig}
                    name={name}
                    image={image}
                    maxUnits={Number(maxUnits)}
                    availableUnits={isInfinite ? -1 : availableUnits}
                    purchasedQuantity={purchasedQuantity}
                    uid={uid}
                    creator={creator}
                    texts={texts}
                    allowedAddresses={allowedAddresses}
                    labelAdd={productPrice?.eth != "free" && productPrice.eth}
                    labelRemove={productPrice.eth != "free" && productPrice.eth}
                    preview={preview}
                    shortcodes={purchaseInfo?.shortcodes}
                    dbId={dbId}
                    externalPriceAddress={externalPriceAddress}
                  />
                )}
              </div>
            </>
          )}

        {!editMode &&
          productPrice.eth != "free" &&
          Number(maxUnits) != 1 &&
          productCart?.quantity && (
            <p className="pt-4 text-sm text-center ">
              {`Ξ ${
                Math.floor(
                  Number(productPrice.eth.substring(1)) *
                    productCart?.quantity *
                    1000
                ) / 1000
              }`}
            </p>
          )}
        {isCustomPriced &&
          externalPrices[slicerId] &&
          externalPrices[slicerId][productId] && (
            <p className="pt-6 mx-auto text-sm text-center">
              Price dynamically calculated from{" "}
              <a
                className="font-bold highlight"
                href={`https://${
                  process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "goerli." : ""
                }etherscan.io/address/${externalPriceAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                {externalPriceAddress.replace(
                  externalPriceAddress.substring(
                    5,
                    externalPriceAddress.length - 3
                  ),
                  `\xa0\xa0\xa0\xa0\xa0\xa0`
                )}
              </a>
              {strategy && ` (${strategy.label})`}
            </p>
          )}
        {extAddress &&
        extAddress != "0x00000000" &&
        extAddress != ethers.constants.AddressZero &&
        (extValue != "0" || extExecSig != "0x00000000") ? (
          <p className="pt-6 mx-auto text-sm text-center">
            Interacts with{" "}
            <a
              className="font-bold highlight"
              href={`https://${
                process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "goerli." : ""
              }etherscan.io/address/${extAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              {extAddress.replace(
                extAddress.substring(5, extAddress.length - 3),
                `\xa0\xa0\xa0\xa0\xa0\xa0`
              )}
            </a>{" "}
            by{" "}
            {extValue != "0" ? (
              <>
                sending <b>{getEthFromWei(extValue)}</b> ETH
              </>
            ) : (
              ""
            )}
            {extValue != "0" && extExecSig != "0x00000000" ? " and " : ""}
            {extExecSig != "0x00000000" ? (
              <>
                executing{" "}
                <b className="text-yellow-600">
                  {getFunctionFromSelector(extExecSig)}
                </b>
              </>
            ) : (
              ""
            )}
          </p>
        ) : null}
        {purchaseElArray && purchaseElArray.length != 0 ? (
          <p className="pt-6 text-sm text-center mx-auto max-w-[340px]">
            Contains <b>{purchaseEl}</b>
          </p>
        ) : null}
      </div>
    </>
  )
}

export const REDEEM_PRODUCT_VIEW = (params: any) => {
  const { account } = useAppContext()
  const {
    slicerId,
    productId,
    name,
    image,
    purchasedQuantity,
    texts,
    creator,
    uid,
    purchaseHash,
    decryptedFiles: decryptedFilesParam,
    decryptedTexts: decryptedTextsParam,
    accountCodes
  } = params
  const { thanks, instructions } = texts || {
    thanks: undefined,
    instructions: undefined
  }

  const decodedInstructions = useDecodeShortcode(
    account,
    purchasedQuantity,
    slicerId,
    productId,
    instructions,
    accountCodes
  )

  const [decrypted, setDecrypted] = useState(null)

  useEffect(() => {
    if (purchaseHash) {
      const handleDecrypt = async () => {
        const data = await handleDecryptData(
          slicerId,
          name,
          creator,
          uid,
          purchaseHash
        )
        setDecrypted(data || {})
      }

      handleDecrypt()
    }
  }, [])

  const decryptedFiles = decryptedFilesParam || decrypted?.decryptedFiles || []
  const decryptedTexts = decryptedTextsParam || decrypted?.decryptedTexts || {}

  const { notes } = decryptedTexts || { notes: undefined }
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
              <MarkdownBlock content={decodedInstructions} />
            </div>
          </div>
        )}
        {purchaseHash && !decrypted ? (
          <div className="flex items-center justify-center gap-4 text-gray-600">
            Decrypting data
            <Spinner />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  )
}

export const FINGERPRINTING_VIEW = () => {
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Shields detected" />
      </div>
      <div className="space-y-6 text-center">
        <p>
          Make sure fingerprinting protection isn&apos;t enabled in your
          browser, if you are a Brave user turn off shields and try again.
        </p>
        <div className="text-left">
          <NoteText
            text="Copy your progress before allowing fingerprinting, as the page
          will be reloaded and any unsaved progress will be lost."
          />
        </div>
      </div>
    </>
  )
}

// Todo: Add 'download all' button
