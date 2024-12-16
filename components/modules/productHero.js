import React, { useEffect } from 'react'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import BlockContent from '@components/block-content'
import Icon from '@components/icon'
import {
  ProductGallery,
  ProductForm,
  ProductActions,
  ProductPrice,
} from '@components/product'

const ProductHero = ({ product, activeVariant, onVariantChange, modules }) => {
  const handleScroll = (section) => {
    gsap.to(window, { duration: 1, ease: 'expo.out', scrollTo: { y: section } })
  }

  return (
    <section className="product md:h-screen md:min-h-[60rem] mb-128">
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[130vw] md:h-full">
          <ProductGallery
            slides={product.gallery}
            activeVariant={activeVariant}
            hasArrows
            hasCounter
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center px-16 md:px-0 pt-32 md:pt-0">
          <div className="w-full md:w-2/3 md:mx-auto flex flex-col items-end justify-center relative md:h-screen">
            <div className="mb-35 w-full md:w-3/4">
              <div className="mb-25 md:mb-35 flex flex-col items-start">
                <h1 className="title-highlight">{product.title}</h1>

                <div className="bg-highlight text-ghost text-28 w-[fit-content] mt-16 px-6">
                  <ProductPrice
                    price={activeVariant?.price || product.price}
                    comparePrice={
                      activeVariant?.comparePrice || product.comparePrice
                    }
                  />
                </div>

                {product.description && (
                  <div className="mt-64 md:mt-128 uppercase text-ghost">
                    <BlockContent blocks={product.description} />
                  </div>
                )}
              </div>

              <ProductForm
                product={product}
                activeVariant={activeVariant}
                onVariantChange={onVariantChange}
                className="product--form"
              />
            </div>

            <ProductActions
              product={product}
              activeVariant={activeVariant}
              klaviyoAccountID={product.klaviyoAccountID}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductHero
