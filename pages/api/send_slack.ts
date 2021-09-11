import { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"

const sendSlack = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "POST") {
      const { text } = JSON.parse(req.body)
      const data = {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
        }),
        method: "POST",
      }

      const response = await fetch(process.env.SLACK_HOOK_URL, data)
      res.status(200).json(response)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default sendSlack

// Add cors to all closed endpoints (in dev branch)
