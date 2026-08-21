import {
  collection,
  config,
  fields,
  singleton,
  type ComponentSchema,
} from '@keystatic/core';
import {
  block,
  inline,
  type ContentComponent,
} from '@keystatic/core/content-components';

const baseComponents = {
  GoogleDoc: block({
    label: 'Google Document',
    schema: {
      src: fields.url({ label: 'Source' }),
      isEditable: fields.checkbox({
        label: 'Is Editable',
        defaultValue: true,
      }),
    },
  }),
  RemoteMd: block({
    label: 'Remote Markdown',
    schema: {
      src: fields.url({ label: 'Source' }),
    },
  }),
  SizedImage: inline({
    label: 'Sized Image',
    schema: {
      src: fields.url({ label: 'Source' }),
      alt: fields.text({ label: 'Alt Text' }),
      width: fields.number({ label: 'Width' }),
    },
  }),
} satisfies Record<string, ContentComponent>;

const baseSchema = {
  tableOfContents: fields.checkbox({
    label: 'Table of Contents',
    defaultValue: true,
  }),
  content: fields.markdoc({
    label: 'Content',
    components: baseComponents,
    options: {
      image: {
        directory: 'src/assets/docs/images',
        publicPath: '@assets/docs/images',
      },
    },
  }),
} satisfies Record<string, ComponentSchema>;

const singletonSchema = {
  title: fields.text({
    label: 'Title',
  }),
  ...baseSchema,
} satisfies Record<string, ComponentSchema>;

const collectionSchema = {
  title: fields.slug({
    name: { label: 'Title' },
  }),
  ...baseSchema,
} satisfies Record<string, ComponentSchema>;

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'p3d-project',
      name: 'p3d-docs',
    },
  },
  singletons: {
    roadmap: singleton({
      label: 'Roadmap',
      path: 'src/content/docs/roadmap',
      format: { contentField: 'content' },
      schema: singletonSchema,
    }),
    credits: singleton({
      label: 'Credits',
      path: 'src/content/docs/credits',
      format: { contentField: 'content' },
      schema: singletonSchema,
    }),
  },
  collections: {
    guides: collection({
      label: 'Guides',
      slugField: 'title',
      path: 'src/content/docs/guides/**',
      format: { contentField: 'content' },
      schema: collectionSchema,
    }),
    milestones: collection({
      label: 'Milestones',
      slugField: 'title',
      path: 'src/content/docs/milestones/**',
      format: { contentField: 'content' },
      schema: collectionSchema,
    }),
    references: collection({
      label: 'References',
      slugField: 'title',
      path: 'src/content/docs/references/**',
      format: { contentField: 'content' },
      schema: collectionSchema,
    }),
  },
});
