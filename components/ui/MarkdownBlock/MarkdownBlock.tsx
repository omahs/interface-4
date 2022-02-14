import { useState, useEffect } from "react"

type Props = {
  content: string
  deps?: any[]
  className?: string
}

const MarkdownBlock = ({
  content,
  deps = [],
  className = "prose text-left break-words",
}: Props) => {
  const [htmlContent, setHtmlContent] = useState("")

  const handleFormatContent = async () => {
    const markdownToHtml = (await import("@lib/markdownToHtml")).default

    setHtmlContent(await markdownToHtml(content))
  }

  useEffect(() => {
    handleFormatContent()
  }, deps)

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export default MarkdownBlock
