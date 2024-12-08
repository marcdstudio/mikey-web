import {
  SmileyBlank,
  CheckCircle,
  NavigationArrow,
  GlobeSimple,
  House,
  Browser,
  Info,
  TrafficSign,
  FileX
} from 'phosphor-react'

export default S =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Pages')
        .icon(() => <Emoji style={{ fontSize: 24 }} text="⬛" />)
        .child(
          S.list()
            .title('All Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon(House)
                .child(
                  S.editor()
                    .title('Home')
                    .schemaType('home')
                    .documentId('home')
                ),
              ,
              S.listItem()
                .title('Info')
                .icon(Info)
                .child(
                  S.editor()
                    .title('Info')
                    .schemaType('info')
                    .documentId('info')
                ),
              ,
              S.listItem()
                .title('Work')
                .icon(Info)
                .child(
                  S.editor()
                    .title('Work')
                    .schemaType('selectedWork')
                    .documentId('selectedWork')
                ),
              ,
              S.listItem()
                .title('Directory')
                // .icon(() => <Emoji style={{ fontSize: 18 }} text="⚫" />)
                .icon(House)
                .child(
                  S.editor()
                    .title('Directory')
                    .schemaType('directory')
                    .documentId('directory')
                ),
              ,
              S.listItem()
                .title('Projects')
                // .icon(() => <Emoji style={{ fontSize: 18 }} text="⚫" />)
                .icon(TrafficSign)
                .child(S.documentTypeList('project').title('Project')),
              S.listItem()
                .title('Error')
                // .icon(() => <Emoji style={{ fontSize: 18 }} text="⚫" />)
                .icon(FileX)
                .child(
                  S.editor()
                    .title('Error')
                    .schemaType('error')
                    .documentId('error')
                ),
              ,
            ])
        )
        .icon(Browser),
      S.divider(),
      S.listItem()
        .title('Capabilities')
        .icon(CheckCircle)
        .child(S.documentTypeList('capability').title('Capability')),
      S.divider(),
      S.listItem()
        .title('Team')
        .icon(SmileyBlank)
        .child(S.documentTypeList('profile').title('Profile')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .child(
                  S.editor()
                    .id('generalSettings')
                    .schemaType('generalSettings')
                    .documentId('generalSettings')
                )
                .icon(Gear),
              S.divider(),
              S.listItem()
                .title('Header')
                .child(
                  S.editor()
                    .id('headerSettings')
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                )
                .icon(NavigationArrow),
              // S.listItem()
              //   .title('Footer')
              //   .child(
              //     S.editor()
              //       .id('footerSettings')
              //       .schemaType('footerSettings')
              //       .documentId('footerSettings')
              //   )
              //   .icon(AnchorSimple),
              S.divider(),
              // S.listItem()
              //   .title('Cookie Consent')
              //   .child(
              //     S.editor()
              //       .id('cookieSettings')
              //       .schemaType('cookieSettings')
              //       .documentId('cookieSettings')
              //   )
              //   .icon(Cookie),
              // S.divider(),
              S.listItem()
                .title('Default SEO / Share')
                .child(
                  S.editor()
                    .id('seoSettings')
                    .schemaType('seoSettings')
                    .documentId('seoSettings')
                )
                .icon(GlobeSimple)
              // S.listItem()
              //   .title('Redirects')
              //   .child(S.documentTypeList('redirect').title('Redirects'))
              //   .icon(Shuffle)
            ])
        )
        .icon(Gear)
    ])
