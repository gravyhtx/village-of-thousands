import { useState, useRef } from "react";
import { Accordion, AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import styles from '../styles/Events.module.css';

const EventFormInput = ({productList, selectedSize, handleSizeSelect, handleProductAddition}) => {
  const [expanded, setExpanded] = useState(undefined);
  const accordElem = useRef(null)

  const handleAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="projects col m12 l9">
      <div className="card">
        <div className="card-header center">
          <h3 className={styles.orderProductHeader}>PRODUCTS</h3>
        </div>
      </div>

      <div className="card-body">
        <div className={styles.orderAccordianMap + " order-accordian_map"}>
          {productList ?
            productList.map((category, index) => {
              return (
                <div className="order-accordian row" key={index}>
                  <Accordion
                    className={expanded === index ? "order-collapsible collapsible active" : "collapsible"}
                    expanded={expanded === index}
                    onChange={handleAccordion(index)}
                    ref={accordElem}
                    key={index}
                    disableGutters
                  >
                    <AccordionSummary
                      className="order-collapsible row"
                      aria-label={category.category_name}
                      style={{ marginBottom: '0' }}
                    >
                      <div className={styles.orderSummary + " order-summary"} key={category._id}>
                        <div
                          style={expanded === index ? { color: 'black'} : { color: 'white'}}
                          className="col s12">{category.category_name}</div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="order-collapsible_details">
                      {category.products.map((product, index) => {
                        return (
                          <div className={styles.productMapRow + " row"} key={index}>
                            <div className="col s4">
                              {product.product_name}
                            </div>
                            <div className="col s2">
                              {product.product_colors}
                            </div>
                            <div className="col s2">
                              ${product.price}
                            </div>
                            <div className="col s2">
                              <FormControl>
                              <InputLabel id="product-selection">Size</InputLabel>
                              <Select
                                labelId="product-selection"
                                defaultValue=""
                                name={product._id}
                                value={selectedSize[product._id] ? selectedSize[product._id] : ""}
                                label="Size"
                                onChange={handleSizeSelect}
                                sx={{ minWidth: 80 }}
                              >
                                {product.product_information.map((singleProduct, index) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      value={singleProduct.product_size}
                                      disabled={singleProduct.product_inventory > 0 ? false : true}
                                    >
                                      {singleProduct.product_size}
                                    </MenuItem>
                                  )
                                })
                                }
                              </Select>
                            </FormControl>
                            </div>
                            <div className="col">
                              <button onClick={() => {handleProductAddition(product._id)}}>
                              <i class="material-icons">add</i>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                </div>
              )
            })
            : (
              <div>
                Loading
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default EventFormInput
