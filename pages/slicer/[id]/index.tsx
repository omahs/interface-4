import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import Head from "next/head"
import { NextSeo } from "next-seo"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { Message } from "@utils/handleMessage"
import { defaultProvider, useAllowed } from "@lib/useProvider"
import { useAppContext } from "@components/ui/context"
import { domain } from "@components/common/Head"
import Edit from "@components/icons/Edit"
import {
  ActionScreen,
  CopyAddress,
  DoubleText,
  SlicerTags,
  SlicerDescription,
  SlicerEditMain,
  SlicerImageBlock,
  Container,
  SlicerSubmitBlock,
  SlicerProducts,
  SlicerSponsors
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { ethers } from "ethers"
import multicall from "@utils/multicall"
import decimalToHex from "@utils/decimalToHex"
import formatCalldata from "@utils/formatCalldata"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"
import { sliceCore } from "@lib/initProvider"
import { signMessage } from "@utils/signMessage"
import Spinner from "@components/icons/Spinner"
import Cross from "@components/icons/Cross"
import prisma from "@lib/prisma"
import { Slicer } from "@prisma/client"

export type NewImage = { url: string; file: File }
export type SlicerAttributes = {
  display_type: "number" | "date" | undefined
  trait_type:
    | "Total slices"
    | "Superowner slices"
    | "Creator"
    | "Controller"
    | "Sliced on"
  value: string | number
}[]
export type SlicerData = {
  name: string
  description: string
  tags: string
  imageUrl: string
  attributes: SlicerAttributes
  totalSlices: number
  customPath: string | undefined
}
export type AddressAmount = {
  address: string
  amount: number
}
export type BlockchainPrice = {
  currency: { id: string }
  dynamicPricing: boolean
  externalAddress: string
  price: string
}
export type BlockchainProduct = {
  availableUnits: string
  createdAtTimestamp: string
  extAddress: string
  extCheckSig: string
  extExecSig: string
  extValue: string
  id: string
  isInfinite: boolean
  maxUnitsPerBuyer: string
  prices: BlockchainPrice[]
  totalPurchases: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

const Id = ({
  slicerInfo,
  products,
  subgraphDataPayees,
  blockchainProducts,
  sponsors
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { view } = router.query
  const { account, setModalView, isSigned, setIsSigned, signMessageAsync } =
    useAppContext()
  const { isAllowed } = useAllowed(slicerInfo)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSignature, setLoadingSignature] = useState(false)
  const [msg, setMsg] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const [slicer, setSlicer] = useState<SlicerData>({
    name: slicerInfo?.name,
    description: slicerInfo?.description,
    tags: slicerInfo?.tags,
    imageUrl: slicerInfo?.image,
    attributes: slicerInfo?.attributes,
    totalSlices: slicerInfo?.totalSlices,
    customPath: slicerInfo?.slicerConfig?.customPath
  })

  const [newDescription, setNewDescription] = useState(slicer.description)
  const [newTags, setNewTags] = useState(slicer.tags)
  const [newPath, setNewPath] = useState(
    slicerInfo?.slicerConfig?.customPath || ""
  )
  const [newName, setNewName] = useState(slicer.name)
  const [sponsorsList, setSponsorsList] = useState(sponsors)
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined
  })
  const [tempImageUrl, setTempImageUrl] = useState("")
  const [owners, setOwners] = useState<AddressAmount[]>([])
  const [unreleased, setUnreleased] = useState([])
  const [editAllowed, setEditAllowed] = useState(false)
  const pageTitle =
    slicer.name === `Slicer #${slicerInfo?.id}`
      ? slicer.name
      : `${slicer.name} | Slicer #${slicerInfo?.id}`

  const totalSlices = slicerInfo.totalSlices

  const handleEditMode = async () => {
    try {
      if (!isSigned) {
        setLoadingSignature(true)
        await signMessage(account, signMessageAsync, setIsSigned)
      }

      if (isSigned || localStorage.getItem("isSigned") == account) {
        setEditMode(true)
      }
    } catch (err) {
      console.log(err)
    }
    setLoadingSignature(false)
  }

  useEffect(() => {
    setEditMode(false)

    const controller = slicer?.attributes?.find(
      (el) => el.trait_type === "Controller"
    )?.value
    const creator = slicer?.attributes?.find(
      (el) => el.trait_type === "Creator"
    )?.value

    const isEditAllowed = controller
      ? controller === account?.toLowerCase()
      : !slicerInfo?.isImmutable
      ? isAllowed == "metadata" || isAllowed == "full"
      : creator === account?.toLowerCase() // only Creator
      ? (newName === `Slicer #${slicerInfo?.id}` && // default name, descr & image
          newDescription === "" &&
          newImage.url === "" &&
          slicer.imageUrl === "https://slice.so/slicer_default.png") ||
        false // slicer?.attributes["Total slices"] === account.slices // creator has all slices
      : false
    setEditAllowed(isEditAllowed)

    // TODO: For collectibles save image on web3Storage instead of supabase? + Allow indefinite size? Figure it out
  }, [account, isAllowed])

  useEffect(() => {
    if (subgraphDataPayees) {
      const ownersList: AddressAmount[] = []
      subgraphDataPayees.forEach((el) => {
        const address = el.id.split("-")[0]
        const slicesOwned = el.slices
        if (slicesOwned != "0") {
          ownersList.push({ address, amount: Number(slicesOwned) })
        }
      })
      const sortedOwners = ownersList.sort((a, b) => b.amount - a.amount)
      setOwners(sortedOwners)
    }
  }, [subgraphDataPayees])

  const getOwnersUnreleased = async (args: string[]) => {
    const result = await multicall(
      slicerInfo?.address,
      "unreleased(address,address)",
      args
    )
    setUnreleased(result)
  }

  useEffect(() => {
    if (owners.length != 0) {
      const args = []
      owners.forEach((owner) => {
        const currency = ethers.constants.AddressZero
        args.push(formatCalldata(owner.address, currency))
      })

      getOwnersUnreleased(args)
    }
  }, [owners])

  useEffect(() => {
    if (view == "owners") {
      if (unreleased.length != 0) {
        setModalView({
          cross: true,
          name: "OWNERS_VIEW",
          params: {
            slicerId: slicerInfo?.id,
            owners,
            totalSlices,
            unreleased,
            setUnreleased
          }
        })
      } else {
        setModalView({
          cross: false,
          name: "LOADING_VIEW"
        })
      }
    }
  }, [view, unreleased])

  return (
    <Container page={true}>
      {slicerInfo?.id !== null ? (
        <main className="w-full max-w-screen-sm mx-auto space-y-8 sm:space-y-10">
          {slicer.name != undefined && (
            <>
              <NextSeo
                title={pageTitle}
                openGraph={{
                  title: pageTitle,
                  description: slicer.description,
                  url: `${domain}/slicer/${slicerInfo?.id}`,
                  images: [
                    {
                      url: slicer.imageUrl || `${domain}/og_image.jpg`,
                      alt: `${slicer.name} cover image`
                    }
                  ]
                }}
              />
              {slicer.imageUrl && (
                <Head>
                  <meta name="twitter:image" content={slicer.imageUrl} />
                </Head>
              )}
            </>
          )}
          <div>
            <div className="pb-5 pl-4">
              <CopyAddress slicerAddress={slicerInfo?.address} />
            </div>
            <span className="relative">
              <DoubleText
                inactive
                logoText={slicer.name || `Slicer #${slicerInfo?.id}`}
                size="text-3xl sm:text-5xl"
                position=""
              />
              {editAllowed &&
                (!editMode ? (
                  <div
                    className="cursor-pointer absolute bottom-0 pb-0.5 sm:pb-1.5 right-[-38px] sm:right-[-43px] inline-block hover:text-yellow-500"
                    onClick={async () =>
                      !loadingSignature && (await handleEditMode())
                    }
                  >
                    {loadingSignature ? (
                      <Spinner size="w-6 h-6" />
                    ) : (
                      <Edit className="w-6 h-6" />
                    )}
                  </div>
                ) : (
                  <div
                    className="cursor-pointer absolute bottom-0 pb-0.5 sm:pb-1.5 right-[-38px] sm:right-[-43px] inline-block hover:text-yellow-500"
                    onClick={() => setEditMode(false)}
                  >
                    <Cross />
                  </div>
                ))}
            </span>
          </div>
          <div>
            {editMode && (
              <SlicerEditMain
                slicerId={slicerInfo?.id}
                name={slicer.name}
                newName={newName}
                newPath={newPath}
                setNewName={setNewName}
                setNewPath={setNewPath}
                loading={loading}
              />
            )}
            <SlicerTags
              tags={slicer.tags}
              newTags={newTags}
              setNewTags={setNewTags}
              editMode={editMode}
            />
            <SlicerDescription
              description={slicer.description}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              editMode={editMode}
              loading={loading}
            />
          </div>
          <div className="py-6">
            <SlicerImageBlock
              name={slicer.name}
              imageUrl={slicer.imageUrl}
              newImage={newImage}
              setNewImage={setNewImage}
              tempImageUrl={tempImageUrl}
              upload={editMode}
              msg={msg}
              setMsg={setMsg}
              loading={loading}
              slicerId={slicerInfo?.id}
              totalSlices={totalSlices}
              owners={owners}
              unreleased={unreleased}
              setUnreleased={setUnreleased}
            />
          </div>
          <SlicerProducts
            account={account}
            isAllowed={isAllowed}
            editMode={editMode}
            slicerId={slicerInfo?.id}
            slicerAddress={slicerInfo?.address}
            products={products}
            blockchainProducts={blockchainProducts}
          />
          <SlicerSponsors
            sponsorsList={sponsorsList}
            setSponsorsList={setSponsorsList}
            slicerId={slicerInfo?.id}
            slicerAddress={slicerInfo?.address}
            sponsorData={slicerInfo?.sponsors}
            editMode={editMode}
            tag={slicer.tags}
          />
          {editMode && (
            <SlicerSubmitBlock
              editMode={editMode}
              setEditMode={setEditMode}
              slicerInfo={slicerInfo}
              slicer={slicer}
              setSlicer={setSlicer}
              loading={loading}
              setLoading={setLoading}
              newName={newName}
              setNewName={setNewName}
              newPath={newPath}
              setNewPath={setNewPath}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              newTags={newTags}
              setNewTags={setNewTags}
              newImage={newImage}
              setNewImage={setNewImage}
              setTempImageUrl={setTempImageUrl}
              msg={msg}
              setMsg={setMsg}
            />
          )}
        </main>
      ) : (
        <ActionScreen
          text="This slicer doesn't exist (yet)"
          href="/"
          buttonLabel="Return to home"
        />
      )}
    </Container>
  )
}

export async function getStaticPaths() {
  const [slicers, totalSlicers] = await Promise.all([
    fetcher(`${baseUrl}/api/slicer`),
    sliceCore(defaultProvider).supply()
  ])

  // const totalSlicers = 0
  const paths = [...Array(Number(totalSlicers)).keys()].map((slicerId) => {
    const slicerData = slicers.find((slicer) => slicer.id === slicerId)
    const customPath = slicerData?.slicerConfig?.customPath

    const id = customPath || String(slicerId)
    return {
      params: {
        id
      }
    }
  })

  return { paths, fallback: "blocking" }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params.id
  let slicerId = String(id)
  let slicer: Slicer

  if (Number(id) != 0 && !Number(id)) {
    const slicerInfo = await prisma.slicerConfig.findFirst({
      where: {
        customPath: String(id)
      },
      select: {
        slicerId: true,
        slicer: {
          select: {
            id: true,
            name: true,
            description: true,
            external_url: true,
            address: true,
            image: true,
            tags: true,
            isImmutable: true,
            config: true,
            sponsors: true,
            attributes: true,
            slicerConfig: true
          }
        }
      }
    })
    slicer = slicerInfo?.slicer
    slicerId = String(slicerInfo?.slicerId)
  }

  // Handle inexistent path
  if (Number(slicerId) != 0 && !Number(slicerId)) {
    return {
      props: {
        slicerInfo: {
          id: null,
          name: "",
          description: "",
          tags: "",
          external_url: "",
          address: "",
          image: "",
          isImmutable: false,
          attributes: [],
          config: { sponsors: true },
          sponsors: {}
        },
        products: [],
        subgraphDataPayees: null,
        blockchainProducts: null,
        sponsors: null,
        key: null
      }
    }
  }

  const hexId = decimalToHex(Number(slicerId))

  const slicerInfo =
    slicer || (await fetcher(`${baseUrl}/api/slicer/${hexId}?stats=false`))

  if (!slicer && slicerInfo?.slicerConfig?.customPath) {
    return {
      redirect: {
        destination: `/slicer/${slicerInfo.slicerConfig.customPath}`,
        permanent: false
      }
    }
  }

  /**
   * TODO:
   * Deal with pagination when number of payeeSlicers > 100
   */
  const tokensQuery = /* GraphQL */ `
  slicer(id: "${hexId}") {
    slices
    payees(
      where: {
        slices_gt: "0"
      },
      orderBy: "slices", 
      orderDirection: "desc"
    ) {
      id
      slices
    }
    products (
      where: {
        isRemoved: false
      }
    ) {
      id
      prices {
        currency {
          id
        }
        price
        dynamicPricing
        externalAddress
      }
      isInfinite
      availableUnits
      maxUnitsPerBuyer
      totalPurchases
      createdAtTimestamp
      extAddress
      extValue
      extCheckSig
      extExecSig
    }
  } 
`

  const [products, { data: subgraphData }] = await Promise.all([
    fetcher(`${baseUrl}/api/slicer/${slicerId}/products`),
    client.query({
      query: gql`
        query {
          ${tokensQuery}
        }
      `,
      fetchPolicy: "no-cache"
    })
  ])

  slicerInfo.totalSlices = Number(subgraphData?.slicer?.slices) || null

  let sponsors: AddressAmount[]
  const sponsorsBody =
    slicerInfo?.address && process.env.NEXT_PUBLIC_CHAIN_ID == "1"
      ? {
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0xddefa8",
                toBlock: "latest",
                withMetadata: false,
                excludeZeroValue: true,
                maxCount: "0x3e8",
                category: ["external"],
                toAddress: slicerInfo?.address
              }
            ]
          }),
          method: "POST"
        }
      : null

  if (sponsorsBody) {
    const transfersQuery = await fetcher(
      process.env.NEXT_PUBLIC_NETWORK_URL,
      sponsorsBody
    )
    const transfers: {
      from: string
      value: number
    }[] = transfersQuery?.result?.transfers
    if (transfers) {
      sponsors = transfers
        .reduce((prev, curr) => {
          const { from: address, value: amount } = curr
          const index = prev.findIndex((el) => el.address == address)
          if (index == -1) {
            prev.push({ address, amount })
          } else {
            prev[index].amount += amount
          }
          return prev
        }, [])
        .sort((a, b) => b.amount - a.amount)
    }
  }

  return {
    props: {
      slicerInfo,
      products,
      subgraphDataPayees: subgraphData?.slicer?.payees || null,
      blockchainProducts: (subgraphData?.slicer?.products ||
        null) as BlockchainProduct[],
      sponsors: sponsors || null,
      key: slicerInfo.id
    },
    revalidate: 300
  }
}

export default Id
