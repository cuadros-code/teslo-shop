import { FC } from "react"
import { initialData } from '../../database/products';

interface IProps {}

const productInCard = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export const CartList: FC<IProps> = () => {
  return (
    <>
      {
        productInCard.map((product, index) => {

          return (
            <></>
          )
        })
      }
    </>
  )
}
export default CartList