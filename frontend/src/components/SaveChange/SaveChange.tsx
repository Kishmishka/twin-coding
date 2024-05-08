import { IconButton, Snackbar } from '@mui/material';
import cloud from '../../img/cloud.svg';
import { useState } from 'react';

import { useLog } from '../../store';
import Service from '../../API/Service';

const SaveChange = () => {
   const [open, setOpen] = useState<boolean>(false);
   const room = useLog((state) => state.room);

   const handleClick = () => {
      setOpen(true);
      Service.loadRoomParams(room);
   };

   return (
      <div>
         <IconButton onClick={handleClick} aria-label="delete" sx={{ color: 'white' }}>
            <img width={'30px'} src={cloud} />
         </IconButton>
         <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            onClose={() => {
               setOpen(false);
            }}
            message="Data uploaded"
            key={'bottom' + 'right'}
         />
      </div>
   );
};
export default SaveChange;
