import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Me')
        .id('aboutMe')
        .child(
          S.document()
            .schemaType('aboutMe')
            .documentId('aboutMe')
        ),
      S.listItem()
        .title('Currently')
        .id('currently')
        .child(S.document().schemaType('currently').documentId('currently')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['aboutMe', 'currently'].includes(listItem.getId() as string)
      ),
    ])
