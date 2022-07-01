import { FC } from "react";
import { Slide } from 'react-slideshow-image'
import styles from 'styles/ProductSlide.module.css'
import 'react-slideshow-image/dist/styles.css'

interface IProp {
  images: string[];
}

export const ProductSlide: FC<IProp> = ({ images }) => {
  return (
    <Slide
      easing="ease"
      duration={7000}
      indicators
    >
      {
        images.map((image) => {
          const imageUrl = `/products/${image}`;
          return (
            <div className={styles['each-slide-effect']} key={image}>
              <div style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                borderRadius: '5px',
              }}>
              </div>
            </div>
          )
        })
      }
    </Slide>
  )
}
export default ProductSlide