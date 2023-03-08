import { useState, useEffect } from "react";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material/';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

import NotificationPopup from "./notificationPopup"
import Repo from '../../repositories';
import Announcement from "../../models/Announcement";

function Notifications(): JSX.Element {
    const [popup, setPopup] = useState(false);
    const [count, setCount] = useState(0);
    const [annList, setAnnList] = useState<Announcement[]>([]);

    const fetchAnnList = async () => {
        let params: { keyword?: string} = {}
    
        const result = await Repo.announcements.getAll(params)
        if (result) {
            if (annList.length) {
                setAnnList([])
            }
            setAnnList(result)
        } 
    }

    useEffect(() => {
        fetchAnnList()
        const unReadCount = annList.filter(ann => !ann.isMeetingEnd).length;
        setCount(unReadCount)
    }, [annList])

    return (
        <div>
            <div onClick={() => setPopup(true)}>
                <Badge badgeContent={count} color="error">
                    <NotificationsIcon sx={{color:'#707070',ml:1.5,cursor:'pointer'}}/> 
                </Badge>
                <span style={{cursor:'pointer'}} className="menu-text">แจ้งเตือนการประชุม</span>
            </div>

            <Dialog PaperProps={{ sx: { minWidth: "50%" } }} open={popup} onClose={() => setPopup(false)}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    แจ้งเตือนการประชุม
                    <IconButton onClick={() => setPopup(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <NotificationPopup/>
            </Dialog>
        </div>
    )
}

export default Notifications;