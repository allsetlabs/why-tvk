import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders party name heading', () => {
    render(<HeroSection />)
    expect(screen.getByText('hero.partyName')).toBeInTheDocument()
  })

  it('renders english party name', () => {
    render(<HeroSection />)
    expect(screen.getByText('hero.partyNameEn')).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<HeroSection />)
    expect(screen.getByText('hero.tagline')).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    render(<HeroSection />)
    expect(screen.getByText('hero.scrollDown')).toBeInTheDocument()
  })

  it('renders fire particles', () => {
    render(<HeroSection />)
    const particles = document.querySelectorAll('.fire-particle')
    expect(particles.length).toBe(14)
  })

  it('includes language toggle', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
