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

function AnnouncementList() {
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
        {announcementList.filter((ann) => !ann.isMeetingEnd).map((ann, index) => (
          <div className="ann" key={index}>
            <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList} onUpdateAnnouncement={onUpdateAnnouncement}></AnnouncementCard>
          </div>
      ))}
      </div>
        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }} marginRight={20}>
          <Typography variant="body2" color="text.secondary">ไม่พบรายการการประชุม</Typography>
        </Box>
        }

      <h4 style={{fontFamily:'Kanit',fontWeight:600,marginBottom:10}}>การประชุมที่จบไปเเล้ว</h4>
      <hr></hr>
      {announcementList.filter((ann) => ann.isMeetingEnd).length > 0 ?
        <div className="ann-con">
          {announcementList.filter((ann) => ann.isMeetingEnd).map((ann, index) => (
            <div className="ann" key={index}>
              <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList} onUpdateAnnouncement={onUpdateAnnouncement}></AnnouncementCard>
              </div>
        ))}
        </div>
        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }} marginRight={20}>
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