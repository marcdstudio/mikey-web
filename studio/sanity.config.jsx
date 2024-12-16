// sanity.config.js
import { defineConfig, definePlugin } from 'sanity'
import { deskTool } from 'sanity/desk'
// import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'
import { dashboardTool } from '@sanity/dashboard'
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'

import { Eye } from 'phosphor-react'

import { theme } from 'https://themer.sanity.build/api/hues?default=bfbfbf;darkest:111&primary=000000&transparent=bfbfbf&positive=bfbfbf;300&caution=bfbfbf;200&critical=bfbfbf&lightest=ffffff&darkest=000000'

// This custom component will be declared at the root configuration level
function CustomLogo(props) {
  return (
    <div style={{ border: '3px solid skyblue', padding: 4 }}>
      {props.renderDefault({ ...props, title: props.title.toUpperCase() })}
    </div>
  )
}

// Then we add another custom logo component as part of a plugin
const myLogoPlugin = definePlugin({
  name: 'my-logo-plugin',
  studio: {
    components: {
      logo: props => (
        <div style={{ border: '3px solid hotpink' }}>
          {props.renderDefault({ ...props, title: 'my improved title' })}
        </div>
      )
    }
  }
})

export default defineConfig({
  title: 'Mikey',
  projectId: 'u4hzo29a',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Sites',
          sites: [
            // {
            //   title: 'Production',
            //   apiId: '218f1434-4155-4da9-9c4a-7b04a4508e89',
            //   buildHookId: '631e8a9a9907ec1a1781ba87',
            //   name: 'marcd-studio'
            // }
          ]
        })
      ]
    }),
    myLogoPlugin()
  ],
  schema: {
    types: schemas
  },
  theme: theme,
  studio: {
    theme: theme,
    logo: CustomLogo
  },
  document: {
    actions: (prev, context) => {
      const options = {
        dataset: 'production',
        projectId: 'u4hzo29a',
        useCdn: process.env.NODE_ENV === 'production',
        apiVersion: '2021-03-25'
      }

      const PreviewAction = props => {
        return {
          label: 'Open Preview',
          icon: Eye,
          onHandle: async () => {
            const localURL = 'http://localhost:3000'
            const remoteURL = await context
              .getClient(options)
              .fetch(`*[_type == "generalSettings"][0].siteURL`)

            const docSlug = await context
              .getClient(options)
              .fetch(
                `*[_type == '${context.schemaType}' && _id == '${context.documentId}'][0].slug.current`
              )

            const typeSlug =
              context.schemaType == 'capability' ? 'capabilities/' : ''

            const frontendURL =
              window.location.hostname === 'localhost' ? localURL : remoteURL

            window.open(
              `${frontendURL}/api/preview?token=PREV&type=${
                context.schemaType
              }&slug=${typeSlug}${docSlug == '/' ? '' : docSlug || ''}`
            )
          }
        }
      }

      return [...prev, PreviewAction]
    }
  },
  form: {
    components: {
      // input: props => {
      //   const { renderDefault } = props
      //   if (isArrayOfPrimitivesInputProps(props)) {
      //     return renderDefault({ ...props, arrayFunctions: MyArrayFunctions })
      //   }
      //   return renderDefault(props)
      // },
      // item: props => {
      //   const { renderDefault } = props
      //   if (props.value?._type == 'media') {
      //     return MediaItem(props)
      //   }
      //   return renderDefault(props)
      // }
    }
  }
})
