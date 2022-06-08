import { ImageCDN } from '../utils/siteFunctions';
import { randomize } from '../utils/generator';
import products from '../config/products.json';
import website from '../config/site-data.json';
import { containerClasses } from '@mui/material';

export const ProductImage = ({ category, colorId, imgClasses, containerClasses, random }) => {

  const p = products.currentDrop;
  const cn = p.crewnecks;
  const hd = p.hoodies;
  const ls = p.longsleeves;
  const ts = p.shirts;

  const szn = website.szn;
  console.log(colorId)

  category = category === 'crewnecks' ? cn : category === 'hoodies' ? hd : category === 'longsleeves' ? ls : ts;
  // colorId = colorId ? colorId : 1;
  random  = random ? random : false;

  const categoryLength = category.filename.length;
  const randomId = randomize(categoryLength)
  
  const fileName = category.filename[random ? randomId : colorId];
  const fileId = category.fileId[random ? randomId : colorId];

  const color = category.colors[random ? randomId : colorId]
  const description = category.name+' // '+color+' // '+szn;

  containerClasses = containerClasses ? 'product-image '+containerClasses : '';
  imgClasses = imgClasses ? imgClasses : '';

  const prodEl =
      <ImageCDN
        fileName={fileName}
        fileId={fileId}
        description={description}
        id={"product-image_"+fileName}
        imgClasses={imgClasses}
        containerClasses={containerClasses} />

  return prodEl;
}

export default ProductImage;