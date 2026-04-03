import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'Metaphors Design',

  projectId: 'h05maah4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Custom orderable list for Projects
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects (Ordered)',
              S,
              context,
            }),
            S.divider(),
            // Automatically list all other document types accurately
            ...S.documentTypeListItems().filter(
              (listItem) => !['project', 'media.tag'].includes(listItem.getId()),
            ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
