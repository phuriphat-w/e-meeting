import { useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import Announcement from "../models/Announcement";
import './meetinfo-card.css'

import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";

interface Prop {
  announcement: Announcement
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

function MeetInfoCard(props: Prop) {
  const announcement = props.announcement;
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const disable = announcement.isMeetingEnd;
  const storage = getStorage();
  const [data, setData] = useState<string[]>([]);
  const [number, setNumber] = useState(0);
  const ListAll = (n : number) => {
    setData([]);
    setNumber(0);

    const fileRef = ref(storage, 'meetDoc/annId_'+ announcement.id + '/agenId_' + n);
      listAll(fileRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            setData((arr: string[]) => [...arr, itemRef.name]);
            setNumber(n);
          })
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      setPopup2(true);
  }

  const downloadURL = (n : number, name : string) => {
    // Create a reference under which you want to list
    const listRef = ref(storage, 'meetDoc/annId_'+ announcement.id + '/agenId_' + n + '/' + name);

    getDownloadURL(listRef)
      .then((url) => {
              //console.log(url);
        window.open(url, "_blank");
      })
        
  }

  return (
    <Box>
      {!disable
      ?
      <Card sx={{ maxWidth: 500, height: 250 }}>
        <CardHeader
          sx={{ height: '30%' }}
          title={announcement.topic}
          subheader={announcement.meetDate}
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
                <Typography variant="h5" component="div">
                  {announcement.place}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {announcement.agendaRule}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="button" color="primary">รายละเอียด</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
      :
      <Card sx={{ maxWidth: 500, height: 250, backgroundColor: '#EEEEEE'}}>
        <CardHeader
          sx={{ height: '30%' }}
          title={announcement.topic}
          subheader={announcement.meetDate}
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
                <Typography variant="h5" component="div">
                  {announcement.place}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {announcement.agendaRule}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="button" color="primary">รายละเอียด</Typography>
          </CardActions>
        </CardActionArea>
      </Card>}

      <Dialog PaperProps={{ sx: { minWidth: "50%", maxHeight: "100%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mt: 1,fontFamily:'Kanit' }}>
            {announcement.topic}
          </Typography>
          
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        {announcement.recognizeTime &&
          <Typography  variant="h6" sx={{ mt: 1}}  marginLeft={3}>
            สิ้นสุดการประชุมเวลา: {new Date(announcement?.recognizeTime!.toString()).toLocaleString("en-GB")}
          </Typography>}
        <DialogContent dividers>

          <Typography variant="h6" sx={{ mt: 1,fontFamily:'Kanit',fontWeight:400 }}>
            ประชุมวันที่: {announcement.meetDate}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1,fontFamily:'Kanit',fontWeight:400 }}>
            สถานที่: {announcement.place}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1,fontFamily:'Kanit',fontWeight:400 }}>
            ระเบียบการวาระประชุม: {announcement.agendaRule}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1,fontFamily:'Kanit',fontWeight:400 }}>
            วาระการประชุม
          </Typography>
          <Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(1)}>1. เรื่องแจ้งเพื่อทราบ</Button>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400}} onClick={() => ListAll(2)}>2. รับรองรายงานการประชุม</Button></p>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(3)}>3. เรื่องสืบเนื่องจากการประชุมครั้งที่แล้ว</Button></p>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(4)}>4. เรื่องค้างเพื่อพิจารณา</Button></p>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(5)}>5. เรื่องเสนอเพื่อพิจารณาใหม่</Button></p>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(6)}>6. เรื่องอื่น</Button></p>
          <p><Button sx={{ fontFamily: "Kanit",fontWeight:400 }} onClick={() => ListAll(7)}>7. การเชิญประชุม</Button></p>
        </DialogContent>
      </Dialog>

      <Dialog PaperProps={{ sx: { minWidth: "20%", height: 280 , marginLeft:40 ,marginTop: 30 }} } open={popup2} onClose={() => setPopup2(false)}>
        <DialogContent dividers>
        {data.length > 0
          ?
          <Grid>
            {data.map((file) => (
              <Grid item mx={3} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', width: 'auto'}}>
                <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(number, file)}>{file}</Button>
              </Grid>
            ))}
          </Grid>
          :
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
        </DialogContent>
      </Dialog>
    </Box>
    
  )
}


export default MeetInfoCard;