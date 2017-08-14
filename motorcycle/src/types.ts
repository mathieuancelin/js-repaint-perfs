import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { Stream } from '@motorcycle/types'

export type Sources = DomSources & {
  readonly databases$: Stream<ReadonlyArray<Database>>
}

export type Database = {
  dbname: string
  lastSample: {
    countClassName: string
    nbQueries: string
    topFiveQueries: ReadonlyArray<Query>
  }
}

export type Query = {
  elapsedClassName: string
  formatElapsed: string
  query: string
}

export type Sinks = DomSinks

declare global {
  interface ENV {
    timeout: number,
    generateData(): { toArray(): ReadonlyArray<Database> }
  }

  export const ENV: ENV

  interface Monitoring {
    renderRate: { ping(): void }
  }

  export const Monitoring: Monitoring
}
