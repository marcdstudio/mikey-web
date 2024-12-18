import React from 'react'

import Media from '@components/media'

const Categories = ({ data = {} }) => {
  const { items } = data

  return (
    <div
      className={`w-full h-full grid grid-cols-6 grid-rows-6 relative z-2 justify-end`}
    >
      <div className="col-span-6"></div>
      {items?.map((item, key) => {
        return (
          <div
            key={key}
            className="relative grid-standard col-span-6 row-span-1 flex-col justify-end grid grid-cols-6"
          >
            <div
              style={{ background: item?.color?.hex }}
              className={`absolute z-2 left-6 -top-6 w-[1.2rem] h-[1.2rem] mix-blend-multiply`}
            ></div>
            <div className="col-span-1 relative py-36 px-24">
              <div className="w-full h-full relative">
                <Media
                  className={'absolute left-0 top-0 w-full h-full object-cover mix-blend-multiply'}
                  width={1800}
                  layout={'fill'}
                  media={item?.thumbnail?.content}
                  controls={true}
                />
              </div>
            </div>
            <div className="col-span-2 py-36">
              <h2 className="title-md">{item.title}</h2>
            </div>
            <div className="col-span-2 py-36">
              <div className="max-w-[35rem]">{item.description}</div>
            </div>
            <div className="col-span-1 py-36 flex justify-end text-ash">
              <div className="">{item?.projects?.length < 10 ? `0${item?.projects?.length}` : `${item?.projects?.length}`}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Categories
