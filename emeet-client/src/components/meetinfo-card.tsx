import { useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import Announcement from "../models/Announcement";
import { storage } from "../fireBaseConfig";

import { ref, getDownloadURL, listAll } from "firebase/storage";

interface Prop {
  announcement: Announcement
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

function MeetInfoCard(props: Prop) {
  const announcement = props.announcement;
  const [popup, setPopup] = useState(false);

  const downloadURL = (n : number) => {
    // Create a reference under which you want to list
    const listRef = ref(storage, 'meetDoc/annId_'+ announcement.id + '/agenId_' + n);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // pass
        });
        res.items.forEach((itemRef) => {
          const starsRef = ref(storage, itemRef.fullPath);
          getDownloadURL(starsRef)
            .then((url) => {
              //console.log(url);
              window.open(url, "_blank");
            })
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;

                // ...

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  const agen1 = () => {
    downloadURL(1)
  }

  const agen2 = () => {
    downloadURL(2)
  }

  const agen3 = () => {
    downloadURL(3)
  }

  const agen4 = () => {
    downloadURL(4)
  }

  const agen5 = () => {
    downloadURL(5)
  }

  const agen6 = () => {
    downloadURL(6)
  }

  const agen7 = () => {
    downloadURL(7)
  }
  
  return (
    <Box>
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

      <Dialog PaperProps={{ sx: { minWidth: "50%", maxHeight: "100%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {announcement.topic}
          </Typography>
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
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
          <Button  onClick={agen1}>
            1. เรื่องแจ้งเพื่อทราบ
          </Button>
          <Typography></Typography>
          <Button  onClick={agen2}>
            2. รับรองรายงานการประชุม
          </Button>
          <Typography></Typography>
          <Button  onClick={agen3}>
            3. เรื่องสืบเนื่องจากการประชุมครั้งที่แล้ว
          </Button>
          <Typography></Typography>
          <Button  onClick={agen4}>
            4. เรื่องค้างเพื่อพิจารณา
          </Button>
          <Typography></Typography>
          <Button  onClick={agen5}>
            5. เรื่องเสนอเพื่อพิจารณาใหม่
          </Button>
          <Typography></Typography>
          <Button  onClick={agen6}>
            6. เรื่องอื่น
          </Button>
          <Typography></Typography>
          <Button  onClick={agen7}>
            7. การเชิญประชุม
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default MeetInfoCard;