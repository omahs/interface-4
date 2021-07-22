import { Button, Input } from "@components/ui"
import fetcher from "@utils/fetcher"
import { ethers } from "ethers"
import { useState } from "react"
import useSWR from "swr"
import { useAppContext } from "@components/ui/context"

const SlicersList = () => {
  const { account } = useAppContext()
  const { data } = useSWR(`/api/account/${account}/slicers`, fetcher)

  return (
    <div>
      <h2 className="leading-normal">Your slicers</h2>
      {data &&
        [...Array(Number(data.totalOwned.hex))].map((el, key) => {
          const i = key
          const slicerId = Number(data.idsUint[i].hex)
          const slicerShares = Number(data.shares[i].hex)
          return <p key={key}>{i}</p>
        })}
    </div>
  )
}

export default SlicersList
