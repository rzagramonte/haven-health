import { describe, expect, it } from 'vitest'

import { AppConfig } from './index'

describe('AppConfig', () => {
  it('should have isDev set to false in test environment', () => {
    expect(AppConfig.isDev).toBe(false)
  })

  it('should have isProd set to false in test environment', () => {
    expect(AppConfig.isProd).toBe(false)
  })
})
