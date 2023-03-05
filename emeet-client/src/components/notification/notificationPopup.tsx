import { Button, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Announcement from "../../models/Announcement";
import Repo from '../../repositories';
import NotificationCard from "./NotificationCard";

function NotificationPopup(): JSX.Element {
  const [annList, setAnnList] = useState<Announcement[]>([]);

  const onUpdateAnnouncement = (announcement: Announcement) => {
    setAnnList(prevAnnList => prevAnnList.map(item => item.id === announcement.id ? announcement : item))}

  const unReadCount = annList.filter(ann => !ann.recognizeTime).length;

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

  const handleRecognize = async () => {
    for(const data of annList){
      const result = await Repo.announcements.read(data.id)
      if (result) {
        onUpdateAnnouncement(result)
      }}
  }


  useEffect(() => {
      fetchAnnList();
  }, []);

  return (
    <Box sx={{ width: 500, height: 1000}}>
      <div>
        {unReadCount
          ?
          <Grid
            container spacing={2}
          >
            {annList.map((announcement, index) => 
                <Grid item md={17} key={index}>
                    <NotificationCard announcement={announcement} onUpdateAnnouncement={onUpdateAnnouncement}></NotificationCard>
                </Grid>
            )}
          </Grid>
          :
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', minHeight: 500, width: 450}}>
            <Typography variant='body2' color='text.secondary'>ไม่พบรายการการประชุม</Typography>
          </Box>
        }
      </div>
      <div style={{ margin: 20 }}>
        <Button disabled={unReadCount === 0} variant="contained" sx={{ mb: 1, verticalAlign: 'bottom', width: 690, height: 50}} onClick={handleRecognize}>อ่านทั้งหมด</Button>
      </div>
    </Box>
  );
}

export default NotificationPopup;