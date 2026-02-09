'use client'

import React, { useMemo, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const onToggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index))

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        if (item?.type === 'dropdown') {
          const isOpen = openIndex === i
          const dropdownId = `nav-dropdown-${i}`
          return (
            <div key={i} className="relative">
              <CMSLink
                {...item.dropdownLink}
                appearance="link"
                aria-controls={dropdownId}
                aria-expanded={isOpen}
                onClick={(event) => {
                  if (!isOpen) {
                    event.preventDefault()
                    onToggle(i)
                  }
                }}
              />
              <div
                className={`absolute left-0 top-full min-w-[12rem] rounded-lg border bg-white p-2 shadow-lg ${
                  isOpen ? 'block' : 'hidden'
                }`}
                id={dropdownId}
              >
                <ul className="flex flex-col gap-1">
                  {item.dropdownLinks?.map(({ link }, index) => (
                    <li key={index}>
                      <CMSLink {...link} appearance="link" className="block px-2 py-1" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        return <CMSLink key={i} {...item?.link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
