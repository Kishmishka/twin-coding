import { IconButton, Snackbar } from '@mui/material';
import saveChange from '../../img/save.svg';
import noSaveChange from '../../img/notSave.svg';
import { useState } from 'react';
import { useLog, useRedactor } from '../../store';
import Service from '../../API/Service';

const SaveChange = () => {
   const [open, setOpen] = useState<boolean>(false);
   const room = useLog((state) => state.room);
   const ChangeIsSaved = useRedactor((state) => state.ChangeIsSaved);

   const handleClick = () => {
      setOpen(true);
      Service.saveChange(room);
   };

   return (
      <div>
         <IconButton onClick={handleClick} aria-label="delete" sx={{ color: 'white' }}>
            <img
               width={'35px'}
               style={{ fill: '#50C878' }}
               src={ChangeIsSaved ? saveChange : noSaveChange}
            />
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
