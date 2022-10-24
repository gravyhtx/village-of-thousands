import { Accordion, AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { getAllCategories } from "../../../../utils/API";

const EventFormInput = () => {
  const [productList, setProductList] = useState([]);
  const [productsToBuy, setProductsToBuy] = useState([]);

  // Object mapping, start with an object with no params. The only solution is a hash map
  // 

  const sizes = ["X-small", "Small", "Medium", "Large", "X-Large", "XX-Large"]
  const [selectedSize, setSelectedSize] = useState("");

  const [expanded, setExpanded] = useState(undefined);
  const accordElem = useRef(null)

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await getAllCategories();
        const products = await response.json();

        console.log(products)

        setProductList(products)
      } catch (err) {
        console.error(err)
      }
    }
    getProductData();
  }, []);

  const handleAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="projects col m12 l9">
      <div className="card">
        <div className="card-header">
          <h3>Incoming Order</h3>
        </div>
      </div>

      <div className="card-body">
        <div className="order-accordian_map">
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
                      <div className="order-summary" key={category._id}>
                        <div className="col s9">{category.category_name}</div>
                        <div className="col s3">
                          <FormControl>
                            <InputLabel id="product-selection">Size</InputLabel>
                            <Select
                              labelId="product-selection"
                              label="Size"
                              value={selectedSize}
                              sx={{ minWidth: 80 }}
                            >
                              {sizes.map((size) => {
                                return (
                                  <MenuItem
                                    value={size}
                                    label="Size"
                                    // disabled={singleProduct.product_inventory > 0 ? false : true}
                                  >
                                    {size}
                                  </MenuItem>
                                )
                              })
                              }
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="order-collapsible_details">
                      {category.products.map((product, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col s3">
                              {product.product_name}
                            </div>
                            <div className="col s3">
                              {product.product_colors}
                            </div>
                            <div className="col s2">
                              {product.price}
                            </div>
                            <div className="col s2">

                            </div>
                            <div className="col">
                              <button style={{ color: "black" }}>
                                Add To List
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
