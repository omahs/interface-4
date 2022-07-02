import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, path } = req.query

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.SECRET_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    await res.revalidate(`/${path}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}

export default handler
