import { Card, CardHeader, CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import Announcement from "../../models/Announcement";
import Repo from '../../repositories'

interface Prop {
    announcement: Announcement
    onUpdateAnnouncement : (announcement: Announcement) => void;
}

function NotificationCard(props: Prop) {
    const announcement = props.announcement;

    const handleRecognize = async () => {
        const result = await Repo.announcements.read(announcement.id)
        if(result) {
          props.onUpdateAnnouncement(result)
        }
    }

    return(
        
        <Box sx={{ position: 'relative' }} color={announcement.recognizeTime ? "success" : "disabled"}>
            <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                { !announcement.recognizeTime && 
                <CardActionArea onClick={handleRecognize}>
                    <CardHeader
                        sx={{ height: 100 ,width: 1000}}
                        title={announcement.topic}
                        subheader={announcement.meetDate}
                    />
                </CardActionArea>}
            </Card>
        </Box>
        
    )
}

export default NotificationCard;