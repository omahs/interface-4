import { useState, useEffect } from "react"
import markdownToHtml from "@lib/markdownToHtml"

type Props = {
  content: string
  deps?: any[]
  className?: string
}

const MarkdownBlock = ({ content, deps = [], className }: Props) => {
  const [htmlContent, setHtmlContent] = useState("")

  const handleFormatContent = async () => {
    setHtmlContent(await markdownToHtml(content))
  }

  useEffect(() => {
    handleFormatContent()
  }, deps)

  return (
    <div
      className={className ? className : "prose text-left"}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export default MarkdownBlock
