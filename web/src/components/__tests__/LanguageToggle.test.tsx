import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageToggle } from '../LanguageToggle'

const mockChangeLanguage = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key === 'nav.language' ? 'English' : key,
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}))

describe('LanguageToggle', () => {
  it('renders a button with language text', () => {
    render(<LanguageToggle />)
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
  })

  it('calls changeLanguage on click', () => {
    render(<LanguageToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockChangeLanguage).toHaveBeenCalledWith('ta')
  })
})
