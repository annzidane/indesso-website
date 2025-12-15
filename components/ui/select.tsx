import React from "react"

type SelectItemProps = {
  value?: string | number
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export const SelectItem: React.FC<SelectItemProps> = () => {
  // marker component — rendering is handled by Select
  return null
}

export const SelectContent: React.FC<React.PropsWithChildren & React.HTMLAttributes<HTMLElement>> = ({ children }) => {
  // marker used as a container for SelectItem children
  return <>{children}</>
}

export const SelectValue: React.FC<{ placeholder?: string } & React.HTMLAttributes<HTMLElement>> = () => {
  // marker to pass placeholder via SelectTrigger
  return null
}

export const SelectTrigger: React.FC<React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
  // render a wrapper so className and other attributes are valid on usage sites
  return <div className={className}>{children}</div>
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode
  // helper prop used by callers in this project
  onValueChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({ children, className = "", onValueChange, ...props }) => {
  // Extract SelectContent and SelectTrigger from children
  const childArray = React.Children.toArray(children)

  const contentChild = childArray.find((c: any) => c?.type === SelectContent)
  const triggerChild = childArray.find((c: any) => c?.type === SelectTrigger)

  // placeholder extraction from trigger -> SelectValue
  let placeholder: string | undefined
  if (triggerChild && (triggerChild as any).props?.children) {
    const triggerChildren = React.Children.toArray((triggerChild as any).props.children)
    const valueChild = triggerChildren.find((c: any) => c?.type === SelectValue)
    if (React.isValidElement(valueChild) && valueChild.props) {
      placeholder = (valueChild.props as any).placeholder
    }
  }

  // options are children of contentChild
  const options: any[] = contentChild ? React.Children.toArray((contentChild as any).props.children) : []

  // Avoid setting `selected` on <option> — React warns. If no controlled `value` or
  // `defaultValue` is provided and we have a placeholder, set a defaultValue of "".
  const rest: any = { ...props }
  if (placeholder && rest.value === undefined && rest.defaultValue === undefined) {
    rest.defaultValue = ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (typeof onValueChange === "function") {
      onValueChange(v)
    }
    if (typeof rest.onChange === "function") {
      rest.onChange(e)
    }
  }

  return (
    <div>
      <select
        {...rest}
        onChange={handleChange}
        className={`w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt: any, idx: number) => {
          // opt is expected to be a SelectItem element; extract props safely
          if (React.isValidElement(opt)) {
            const val = (opt.props as any)?.value ?? (opt.props as any)?.children ?? String(idx)
            const label = (opt.props as any)?.children ?? (opt.props as any)?.value ?? String(val)
            const key = opt.key ?? `${val}-${idx}`
            return (
              <option key={String(key)} value={String(val)}>
                {label}
              </option>
            )
          }

          // fallback for non-elements
          const val = String(opt ?? idx)
          return (
            <option key={`opt-${idx}`} value={val}>
              {val}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
