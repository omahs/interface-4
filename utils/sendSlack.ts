import fetcher from "@utils/fetcher"

export default async function sendSlack(text: string) {
  const data = {
    body: JSON.stringify({ text }),
    method: "POST",
  }

  await fetcher(`/api/send_slack`, data)
}
