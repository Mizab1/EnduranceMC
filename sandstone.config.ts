import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'Endurance MC',
  description: [ 'A Datapack Created By', { text: 'Mizab', color: 'gold' } ],
  formatVersion: 9,
  namespace: 'endurance',
  packUid: '4hifRiYO',
  saveOptions: { world: 'Endurance' },
  onConflict: {
    default: 'warn',
  },
} as SandstoneConfig
