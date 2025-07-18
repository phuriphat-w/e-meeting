import { useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import Announcement from "../models/Announcement";
import './meetinfo-card.css'
import { VscFilePdf } from 'react-icons/vsc';


interface Prop {
  announcement: Announcement
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

function MeetInfoCard(props: Prop) {
  const announcement = props.announcement;
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const disable = announcement.isMeetingEnd;
  const [data, setData] = useState<string[]>([]);
  const [number, setNumber] = useState(0);
  
  // Mock file data
  const mockFiles: { [key: number]: string[] } = {
    1: ['agenda1_document.pdf', 'meeting_notes.pdf'],
    2: ['previous_meeting_minutes.pdf'],
    3: ['follow_up_items.pdf', 'action_items.pdf'],
    4: ['pending_issues.pdf'],
    5: ['new_proposals.pdf', 'budget_review.pdf'],
    6: ['miscellaneous.pdf'],
    7: ['next_meeting_invitation.pdf']
  };
  
  const ListAll = (n : number) => {
    setData([]);
    setNumber(0);

    // Mock file listing
    setTimeout(() => {
      const files = mockFiles[n] || [];
      setData(files);
      setNumber(n);
    }, 500);
    
    setPopup2(true);
  }

  const downloadURL = (n : number, name : string) => {
    // Mock file download
    console.log(`Mock download: ${name} from agenda ${n}`);
    alert(`Mock download: ${name}\n(In real app, this would download the file)`);
  }

  return (
    <Box>
      {!disable
      ?
      <Card sx={{ maxWidth: 500, height: 250, borderRadius:7 }}>
        <CardHeader
          sx={{ height: '30%' }}
          title={<Typography variant="h6" sx={{fontFamily:'Kanit',fontWeight:500}}>{announcement?.topic}</Typography>}
          subheader={<Typography sx={{fontFamily:'Kanit',fontWeight:300,fontSize:17}}>{announcement?.meetDate}</Typography>}
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
                <Typography variant="h5" component="div" sx={{fontFamily:'Kanit',fontSize:22}}>
                  {announcement.place}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{fontFamily:'Kanit',fontSize:17}}>
                  {announcement.agendaRule}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="button" color="primary" sx={{fontFamily:'Kanit'}}>รายละเอียด</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
      :
      <Card sx={{ maxWidth: 500, height: 250, backgroundColor: '#EEEEEE', borderRadius:7}}>
        <CardHeader
          sx={{ height: '30%' }}
          title={<Typography variant="h6" sx={{fontFamily:'Kanit',fontWeight:500}}>{announcement?.topic}</Typography>}
          subheader={<Typography sx={{fontFamily:'Kanit',fontWeight:300,fontSize:17}}>{announcement?.meetDate}</Typography>}
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
                <Typography variant="h5" component="div" sx={{fontFamily:'Kanit',fontSize:22}}>
                  {announcement.place}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{fontFamily:'Kanit',fontSize:17}}>
                  {announcement.agendaRule}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="button" color="primary" sx={{fontFamily:'Kanit'}}>รายละเอียด</Typography>
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
          <Typography  variant="h6" sx={{ mt: 1,fontFamily: "Kanit",fontWeight:400}}  marginLeft={3}>
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

      <Dialog PaperProps={{ sx: { minWidth: "20%", height: 350 , marginLeft:40 ,marginTop: 30 }} } open={popup2} onClose={() => setPopup2(false)}>
        <CardHeader 
          title={
          <Typography variant="h6" sx={{color:'white',textAlign:'center',fontFamily:'Kanit',fontWeight:300}}>เอกสารทั้งหมด
          </Typography>}
          action={<IconButton sx={{color:'white'}} onClick={() => setPopup2(false)}><Close /></IconButton>}
          sx={{height:'20%',maxwidth:'100%',backgroundColor:'#143B6C'}}>
        </CardHeader>

        <DialogContent dividers>
        {data.length > 0
          ?
          <Grid>
            {data.map((file) => (
              <Grid item mx={3} mb={1} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', width: 'auto'}}>
                <VscFilePdf style={{ fontSize:27,marginRight:4}}/>
                <Button sx={{ fontFamily:'Kanit',fontWeight:400,color: '#2C3333','&:hover': {
            color:'white',backgroundColor:'#0C528E'} }} onClick={() => downloadURL(number, file)}>{file}</Button>
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