import Link from "next/link"
import Chevron from "@components/icons/Chevron"

export default function Back() {
  return (
    <div className="inline-block">
      <Link href="/blog">
        <a className="text-sm group">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-1 transition-transform duration-200 transform group-hover:-translate-x-1">
              <Chevron />
            </div>
            <p className="mt-0.5 font-normal">Go back</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
