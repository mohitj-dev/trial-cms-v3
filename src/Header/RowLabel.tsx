'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const rowNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const isDropdown = data?.data?.type === 'dropdown'
  const labelText = isDropdown ? data?.data?.dropdownLink?.label : data?.data?.link?.label
  const label = labelText ? `Nav item ${rowNumber}: ${labelText}` : 'Row'

  return <div>{label}</div>
}
