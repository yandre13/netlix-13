import { Button, type ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/cn'

export type ItemDropdown = {
  icon?: React.ReactNode
  label: string
  shortcut?: string
  onSelect?: () => void
  disabled?: boolean
}

export function BasicDropdown({
  button,
  buttonText,
  header,
  items,
  footer,
  customClass,
  alignContent,
  onOpenChange,
}: {
  button?: React.ReactNode
  buttonText?: string
  header?: string
  items: ItemDropdown[]
  footer?: Omit<ItemDropdown, 'shortcut'>
  customClass?: string
  alignContent?: 'start' | 'end' | 'center'
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {button ? (
          button
        ) : (
          <Button variant="outline">{buttonText ?? 'Open'}</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('w-56', customClass)}
        align={alignContent}
      >
        {header && (
          <>
            <DropdownMenuLabel>{header}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {items &&
          items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        {footer && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={footer.onSelect}>
              {footer.icon}
              <span>{footer.label}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
