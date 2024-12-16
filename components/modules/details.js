import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Icon from '@components/icon'

const Details = ({ data = {} }) => {
  const { columns } = data

  return (
    <div className={`w-full my-96 px-16 md:px-32`}>
      <div className="grid grid-cols-12 gap-x-32 gap-y-64 rtl">
        {columns?.map((column, key) => {
          return (
            <div key={key} className="col-span-12 md:col-span-4 ltr">
              <div className="border-t w-full">
                <div className="w-[fit-content] title-highlight">
                  {column.title}
                </div>
              </div>
              <div className="flex flex-col mt-32">
                {column.items?.map((item, key) => {
                  const ItemTag = item.link ? 'a' : 'div'
                  return (
                    <ItemTag
                      rel={item.link ? 'noopener noreferrer' : null}
                      target={item.link ? '_blank' : null}
                      href={item.link}
                      className={`link-arrow${
                        key == column.items.length - 1
                          ? ' w-[fit-content]'
                          : ' w-full'
                      }`}
                      key={key}
                    >
                      {item.title}
                      {item.link && (
                        <span className="arrow">
                          <Icon name="Arrow Out" viewBox="0 0 18 17" />
                        </span>
                      )}
                    </ItemTag>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Details
