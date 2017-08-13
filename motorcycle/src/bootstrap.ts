import { Database, Sinks, Sources } from './types'
import { ProxyStream, createProxy, map, scheduler } from '@motorcycle/stream'

import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'
import { view } from './view'

const element = document.querySelector('#app-container')

if (!element) throw new Error('Unable to find element')

const Dom = makeDomComponent(element)

function Effects(sinks: Sinks): Sources {
  const { stream: databases$ } = createProxy<ReadonlyArray<Database>>()

  load(databases$)

  return { ...Dom(sinks), databases$ }
}

const { renderRate } = Monitoring
const { timeout } = ENV

function load(stream: ProxyStream<ReadonlyArray<Database>>) {
  stream.event(scheduler.now(), ENV.generateData().toArray())
  renderRate.ping()

  setTimeout(load, timeout, stream)
}

function Main(sources: Sources): Sinks {
  const { databases$ } = sources

  const view$ = map(view, databases$)

  return { view$ }
}

run<Sources, Sinks>(Main, Effects)
