import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SourceCitationModal } from '../SourceCitationModal'

const mockStat = {
  value: '8.5%',
  description: 'Secondary school dropout rate',
  year: '2024-25',
  sourceName: 'UDISE+',
  sourceUrl: 'https://dashboard.udiseplus.gov.in',
  methodology: 'Annual survey',
}

describe('SourceCitationModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <SourceCitationModal isOpen={false} onClose={vi.fn()} stat={mockStat} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when stat is null', () => {
    const { container } = render(
      <SourceCitationModal isOpen={true} onClose={vi.fn()} stat={null} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders stat details when open', () => {
    render(<SourceCitationModal isOpen={true} onClose={vi.fn()} stat={mockStat} />)
    expect(screen.getByText('8.5%')).toBeInTheDocument()
    expect(screen.getByText('Secondary school dropout rate')).toBeInTheDocument()
    expect(screen.getByText('2024-25')).toBeInTheDocument()
    expect(screen.getByText('UDISE+')).toBeInTheDocument()
    expect(screen.getByText('Annual survey')).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<SourceCitationModal isOpen={true} onClose={vi.fn()} stat={mockStat} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('source link opens in new tab', () => {
    render(<SourceCitationModal isOpen={true} onClose={vi.fn()} stat={mockStat} />)
    const link = screen.getByRole('link', { name: 'UDISE+' })
    expect(link).toHaveAttribute('href', 'https://dashboard.udiseplus.gov.in')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<SourceCitationModal isOpen={true} onClose={onClose} stat={mockStat} />)
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn()
    render(<SourceCitationModal isOpen={true} onClose={onClose} stat={mockStat} />)
    const backdrop = document.querySelector('[aria-hidden="true"]')!
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(<SourceCitationModal isOpen={true} onClose={onClose} stat={mockStat} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
