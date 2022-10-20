import { Icon } from '@mui/material';
import { NxtLink } from "../../modules/nextElements";
import { unFileName } from "../../utils/validation";

export const MiCon = ({ name, classes, url, linkClasses, alt }) => {
  url = url ? url : false;
  alt = !alt && name ? unFileName(name) : alt ? alt : 'Site Icon';
  const icon = <span alt={!url ? alt : null} className={"material-icons "+(classes?'icon-'+classes:'icon-classes')}>{name ? name : 'person'}</span>
  const iconLink = <NxtLink url={url} linkClasses={linkClasses} linkAlt={alt}>{ icon }</NxtLink>
  return url ? iconLink : icon;
}