export default {
  title: 'General Capability',
  name: 'capabilityGeneral',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'complexPortableText'
    }
  ],
  preview: {
    select: {
      title: 'title',
      src: 'info.thumbVideo',
      image: 'info.thumbPlaceholder.image'
    },
    prepare({ src, image, title, ...selection }) {
      return {
        media: image,
        title: title,
        ...selection
      }
    }
  }
}
