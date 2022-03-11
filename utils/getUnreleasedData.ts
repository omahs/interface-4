import { Dispatch, SetStateAction } from "react"

const getUnreleasedData = async (
  account: string,
  slicerAddresses: string[],
  setUnreleased: Dispatch<SetStateAction<any[]>>
) => {
  const fetcher = (await import("@utils/fetcher")).default

  const data = {
    method: "POST",
    body: JSON.stringify({ slicerAddresses }),
  }

  const unreleasedData = await fetcher(
    `/api/account/${account}/unreleased`,
    data
  )

  setUnreleased(unreleasedData)
}

export default getUnreleasedData
