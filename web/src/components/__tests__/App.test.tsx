import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'

describe('App', () => {
  it('renders hero section and governance domains', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('hero.partyName')).toBeInTheDocument()
    expect(screen.getAllByText('nav.domains').length).toBeGreaterThan(0)
  })
})
