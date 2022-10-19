//*===========================*//
//*==<([ MODAL CONTAINER ])>==*//
//*===========================*//


//  This is a pop-up modal with an outer shell to darken the background and serve as a clickable element to
//  close the modal (instead of using a click event on the document behind it). This is so that 'useState' and
//  'useEffect' aren't needed at all while being able to destroy itself when closed instead of using 'display:
//  none' or other methods which just hide the component.

//  If the shell element should be removed and it is necessary to close the modal if it is clicked on outside
//  of this component, 'useEffect' should be used:
//
//  useEffect(() => {
//    if(activate === true) {
//      document.getElementById('layout').addEventListener('click', () => {
//        close();
//      });
//    }
//  })

//  All elements overlay the content behind it so it does not need to be put at the end of the document, though
//  it is still recommended.

//  There are several customization options available, though many more need to be tested and implemented. There
//  will be styles through an object to move certain options to here with JS instead of CSS in the 'settings'
//  object.


const Popup = ({ header, children, activate, setActivate, id, closeButton, popupClasses, headerClasses, scroll, border }) => {

  // Set 'wrapper' & 'outer' wrapper parameters
  id = id ? id+'_' : '';
  let active = activate ? ' active' : '';
  
  
  // Add custom modal 'container' classes
  popupClasses = popupClasses ? ' '+popupClasses : '';
  // Make content scrollable by default
  scroll = scroll !== false ? ' scroll' : '';
  // Border options
  border = border === false || border === 'none' ? ' no-border' : border === 'thin' ? ' thin-border' : '';
  
  // Custom inner-wrapper ('container') classes
  const containerClasses = popupClasses+border;
  
  // Close function so that multiple events can happen on closing the modal.
  const close = () => {
    setActivate(!activate);
  }
  
  // Close button element to be used if no close button is added to the component.
  // Setting 'closeButton' to false will completely remove this feature and the
  // modal will only close if the user selects an area outside the modal component.
  const CloseButton = () => {
    return (
      <div className="popup-close_container disable-highlight">
        <div role="button" onClick={ () => close() } className="popup-close" id="popup-close" aria-label="Close">&times;</div>
      </div>
    )
  }
  
  // This class is used when a title is added to push the children down 70px to
  // compensate for the space added when the title is used.
  const headerPush = header ? ' popup-header_push' : '';
  
  // Add additional Title classes
  headerClasses = headerClasses ? ' '+headerClasses : '';
  
  // Modal settings
  const settings = {
    id: id ? id+'_' : '',
    outerClasses: "popup-outer darken-content"+active,
    outerStyle: {},
    wrapStyle: {},
    containerClasses: "popup-container"+containerClasses,
    innerStyle: {},
    headerClasses: "popup-header"+headerClasses+border,
    contentClasses: "popup-content"+headerPush+scroll,
  }
  
  return (
    <>{activate ? <>
      <div className="popup-wrapper" data-popup-open={activate ? true : false} id={id+"popup"}>
        { closeButton ? closeButton : closeButton === false ? <></> : <CloseButton /> }
        <div className={settings.containerClasses} id="popup-container">
          <div className={settings.contentClasses}>
            { header ?
              <header className={settings.headerClasses}>
                { header }
              </header> : <></> }
            { children ?
              <div className={'popup-children'}>
                { children }
              </div> : <></> }
          </div>
        </div>
      </div>
    </>:<></>}
    </>)
  }
  
  export default Popup;
  
  
  /*=============================================================================================================*/
  
  ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\////
  /// HOW TO USE THE 'MODAL' COMPONENT ///
  ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\////
  
  
  
  //==========================//
  //=<([ TITLE + CHILDREN ])>=//
  //==========================//
  
  //   The title and children are both optional (of course children is recommended) and may be
  //   strings/numbers or elements. Ideally an element for 'children' and string for the 'title'.
  
  //   The height of the title is 70px and when there is a title the children element is pushed
  //   down by 70px to keep the content in children centered vertically.
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  
  
  //======================//
  //=<([ CLOSE BUTTON ])>=//
  //======================//
  
  //   The close button performs the same operation to close the modal as clicking the background.
  //   It is able to be imported so that custom actions and styles can be applied. 
  
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  
  
  //=================================//
  //=<([ ACTIVATE + SET ACTIVATE ])>=//
  //=================================//
  
  //   Activate and Set Activate are taken from a getter and setter wherever the component is being
  //   used. This should be set to 'false' if the modal needs to be closed when the page loads or set
  //   to 'true' if the modal needs to be activate when the page loads.
  
  
  //=============================================================================================================//