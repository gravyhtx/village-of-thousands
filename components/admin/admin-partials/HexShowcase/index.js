import { selectUnstyledClasses } from '@mui/base';
import React from 'react';

import styles from '../styles/Events.module.css';

const HexShowcase = (props) => {
  return (
    <div className={styles.hexShowcase}>
      <div className={styles.hexContainer + " customers col m12 l3"}>
        <div className={styles.hexAside + " card aside"}>
          <div className="card-header">
            <h3 className={styles.hexHeader}>Generated Hex</h3>
          </div>
          <div className={styles.showHex}>
          { props.orderHex !== "" ? 
            <div className="card-body">
              <h3 className={styles.hex + ' monospace'}>
                <span>{props.orderHex}</span>
              </h3>
            </div>
            : <></>  }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HexShowcase
