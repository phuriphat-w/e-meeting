import { useState, useEffect, ChangeEvent } from "react";
import { Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Add, Close } from '@mui/icons-material/';
import AnnouncementCard from "../components/announcement-card";
import MeetAppbar from "../components/app-bar";
import AnnouncementForm from "../components/announcement-form";
import Announcement from "../models/Announcement";
import Repo from '../repositories'
import './bg.css';
import './an-list.css'

import { useMockAuth } from '../components/MockAuth';
import { useNavigate } from 'react-router-dom';

function AnnouncementList() {
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([])
  const [searchFilter, setSearchFilter] = useState('');
  const [createFormPopup, setCreateFormPopup] = useState(false);
  const { currentUser } = useMockAuth();
  const navigate = useNavigate();

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
    await Repo.announcements.create(ann)
    fetchAnnouncementList()
    setCreateFormPopup(false)
  }

  useEffect(() => {
    fetchAnnouncementList()

    if (currentUser?.email !== "6510110060@psu.ac.th") {
      navigate('/home');
    }
  }, [searchFilter])

  return (
    <div className="page-layout">
      <div className='app-bar'>
        <MeetAppbar></MeetAppbar>
      </div>
      <div className="info-layout">
        <div className="page-header">
          <h1>นัดหมายการประชุม</h1>
        </div>
        <div className="card-layout">
      <TextField sx={{ m: 2, minWidth: 120 }} label="ค้นหา" placeholder="หัวข้อการประชุม" variant="outlined" value={searchFilter} onChange={handleChangeSearchFilter} />
      <Button sx={{ m: 2, float: 'right',borderRadius:5,fontFamily:'Kanit',fontWeight:400 }} variant="contained" onClick={() => setCreateFormPopup(true)}>
        <Add /> ประกาศการประชุม
      </Button>
      <h4 style={{fontFamily:'Kanit',fontWeight:600,marginBottom:10}}>การประชุมที่ยังไม่ถึง</h4>
      <hr></hr>
      {announcementList.filter((ann) => !ann.isMeetingEnd).length > 0 ?
      <div className="ann-con">
        <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10 }}>
        {announcementList.filter((ann) => !ann.isMeetingEnd).map((ann, index) => (
          <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
            <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList} onUpdateAnnouncement={onUpdateAnnouncement}></AnnouncementCard>
          </Grid>
      ))}
      </Grid>
      </div>

        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }} marginRight={20}>
          <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Kanit'}}>ไม่พบรายการการประชุม</Typography>
        </Box>
        }

      <h4 style={{fontFamily:'Kanit',fontWeight:600,marginBottom:10}}>การประชุมที่จบไปเเล้ว</h4>
      <hr></hr>
      {announcementList.filter((ann) => ann.isMeetingEnd).length > 0 ?
      <div className="ann-con">
        <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10 }}>
        {announcementList.filter((ann) => ann.isMeetingEnd).map((ann, index) => (
          <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
            <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList} onUpdateAnnouncement={onUpdateAnnouncement}></AnnouncementCard>
          </Grid>
      ))}
      </Grid>
      </div>

        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }} marginRight={20}>
          <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Kanit'}}>ไม่พบรายการการประชุม</Typography>
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