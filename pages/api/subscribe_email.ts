import { NextApiRequest, NextApiResponse } from "next"
import mailchimp from "@mailchimp/mailchimp_marketing"
import corsMiddleware from "@utils/corsMiddleware"

const subscribeEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "POST") {
      const { email } = JSON.parse(req.body)
      const listId = process.env.MAILCHIMP_LIST_ID
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_KEY,
        server: "us1",
      })

      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
      })

      res.status(200).json(response)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default subscribeEmail
