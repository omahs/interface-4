const res = (
  status: number,
  response: string,
  contentType = "application/json"
) =>
  new Response(response, {
    status,
    headers: { "Content-Type": contentType }
  })

export default res
