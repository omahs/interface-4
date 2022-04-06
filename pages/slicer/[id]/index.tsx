import { useEffect, useState } from "react"
import Head from "next/head"
import { NextSeo } from "next-seo"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { Message } from "@utils/handleMessage"
import { useAllowed } from "@lib/useProvider"
import { useAppContext } from "@components/ui/context"
import { domain } from "@components/common/Head"
import Edit from "@components/icons/Edit"
import {
  ActionScreen,
  CopyAddress,
  DoubleText,
  SlicerTags,
  SlicerDescription,
  SlicerName,
  SlicerImageBlock,
  Container,
  SlicerSubmitBlock,
  SlicerProducts,
  SlicerSponsors
} from "@components/ui"
import fetcher from "@utils/fetcher"
import useQuery from "@utils/subgraphQuery"
import { BigNumber, ethers } from "ethers"
import multicall from "@utils/multicall"

export type NewImage = { url: string; file: File }
export type SlicerAttributes = {
  Creator: string
  "Superowner slices": number
  "Sliced on": number
  "Total slices": number
}
export type SlicerData = {
  name: any
  description: any
  tags: any
  imageUrl: any
}
export type AddressAmount = {
  address: string
  amount: number
}

const initAttributes = {
  Creator: "",
  "Superowner slices": 0,
  "Sliced on": 0,
  "Total slices": 0
}

const Id = ({
  slicerInfo,
  products
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { account } = useAppContext()
  const { isAllowed } = useAllowed(slicerInfo?.id)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sponsorLoading, setSponsorLoading] = useState(true)
  const [msg, setMsg] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const [slicer, setSlicer] = useState<SlicerData>({
    name: slicerInfo?.name,
    description: slicerInfo?.description,
    tags: slicerInfo?.tags,
    imageUrl: slicerInfo?.image
  })
  const [slicerAttributes, setSlicerAttributes] =
    useState<SlicerAttributes>(initAttributes)

  const [newDescription, setNewDescription] = useState(slicer.description)
  const [newTags, setNewTags] = useState(slicer.tags)
  const [newName, setNewName] = useState(slicer.name)
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined
  })
  const [tempImageUrl, setTempImageUrl] = useState("")
  const [sponsors, setSponsors] = useState<AddressAmount[]>([])
  const [owners, setOwners] = useState<AddressAmount[]>([])
  const [unreleased, setUnreleased] = useState([])
  const pageTitle =
    slicer.name === `Slicer #${slicerInfo?.id}`
      ? slicer.name
      : `${slicer.name} | Slicer #${slicerInfo?.id}`

  // Todo: For collectibles save image on web3Storage instead of supabase? + Allow indefinite size? Figure it out
  const editAllowed = !slicerInfo?.isCollectible
    ? isAllowed
    : slicerAttributes?.Creator === account?.toLowerCase() // only Creator
    ? (newName === `Slicer #${slicerInfo?.id}` && // default name, descr & image
        newDescription === "" &&
        newImage.url === "" &&
        slicer.imageUrl === "https://slice.so/slicer_default.png") ||
      false // slicerAttributes["Total slices"] === account.slices // creator has all slices
    : false

  const tokensQuery = /* GraphQL */ `
  payeeSlicers (
    where: {slicer: "${slicerInfo?.id}"}, 
    orderBy: "totalPaid", 
    orderDirection: "desc"
  ) {
    id
    slices
    totalPaid
  }
`
  const subgraphData = useQuery(tokensQuery, [slicerInfo?.address])

  useEffect(() => {
    let attr = initAttributes
    slicerInfo?.attributes.map((el) => {
      attr[el.trait_type] = el.value
    })
    setSlicerAttributes(attr)
    setSlicer({
      name: slicerInfo?.name,
      description: slicerInfo?.description,
      tags: slicerInfo?.tags,
      imageUrl: slicerInfo?.image
    })
  }, [slicerInfo])

  useEffect(() => {
    setEditMode(false)
  }, [account])

  useEffect(() => {
    if (subgraphData) {
      const sponsorsList: AddressAmount[] = []
      subgraphData.payeeSlicers.forEach((el) => {
        const address = el.id.split("-")[1]
        const totalPaid = el.totalPaid
        if (address != slicerInfo?.address && totalPaid && totalPaid != "0") {
          const amount = Number(
            BigNumber.from(totalPaid).div(BigNumber.from(10).pow(15))
          )
          sponsorsList.push({ address, amount })
        }
      })
      setSponsors(sponsorsList)

      const ownersList: AddressAmount[] = []
      subgraphData.payeeSlicers.forEach((el) => {
        const address = el.id.split("-")[1]
        const slicesOwned = el.slices
        if (slicesOwned != "0") {
          ownersList.push({ address, amount: Number(slicesOwned) })
        }
      })
      const sortedOwners = ownersList.sort((a, b) => b.amount - a.amount)
      setOwners(sortedOwners)

      setSponsorLoading(false)
    }
  }, [subgraphData])

  const getOwnersUnreleased = async (args: string[]) => {
    const result = await multicall(
      slicerInfo?.address,
      "unreleased(address)",
      args
    )
    setUnreleased(result)
  }

  useEffect(() => {
    if (owners.length != 0) {
      const args = []
      owners.forEach((owner) => {
        args.push(ethers.utils.hexZeroPad(owner.address, 32).substring(2))
      })

      getOwnersUnreleased(args)
    }
  }, [owners])

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
              {editAllowed && !editMode && (
                <div
                  className="cursor-pointer absolute bottom-0 pb-0.5 sm:pb-1.5 right-[-38px] sm:right-[-43px] inline-block hover:text-yellow-500"
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  <Edit className="w-6 h-6" />
                </div>
              )}
            </span>
          </div>
          <div>
            <SlicerName
              name={slicer.name}
              newName={newName}
              setNewName={setNewName}
              editMode={editMode}
              loading={loading}
            />
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
              totalSlices={slicerAttributes["Total slices"]}
              owners={owners}
              unreleased={unreleased}
              setUnreleased={setUnreleased}
            />
          </div>
          <SlicerProducts
            account={account}
            editMode={editMode}
            slicerId={slicerInfo?.id}
            slicerAddress={slicerInfo?.address}
            products={products}
          />
          <SlicerSponsors
            sponsors={sponsors}
            slicerId={slicerInfo?.id}
            slicerAddress={slicerInfo?.address}
            sponsorData={slicerInfo?.sponsors}
            editMode={editMode}
            tag={slicer.tags}
            loading={sponsorLoading}
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer/total`)
  // const totalSlicers = 0
  const paths = [...Array(totalSlicers).keys()].map((slicerId) => {
    const id = String(slicerId)
    return {
      params: {
        id
      }
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const id = context.params.id
  const hexId = Number(id).toString(16)

  const slicerInfo = await fetcher(`${baseUrl}/api/slicer/${hexId}?stats=false`)
  const products = await fetcher(`${baseUrl}/api/slicer/${id}/products`)

  return {
    props: {
      slicerInfo,
      products
    },
    revalidate: 10
  }
}

export default Id

// TODO
// - retrieve account.slices in editAllowed condition
// - Clean stuff
//
