import { IconButton, Snackbar } from '@mui/material';
import saveChange from '../../img/save.svg';
import { useState } from 'react';
import { useLog } from '../../store';
import Service from '../../API/Service';

const SaveChange = () => {
   const [open, setOpen] = useState<boolean>(false);
   const room = useLog((state) => state.room);

   const handleClick = () => {
      setOpen(true);
      Service.saveChange(room);
   };

   return (
      <div>
         <IconButton onClick={handleClick} aria-label="delete" sx={{ color: 'white' }}>
            <img width={'30px'} src={saveChange} />
         </IconButton>
         <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            onClose={() => {
               setOpen(false);
            }}
            message="Changes saved"
            key={'bottom' + 'right'}
         />
      </div>
   );
};
export default SaveChange;
