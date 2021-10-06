export default async function markdownToHtml(markdown) {
  const remark = (await import("remark")).default
  const html = (await import("remark-html")).default

  const result = await remark().use(html).process(markdown)
  return result.toString()
}
