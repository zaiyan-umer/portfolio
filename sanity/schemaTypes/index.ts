import { type SchemaTypeDefinition } from 'sanity'

import project from './project'
import message from './message'
import aboutMe from './about'
import experience from './experience'
import certification from './certification'
import courseCategory from './courseCategory'
import techStack from './techStack'
import currently from './currently'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, message, aboutMe, experience, certification, courseCategory, techStack, currently],
}
