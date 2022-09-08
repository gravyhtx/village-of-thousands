import { useWindowSize } from '../modules/getWindow';

const CartItem = ({ cart, item, removeItem, imgSize }) => {
  
  const cartTotal = cart.length;
  
  const screenWidth = useWindowSize(window).width;
  const breakpoint = 600;
  const productImageSize = screenWidth > breakpoint ? '175px' : '200px';

  const color = item.color.toLowerCase();
  const colArr = ["#666666", "#eeeeee", "#f0eee4", "#5d9ca4", "#bcc8c6", "#b58da1"];

  const colorize = () => {
    switch(color) {
      case "white":
        return colArr[1]
        break;
      case "natural":
        return colArr[2]
        break;
      case "aqua":
        return colArr[3]
        break;
      case "seafoam":
        return colArr[4]
        break;
      case "lavender":
        return colArr[5]
        break;
      default:
        return colArr[0]
    }
  }

  imgSize = imgSize ? imgSize : productImageSize;
  return (
    <div className={"cart-item col " + (cartTotal > 10 ? "s12 m6" : "s12")} key={item.id}>
      <div style={{ boxShadow: "2px 2px 2px "+colorize() }} className="cart-item_card row">
        <div className={"cart-item_title col s12 m4 l4" + (screenWidth > breakpoint ? " text-left" : " text-center")}>
          <h2>{item.product}</h2>
          <h3><span className="label">COLOR // </span>{item.color}</h3>
          <h3><span className="label">SIZE // </span>{item.size}</h3>
        </div>
        <div className="cart-item_img col s12 m5 l4">
          <img src={item.image} height={imgSize} width={imgSize}></img>
        </div>
        <div className={"cart-item_details col s12 m3 l4" + (screenWidth > breakpoint ? " text-right" : " text-center")}>
          <h3>${item.price}</h3>
          { removeItem }
        </div>
      </div>
    </div>
  )
}

export default CartItem;