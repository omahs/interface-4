import { NextApiRequest, NextApiResponse } from "next"

const sendSlack = async (req: NextApiRequest, res: NextApiResponse) => {
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
}

export default sendSlack
