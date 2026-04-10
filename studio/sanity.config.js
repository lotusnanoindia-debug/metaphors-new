import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemas'

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
            // Singleton: Homepage — opens the single document directly
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),

            S.divider(),

            // Custom orderable list for Projects
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects (Ordered)',
              S,
              context,
            }),

            // Custom orderable list for Disciplines
            orderableDocumentListDeskItem({
              type: 'discipline',
              title: 'Disciplines (Ordered)',
              icon: () => '✨',
              S,
              context,
            }),
            
            orderableDocumentListDeskItem({
              type: 'sector',
              title: 'Sectors (Ordered)',
              S,
              context,
            }),

            S.divider(),

            // All other document types (excludes project, discipline, sector, homepage, media.tag, settings)
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['project', 'discipline', 'sector', 'homepage', 'media.tag', 'settings'].includes(
                  listItem.getId(),
                ),
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
