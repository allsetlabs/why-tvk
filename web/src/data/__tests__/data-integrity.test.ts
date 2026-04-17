import { describe, it, expect } from 'vitest'
import {
  educationStats, educationBeforeAfter,
  healthcareStats, healthcareBeforeAfter,
  economyStats, economyBeforeAfter,
  agricultureStats, agricultureBeforeAfter,
  infrastructureStats, infrastructureBeforeAfter,
  lawAndOrderStats, lawAndOrderBeforeAfter,
} from '../index'
import type { Stat, BeforeAfter } from '../types'

const allStats: Stat[] = [
  ...educationStats,
  ...healthcareStats,
  ...economyStats,
  ...agricultureStats,
  ...infrastructureStats,
  ...lawAndOrderStats,
]

const allBeforeAfter: BeforeAfter[] = [
  ...educationBeforeAfter,
  ...healthcareBeforeAfter,
  ...economyBeforeAfter,
  ...agricultureBeforeAfter,
  ...infrastructureBeforeAfter,
  ...lawAndOrderBeforeAfter,
]

describe('Data integrity — Stats', () => {
  it('has no empty stats arrays', () => {
    expect(educationStats.length).toBeGreaterThan(0)
    expect(healthcareStats.length).toBeGreaterThan(0)
    expect(economyStats.length).toBeGreaterThan(0)
    expect(agricultureStats.length).toBeGreaterThan(0)
    expect(infrastructureStats.length).toBeGreaterThan(0)
    expect(lawAndOrderStats.length).toBeGreaterThan(0)
  })

  it('every stat has a unique id', () => {
    const ids = allStats.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every stat has required fields populated', () => {
    for (const stat of allStats) {
      expect(stat.id).toBeTruthy()
      expect(stat.year).toBeTruthy()
      expect(stat.description).toBeTruthy()
      expect(stat.source).toBeTruthy()
      expect(stat.sourceUrl).toBeTruthy()
      expect(stat.domain).toBeTruthy()
    }
  })

  it('every stat sourceUrl starts with https://', () => {
    for (const stat of allStats) {
      expect(stat.sourceUrl).toMatch(/^https:\/\//)
    }
  })

  it('every stat has a valid trend value', () => {
    for (const stat of allStats) {
      if (stat.trend !== undefined) {
        expect(['up', 'down', 'neutral']).toContain(stat.trend)
      }
    }
  })

  it('every stat domain matches its module', () => {
    for (const stat of educationStats) expect(stat.domain).toBe('education')
    for (const stat of healthcareStats) expect(stat.domain).toBe('healthcare')
    for (const stat of economyStats) expect(stat.domain).toBe('economy')
    for (const stat of agricultureStats) expect(stat.domain).toBe('agriculture')
    for (const stat of infrastructureStats) expect(stat.domain).toBe('infrastructure')
    for (const stat of lawAndOrderStats) expect(stat.domain).toBe('law-and-order')
  })
})

describe('Data integrity — BeforeAfter', () => {
  it('has no empty beforeAfter arrays', () => {
    expect(educationBeforeAfter.length).toBeGreaterThan(0)
    expect(healthcareBeforeAfter.length).toBeGreaterThan(0)
    expect(economyBeforeAfter.length).toBeGreaterThan(0)
    expect(agricultureBeforeAfter.length).toBeGreaterThan(0)
    expect(infrastructureBeforeAfter.length).toBeGreaterThan(0)
    expect(lawAndOrderBeforeAfter.length).toBeGreaterThan(0)
  })

  it('every beforeAfter has required fields', () => {
    for (const ba of allBeforeAfter) {
      expect(ba.metric).toBeTruthy()
      expect(ba.source).toBeTruthy()
      expect(ba.sourceUrl).toMatch(/^https:\/\//)
      expect(ba.before.year).toBeTruthy()
      expect(ba.after.year).toBeTruthy()
      expect(ba.before.party).toBeTruthy()
      expect(ba.after.party).toBeTruthy()
    }
  })

  it('before year is earlier than after year', () => {
    for (const ba of allBeforeAfter) {
      const beforeYear = parseInt(ba.before.year.split('-')[0])
      const afterYear = parseInt(ba.after.year.split('-')[0])
      expect(afterYear).toBeGreaterThan(beforeYear)
    }
  })
})
