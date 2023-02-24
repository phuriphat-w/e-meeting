import { useState, useEffect, ChangeEvent } from "react";
import { Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Add, Close } from '@mui/icons-material/';
import { useAuth } from "react-oidc-context";
import AnnouncementCard from "../components/announcement-card";
import MeetAppbar from "../components/app-bar";
import AnnouncementForm from "../components/announcement-form";
import Announcement from "../models/Announcement";
import Repo from '../repositories'
import './bg.css';
import './an-list.css'

function AnnouncementList() {
  const auth = useAuth();
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([])
  const [searchFilter, setSearchFilter] = useState('');
  const [createFormPopup, setCreateFormPopup] = useState(false);

  const onUpdateAnnouncement = (announcement: Announcement) => {
    setAnnouncementList(prevAnnouncementList => prevAnnouncementList.map(item => item.id === announcement.id ? announcement : item))}

  const fetchAnnouncementList = async () => {
    let params = {
      keyword: searchFilter
    }
    const result = await Repo.announcements.getAll(params)
    if (result) {
      if (announcementList.length) {
        setAnnouncementList([])
      }
      setAnnouncementList(result)
    }
  }

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  }

  const onCreateAnnouncement = async (ann: Partial<Announcement>) => {
    ann.userCode = auth.user?.profile.preferred_username
    await Repo.announcements.create(ann)
    fetchAnnouncementList()
    setCreateFormPopup(false)
  }

  useEffect(() => {
    fetchAnnouncementList()
  }, [searchFilter])

  return (
    <div className="page-layout">
      <div className='app-bar'>
        <MeetAppbar></MeetAppbar>
      </div>
      <div className="info-layout">
        <div className="page-header">
          <h1>รายการการประชุม</h1>
        </div>
        <div className="card-layout">
      <TextField sx={{ m: 2, minWidth: 120 }} label="ค้นหา" placeholder="หัวข้อการประชุม" variant="outlined" value={searchFilter} onChange={handleChangeSearchFilter} />
      <Button sx={{ m: 2, float: 'right' }} variant="contained" onClick={() => setCreateFormPopup(true)}>
        <Add /> ประกาศการประชุม
      </Button>
      {announcementList.length
        ?
        <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10 }}>
          {announcementList.map((ann, index) =>
            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
              <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList} onUpdateAnnouncement={onUpdateAnnouncement}></AnnouncementCard>
            </Grid>
          )}
        </Grid>
        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <Typography variant="body2" color="text.secondary">ไม่พบรายการการประชุม</Typography>
        </Box>
      }
      </div>

      <Dialog PaperProps={{ sx: { minWidth: "50%" } }} open={createFormPopup} onClose={() => setCreateFormPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          ประกาศการประชุม
          <IconButton onClick={() => setCreateFormPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <AnnouncementForm announcement={{}} callbackFn={onCreateAnnouncement}></AnnouncementForm>
      </Dialog>
    </div>
    </div>
  );
}

export default AnnouncementList;