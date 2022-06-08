import { ImageCDN } from '../utils/siteFunctions';
import { randomize } from '../utils/generator';
import products from '../config/products.json';
import website from '../config/site-data.json';

export const ProductImage = ({ category, colorId, random }) => {

  const p = products.currentDrop;
  const cn = p.crewnecks;
  const hd = p.hoodies;
  const ls = p.longsleeves;
  const ts = p.shirts;

  const szn = website.szn;

  category = category === "cn" ? cn : category === "hd" ? hd : category === "ls" ? ls : ts;
  colorId = colorId ? colorId : 1;
  random  = random ? random : false;

  const categoryLength = category.filename.length;
  const randomId = randomize(categoryLength)
  
  const fileName = category.filename[random ? randomId : colorId];
  const fileId = category.fileId[random ? randomId : colorId];

  const color = category.colors[random ? randomId : colorId]
  const description = category.name+" // "+color+" // "+szn;

  const prodEl =
      <ImageCDN
        fileName={fileName}
        fileId={fileId}
        description={description}
        id={"product-image_"+fileName}
        imgClasses={"product-image"} />

  return prodEl;
}

export default ProductImage;