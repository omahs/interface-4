import { useState, useEffect } from "react"
import markdownToHtml from "@lib/markdownToHtml"

type Props = {
  content: string
  deps?: any[]
  className?: string
}

const MarkdownBlock = ({
  content,
  deps = [],
  className = "prose text-left",
}: Props) => {
  const [htmlContent, setHtmlContent] = useState("")

  const handleFormatContent = async () => {
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

// Todo: Add <Question /> to alert users that they can write using md
