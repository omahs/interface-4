import { SlicerCard } from "@components/ui"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import { useAppContext } from "@components/ui/context"

const SlicersList = () => {
  const { account } = useAppContext()
  const { data } = useSWR(
    account ? `/api/account/${account}/slicers` : null,
    fetcher
  )

  return (
    <div>
      <h1 className="pb-8">Your slicers</h1>
      {data &&
        [...Array(Number(data.totalOwned.hex))].map((el, key) => {
          const i = Number(key)
          const slicerId = Number(data.idsUint[i].hex)
          const slicerShares = Number(data.shares[i].hex)
          return (
            <SlicerCard
              key={key}
              slicerId={slicerId}
              shares={slicerShares}
              account={account}
            />
          )
        })}
    </div>
  )
}

export default SlicersList
