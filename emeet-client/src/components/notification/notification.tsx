import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import NotificationPopup from "./notificationPopup"

function Notifications() {
    const [popup, setPopup] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <Box>
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setPopup(true)}
            >
            <Badge badgeContent={count} color="error">
                <NotificationsIcon />
                
            </Badge><span className="menu-text">แจ้งเตือนการประชุม</span>
              
        </IconButton>
        <Dialog PaperProps={{ sx: { minWidth: "50%" } }} open={popup} onClose={() => setPopup(false)}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                แจ้งเตือนการประชุม
                <IconButton onClick={() => setPopup(false)}>
                    <Close />
                </IconButton>
            </DialogTitle>
            < NotificationPopup></ NotificationPopup>
      </Dialog>
    
    </Box>
    )
}

export default Notifications;