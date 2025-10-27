'use client';

import React from 'react'

function getCheckboxElement(node: React.ReactNode) {
  if (!React.isValidElement<HTMLInputElement>(node)) {
    return null
  }

  const elementType = node.type
  if (typeof elementType !== 'string') {
    return null
  }

  if (elementType.toLowerCase() !== 'input') {
    return null
  }

  if (node.props?.type !== 'checkbox') {
    return null
  }

  return node
}

export function ChecklistItem(props: React.ComponentProps<'li'>) {
  const { children, className, ...rest } = props
  const childArray = React.Children.toArray(children)
  const firstChild = childArray[0]
  const checkboxElement = getCheckboxElement(firstChild)
  // Always call hooks at the top, before any early returns
  const initialChecked = checkboxElement ? Boolean(checkboxElement.props?.checked) : false
  const [checked, setChecked] = React.useState(initialChecked)

  if (!checkboxElement) {
    return (
      <li className={className} {...rest}>
        {children}
      </li>
    )
  }

  const labelContent = childArray.slice(1).filter((child) => {
    if (typeof child === 'string') {
      return child.trim().length > 0
    }
    return true
  })

  const combinedClassName = ['list-none', className].filter(Boolean).join(' ')

  return (
    <li {...rest} className={combinedClassName}>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border border-emerald-500 text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
          checked={checked}
          onChange={() => setChecked((state) => !state)}
        />
        <span className={checked ? 'line-through text-muted-foreground' : ''}>
          {labelContent.length > 0 ? labelContent : null}
        </span>
      </label>
    </li>
  )
}
