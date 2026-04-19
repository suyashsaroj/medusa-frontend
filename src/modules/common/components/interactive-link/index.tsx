import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group relative pb-1"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-primary font-bold tracking-tight">
        {children}
      </Text>
      <div className="absolute bottom-0 left-0 w-full h-0.5 border-b-2 border-dashed border-primary/20 group-hover:border-secondary transition-colors"></div>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150 text-secondary"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
