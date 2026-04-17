import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedCounter } from '../AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renders with prefix and suffix', () => {
    render(<AnimatedCounter value={42} prefix="Rs " suffix="%" />)
    const el = screen.getByText(/Rs.*%/)
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('tabular-nums')
  })

  it('renders with default value of 0 before animation', () => {
    render(<AnimatedCounter value={100} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('applies decimal formatting', () => {
    render(<AnimatedCounter value={0} decimals={1} />)
    expect(screen.getByText('0.0')).toBeInTheDocument()
  })
})
