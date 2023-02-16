import { useState } from "react";
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material/';
import MeetInfo from "../models/MeetInfo";

interface Prop {
    meetInfo: MeetInfo
    onUpdateMeetInfo: (meetInfo: MeetInfo) => void;
}

function MeetInfoCard(props: Prop) {
    const meetInfo = props.meetInfo
    const [popup, setPopup] = useState(false);

  return (
    <Box>
      <Card sx={{ maxWidth: 500, height: 250 }}>
        <CardHeader
          sx={{ height: '30%' }}
          title={meetInfo.announcement?.topic}
          subheader={meetInfo.announcement?.meetDate}
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
                <Typography variant="h5" component="div">
                  {meetInfo.place}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {meetInfo.agendaRule}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="button" color="primary">Details</Typography>
          </CardActions>
        </CardActionArea>
      </Card>

      <Dialog PaperProps={{ sx: { minWidth: "50%", maxHeight: "100%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {meetInfo.announcement?.topic}
          </Typography>
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          
          <Typography variant="h6" sx={{ mt: 1 }}>
            ประชุมวันที่: {meetInfo.announcement?.meetDate}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            สถานที่: {meetInfo.place}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ระเบียบการวาระประชุม: {meetInfo.agendaRule}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            วาระการประชุม
          </Typography>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">1. เรื่องแจ้งเพื่อทราบ</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">2. รับรองรายงานการประชุม</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">3. เรื่องสืบเนื่องจากการประชุมครั้งที่แล้ว</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">4. เรื่องค้างเพื่อพิจารณา</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">5. เรื่องเสนอเพื่อพิจารณาใหม่</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">6. เรื่องอื่น</Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea sx={{ height: '30%' }} >
            <CardActions sx={{ mt: 1 }}>
              <Typography variant="button" color="primary">7. การเชิญประชุม</Typography>
            </CardActions>
          </CardActionArea>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default MeetInfoCard;