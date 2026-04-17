import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { GovernanceDomains } from '../GovernanceDomains'

describe('GovernanceDomains', () => {
  it('renders all 6 domain cards', () => {
    render(
      <MemoryRouter>
        <GovernanceDomains />
      </MemoryRouter>
    )
    const cards = document.querySelectorAll('.domain-card')
    expect(cards).toHaveLength(6)
  })

  it('renders real stat values from data files', () => {
    render(
      <MemoryRouter>
        <GovernanceDomains />
      </MemoryRouter>
    )
    expect(screen.getByText('8.5%')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(
      <MemoryRouter>
        <GovernanceDomains />
      </MemoryRouter>
    )
    expect(screen.getByText('nav.domains')).toBeInTheDocument()
  })
})
