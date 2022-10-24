import { NxtLink } from "../../modules/nextElements";
import { checkType, checkTypeof, fileName, unFileName } from "../../utils/validation";

export const MiCon = ({ name, icon, classes, url, useButton, navColsTotal, onClick, linkClasses, alt, index }) => {

  url = url ? url : false;
  linkClasses = linkClasses ? linkClasses : null;
  useButton = useButton === true ? true : false;
  navColsTotal = navColsTotal ? navColsTotal : false;
  alt = !alt && name ? unFileName(name) : alt ? alt : 'Site Icon';

  if(navColsTotal && !checkType(navColsTotal, 'number')) {
    console.warn(
      "Must set 'navColsTotal' to a number! This feature has been disabled. "+
      "('navColsTotal' is a "+checkTypeof(navColsTotal,'number').type)+")"
  }

  navColsTotal = checkType(navColsTotal, 'number') ? (Number(navColsTotal) / 12) : false;

  index=index?index:null;

  const micon = navColsTotal ?
    <div className={"col s" + navColsTotal + "micon-col"} key={index}>
      <span
        onClick={onClick && useButton === false ? onClick : null}
        alt={!url ? alt : null}
        className={"material-icons "+(classes?'micon '+classes:'micon')}>
        { icon ? icon : 'person' }
      </span>
    </div> :
    <span
      onClick={onClick && useButton === false ? onClick : null}
      alt={!url ? alt : null}
      className={"material-icons "+(classes?'micon '+classes:'micon')}
      key={index}>
      { icon ? icon : 'person' }
    </span>
  
  const iconLink = url === 'void' || url === 'js' || url === '#' || url === 'javascript:void(0)'
    ? <a href={onClick ? null : "#"} className={linkClasses} alt={alt} key={index}>{ micon }</a>
    : <NxtLink url={url} className={linkClasses} alt={alt} key={index}>{ micon }</NxtLink>
  
  const output = (childrens) => {
    return useButton === true ?
      <button alt= {item.name}
        onClick={onClick?onClick:null}
        color="inherit"
        className={"btn-floating micon-link mi-"+fileName(item.name)}
        key={index}
      >{ childrens }</button> : childrens }

  return url ? output(iconLink) : output(micon);

}