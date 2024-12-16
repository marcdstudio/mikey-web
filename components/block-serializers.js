import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import cx from 'classnames'

import Photo from '@components/photo'
import CustomLink from '@components/link'

export const blockSerializers = {
  types: {
    block: (props) => {
      const { markDefs, style = 'normal' } = props.node

      // check if our block contains a button
      const hasButton =
        markDefs &&
        markDefs.some((c) => c._type === 'link' && c.isButton === true)

      // go through our remaing, true header styles
      if (/^h\d/.test(style)) {
        return React.createElement(
          style,
          { className: hasButton ? 'has-btn' : null },
          props.children
        )
      }

      // handle all other blocks with the default serializer
      return BlockContent.defaultSerializers.types.block(props)
    },
    photo: ({ node }) => {
      return <Photo photo={node} />
    },
  },
  marks: {
    link: ({ mark, children }) => {
      return <CustomLink link={{ ...mark, ...{ title: children[0] } }} />
    },
    highlight: ({ mark, children }) => {
      return <span className='bg-acid'>{children[0]}</span>
    },
  },
}
