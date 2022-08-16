import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingScreen = ({ isOpen }) => {
  isOpen=isOpen?isOpen:true;
  return (
    <>{
      isOpen ?
        <div className="loading-screen" id="loading-screen">
          <div className="loading-inner">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        </div>
      : <></>
    }</>
  )
}

export default LoadingScreen;