const Test2 = () => {
  const colStyle = {
    textAlign: "center"
  }
  const arr = [
    {img1:"img1a", img2:"img2a", img3:"img3a"},
    {img1:"img1b", img2:"img2b", img3:"img3b"},
    {img1:"img1c", img2:"img2c", }
  ]
  return (
    <div className="accolades-container">
    <br/>
      {/* {arr.map((col, index) => {
        return (
          <div className="accolades-box" key={index}>
            {col[0] ? <div style={colStyle} className="col-1 accolades-col">{col[0]}</div> : <div style={colStyle} className="col-2 accolades-col empty"></div>}
            {col[1] ? <div style={colStyle} className="col-2 accolades-col">{col[2]}</div> : <div style={colStyle} className="col-2 accolades-col empty"></div>}
            {col[2] ? <div style={colStyle} className="col-3 accolades-col">{col[1]}</div> : <div style={colStyle} className="col-2 accolades-col empty"></div>}
          </div>)
      })} */}
      {/* <div class="accolades-box">
        {arr.map((col, index) => {
          return (<div>
          {col.img1 ? <div className="col-1">{col.img1}</div> : <div className="col-1 empty"></div>}
          {col.img3 ? <div className="col-2">{col.img3}</div> : <div className="col-1 empty"></div>}
          {col.img2 ? <div className="col-3">{col.img2}</div> : <div className="col-1 empty"></div>}
          </div>)
        })}
      </div><br/> */}
      <div class="accolades-box">
        <div className="col-1">One</div>
        <div className="col-2">Three</div>
        <div className="col-3">Two</div>
        <div className="col-1">One</div>
        <div className="col-2">Three</div>
        <div className="col-3">Two</div>
        <div className="col-1">One</div>
        <div className="col-2"></div>
        <div className="col-3">Two</div>
      </div>
    </div>
  )
}

export default Test2;