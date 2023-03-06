import { useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import Announcement from "../models/Announcement";

import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";

interface Prop {
  announcement: Announcement
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

function MeetInfoCard(props: Prop) {
  const announcement = props.announcement;
  const [popup, setPopup] = useState(false);
  const disable = announcement.isMeetingEnd;
  const storage = getStorage();
  const [data1, setData1] = useState<string[]>([]);
  const [data2, setData2] = useState<string[]>([]);
  const [data3, setData3] = useState<string[]>([]);
  const [data4, setData4] = useState<string[]>([]);
  const [data5, setData5] = useState<string[]>([]);
  const [data6, setData6] = useState<string[]>([]);
  const [data7, setData7] = useState<string[]>([]);
  const [fileSelected, setFileSelected] = useState(false);

  const ListAll = (n : number) => {
    if(fileSelected == true){
      setData1([]);
      setData2([]);
      setData3([]);
      setData4([]);
      setData5([]);
      setData6([]);
      setData7([]);
      setFileSelected(false)
    }

    if(fileSelected == false){
      const fileRef = ref(storage, 'meetDoc/annId_'+ announcement.id + '/agenId_' + n);
      listAll(fileRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            if(n === 1){
              setData1((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 2){
              setData2((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 3){
              setData3((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 4){
              setData4((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 5){
              setData5((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 6){
              setData6((arr: string[]) => [...arr, itemRef.name]);
            }
            if(n === 7){
              setData7((arr: string[]) => [...arr, itemRef.name]);
            }
            setFileSelected(true);
          })
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
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
          <Typography variant="h4" sx={{ mt: 1 }}>
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

          <Typography variant="h6" sx={{ mt: 1 }}>
            ประชุมวันที่: {announcement.meetDate}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            สถานที่: {announcement.place}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ระเบียบการวาระประชุม: {announcement.agendaRule}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            วาระการประชุม
          </Typography>
          <Button onClick={() => ListAll(1)}>
            1. เรื่องแจ้งเพื่อทราบ
          </Button>
          {data1.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(1, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button  onClick={() => ListAll(2)}>
            2. รับรองรายงานการประชุม
          </Button>
          {data2.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(2, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button  onClick={() => ListAll(3)}>
            3. เรื่องสืบเนื่องจากการประชุมครั้งที่แล้ว
          </Button>
          {data3.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(3, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button  onClick={() => ListAll(4)}>
            4. เรื่องค้างเพื่อพิจารณา
          </Button>
          {data4.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(4, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button onClick={() => ListAll(5)}>
            5. เรื่องเสนอเพื่อพิจารณาใหม่
          </Button>
          {data5.map((file) => (
            <Button sx={{ color: '#2C3333' }}  onClick={() => downloadURL(5, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button  onClick={() => ListAll(6)}>
            6. เรื่องอื่น
          </Button>
          {data6.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(6, file)}>{file}</Button>
          ))}
          <Typography></Typography>
          <Button  onClick={() => ListAll(7)}>
            7. การเชิญประชุม
          </Button>
          {data7.map((file) => (
            <Button sx={{ color: '#2C3333' }} onClick={() => downloadURL(7, file)}>{file}</Button>
          ))}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default MeetInfoCard;