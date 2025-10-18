import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import Navigation from '@/components/navigation'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('renders logo and blog link', () => {
    render(<Navigation />)
    expect(screen.getByTestId('link-logo')).toBeInTheDocument()
    expect(screen.getByTestId('link-nav-blog')).toBeInTheDocument()
  })
})
