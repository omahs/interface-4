import Cart from "@components/icons/Cart"
import Minus from "@components/icons/Minus"
import Plus from "@components/icons/Plus"
import Trash from "@components/icons/Trash"
import handleUpdateCart, { ProductCart } from "@lib/handleUpdateCart"
import { useCookies } from "react-cookie"
import ShoppingBag from "@components/icons/ShoppingBag"
import { useAppContext } from "../context"
import { useEffect, useState } from "react"
import handleRedeemProduct from "@utils/handleRedeemProduct"
import Spinner from "@components/icons/Spinner"
import Lock from "@components/icons/Lock"
import { ExtCall } from "@lib/handlers/chain"
import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import { ethers } from "ethers"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useProvider, useSigner } from "wagmi"
import { useRouter } from "next/router"

type Props = {
  productCart: ProductCart
  dbId: number
  slicerId: number
  slicerAddress: string
  productId: number
  price: string
  isUSD: boolean
  extAddress: string
  extCallValue: string
  extCheckSig: string
  name: string
  image: string
  maxUnits: number
  uid: string
  creator: string
  texts: {
    thanks?: string
    instructions?: string
  }
  allowedAddresses: string[]
  availableUnits: number
  purchasedQuantity: number
  labelAdd?: string
  labelRemove?: string
  preview?: boolean
  shortcodes?: string[]
  externalPriceAddress?: string
}

const CartButton = ({
  dbId,
  slicerId,
  productCart,
  slicerAddress,
  productId,
  price,
  isUSD,
  extAddress,
  extCallValue,
  extCheckSig,
  name,
  maxUnits,
  image,
  uid,
  creator,
  texts,
  allowedAddresses,
  availableUnits,
  purchasedQuantity,
  labelAdd,
  labelRemove,
  preview,
  shortcodes,
  externalPriceAddress
}: Props) => {
  const { account, setModalView } = useAppContext()
  const provider = useProvider()
  const router = useRouter()
  const { id } = router.query
  const { data: signer } = useSigner()
  const [loading, setLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isLoadingExtCall, setisLoadingExtCall] = useState(false)
  const [isSuccessExtCall, seSuccessExtCall] = useState(false)
  const [isFailExtCall, setIsFailExtCall] = useState(false)
  const [cookies, setCookie] = useCookies(["cart"])
  const adjustedAvailability = availableUnits - productCart?.quantity
  let buyerCustomData: any = []

  const handleExtCall = async () => {
    setisLoadingExtCall(true)
    try {
      const call = await ExtCall(
        provider,
        extAddress,
        extCheckSig,
        slicerId,
        productId,
        account,
        1,
        [],
        buyerCustomData
      )
      if (Number(call) === 1) {
        seSuccessExtCall(true)
      } else {
        setIsFailExtCall(true)
        setTimeout(() => {
          setIsFailExtCall(false)
        }, 1500)
      }
    } catch (err) {
      setIsFailExtCall(true)
      setTimeout(() => {
        setIsFailExtCall(false)
      }, 1500)
    }
    setisLoadingExtCall(false)
  }

  useEffect(() => {
    seSuccessExtCall(false)
  }, [account])

  if (account && allowedAddresses.length != 0) {
    const leafNodes = allowedAddresses.map((addr) => keccak256(addr))
    const tree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true
    })
    const proof = tree.getHexProof(keccak256(account.toLowerCase()))
    if (proof.length != 0) {
      buyerCustomData = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proof]
      )
    }

    // TODO: Fix proof generation when allowedAddresses.length == 1
  }

  return !productCart && purchasedQuantity != 0 ? (
    maxUnits == 1 || maxUnits == purchasedQuantity ? (
      <div
        className="relative z-10 flex items-center justify-center w-full text-center text-white transition-colors duration-150 bg-blue-500 rounded-md h-9 hover:text-white nightwind-prevent group-cart hover:bg-blue-600"
        onClick={async () =>
          await handleRedeemProduct(
            account,
            signer,
            dbId,
            slicerId,
            productId,
            name,
            image,
            uid,
            creator,
            texts,
            setLoading,
            setModalView,
            shortcodes
          )
        }
      >
        <p className="mr-2 text-sm font-medium sm:text-base">
          {`Redeem${purchasedQuantity != 1 ? ` (${purchasedQuantity})` : ""}`}
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <ShoppingBag className="w-5 h-5 group-cart-el" />
        )}
      </div>
    ) : (
      <div className="relative z-10 flex items-center justify-center w-full overflow-hidden text-center bg-white border border-gray-100 rounded-md shadow-md nightwind-prevent-block">
        {extCheckSig != "0x00000000" && !isSuccessExtCall ? (
          <ConnectButton.Custom>
            {({ account, openConnectModal }) => (
              <div
                className={`relative z-10 flex flex-grow items-center justify-center h-9 text-white group-cart ${
                  isFailExtCall
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } transition-colors duration-150`}
                onClick={
                  account ? async () => await handleExtCall() : openConnectModal
                }
                onMouseEnter={() => setIsUnlocked(true)}
                onMouseLeave={() => setIsUnlocked(false)}
              >
                {labelAdd && (
                  <p className="mr-2 text-sm font-medium sm:text-base">
                    {labelAdd}
                  </p>
                )}
                {isLoadingExtCall ? (
                  <Spinner />
                ) : (
                  <Lock
                    className="w-5 h-5 mr-1 group-cart-el"
                    isUnlocked={isUnlocked}
                  />
                )}
              </div>
            )}
          </ConnectButton.Custom>
        ) : (
          <div
            className={`relative z-10 h-9 flex flex-grow items-center justify-center text-white ${
              availableUnits != 0
                ? "group-cart bg-green-500 hover:bg-green-600 transition-colors duration-150"
                : "bg-gray-400 cursor-default"
            }`}
            onClick={async () =>
              !preview &&
              availableUnits != 0 &&
              (await handleUpdateCart(
                cookies,
                setCookie,
                productCart,
                slicerId,
                slicerAddress,
                productId,
                price,
                isUSD,
                extCallValue,
                buyerCustomData,
                name,
                productCart ? ++productCart.quantity : 1,
                String(id),
                externalPriceAddress
              ))
            }
          >
            {labelAdd && (
              <p className="mr-2 text-sm font-medium sm:text-base">
                {labelAdd}
              </p>
            )}
            <Cart className="w-5 h-5 mr-1 group-cart-el" />
          </div>
        )}
        <div
          className="relative z-10 flex items-center justify-center w-1/3 text-white transition-colors duration-150 bg-blue-500 h-9 rounded-r-md nightwind-prevent group-cart hover:bg-blue-600"
          onClick={() =>
            handleRedeemProduct(
              account,
              signer,
              dbId,
              slicerId,
              productId,
              name,
              image,
              uid,
              creator,
              texts,
              setLoading,
              setModalView,
              shortcodes
            )
          }
        >
          {loading ? (
            <Spinner />
          ) : (
            <ShoppingBag className="w-5 h-5 group-cart-el" />
          )}
        </div>
      </div>
    )
  ) : !productCart ? (
    extCheckSig != "0x00000000" && !isSuccessExtCall ? (
      <ConnectButton.Custom>
        {({ account, openConnectModal }) => (
          <div
            className={`relative z-10 flex items-center justify-center w-full h-9 text-center text-white rounded-md nightwind-prevent group-cart ${
              isFailExtCall
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-500 hover:bg-gray-600"
            } transition-colors duration-150`}
            onClick={
              account ? async () => await handleExtCall() : openConnectModal
            }
            onMouseEnter={() => setIsUnlocked(true)}
            onMouseLeave={() => setIsUnlocked(false)}
          >
            {labelAdd && (
              <p className="mr-2 text-sm font-medium sm:text-base">
                {labelAdd}
              </p>
            )}
            {isLoadingExtCall ? (
              <Spinner />
            ) : (
              <Lock
                className="w-5 h-5 mr-1 group-cart-el"
                isUnlocked={isUnlocked}
              />
            )}
          </div>
        )}
      </ConnectButton.Custom>
    ) : (
      <div
        className={`relative z-10 flex items-center justify-center w-full h-9 text-center text-white rounded-md nightwind-prevent ${
          availableUnits != 0
            ? "group-cart bg-green-500 hover:bg-green-600 transition-colors duration-150"
            : "bg-gray-400 cursor-default"
        }`}
        onClick={async () =>
          !preview &&
          availableUnits != 0 &&
          (await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerId,
            slicerAddress,
            productId,
            price,
            isUSD,
            extCallValue,
            buyerCustomData,
            name,
            productCart ? ++productCart.quantity : 1,
            String(id),
            externalPriceAddress
          ))
        }
      >
        {labelAdd && (
          <p className="mr-2 text-sm font-medium sm:text-base">{labelAdd}</p>
        )}
        <Cart className="w-5 h-5 mr-1 group-cart-el" />
      </div>
    )
  ) : maxUnits != 1 ? (
    <div className="relative z-10 grid items-center justify-center w-full grid-cols-4 overflow-hidden text-center bg-white border border-gray-100 rounded-md shadow-md">
      <div
        className="flex items-center justify-center text-red-500 transition-colors duration-150 h-9 hover:bg-red-500 hover:text-white"
        onClick={async () =>
          await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerId,
            slicerAddress,
            productId,
            price,
            isUSD,
            extCallValue,
            buyerCustomData,
            name,
            --productCart.quantity,
            String(id),
            externalPriceAddress
          )
        }
      >
        <Minus className="w-[17px] h-[17px]" />
      </div>
      <div className="flex items-center justify-center col-span-2 pl-3 text-sm text-black border-l border-r border-gray-200 cursor-default h-9">
        <input
          value={productCart.quantity}
          type="number"
          className="w-full text-center bg-transparent border-none outline-none focus:ring-0 form-input"
          onChange={(e) => {
            handleUpdateCart(
              cookies,
              setCookie,
              productCart,
              slicerId,
              slicerAddress,
              productId,
              price,
              isUSD,
              extCallValue,
              buyerCustomData,
              name,
              Number(e.target.value),
              String(id),
              externalPriceAddress
            )
          }}
        />
      </div>
      <div
        className={`flex items-center justify-center h-9 transition-colors duration-150 ${
          adjustedAvailability != 0 &&
          (maxUnits == 0 || purchasedQuantity + productCart.quantity < maxUnits)
            ? "text-green-500 hover:bg-green-500 hover:text-white"
            : "text-white bg-gray-400 cursor-default"
        }`}
        onClick={async () =>
          adjustedAvailability != 0 &&
          (maxUnits == 0 ||
            purchasedQuantity + productCart.quantity < maxUnits) &&
          (await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerId,
            slicerAddress,
            productId,
            price,
            isUSD,
            extCallValue,
            buyerCustomData,
            name,
            productCart ? ++productCart.quantity : 1,
            String(id),
            externalPriceAddress
          ))
        }
      >
        <Plus className="w-[17px] h-[17px]" />
      </div>
    </div>
  ) : (
    <div
      className="relative z-10 flex items-center justify-center w-full text-center text-white transition-colors duration-150 bg-red-500 rounded-md h-9 nightwind-prevent group-cart hover:bg-red-600"
      onClick={async () =>
        await handleUpdateCart(
          cookies,
          setCookie,
          productCart,
          slicerId,
          slicerAddress,
          productId,
          price,
          isUSD,
          extCallValue,
          buyerCustomData,
          name,
          --productCart.quantity,
          String(id),
          externalPriceAddress
        )
      }
    >
      {labelRemove && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelRemove}</p>
      )}
      <Trash className="w-5 h-5 mr-1 group-cart-el" />
    </div>
  )
}

export default CartButton

// TODO: Refactor
