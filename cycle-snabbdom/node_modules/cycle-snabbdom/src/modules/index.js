import ClassModule from 'snabbdom/modules/class'
import PropsModule from 'snabbdom/modules/props'
import AttrsModule from 'snabbdom/modules/attributes'
import EventsModule from 'snabbdom/modules/eventlisteners'

import {StyleModule} from './style-module'
import {HeroModule} from './hero-module'

export default [StyleModule, ClassModule, PropsModule, AttrsModule]

export {
  StyleModule, ClassModule,
  PropsModule, AttrsModule,
  HeroModule, EventsModule,
}
