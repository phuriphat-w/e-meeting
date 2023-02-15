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
          subheader={new Date(meetInfo.announcement?.pubDateTime!.toString()).toLocaleString('en-GB')}
        />
        <CardActionArea sx={{ height: '56%' }}>
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
            <Typography variant="button" color="primary">Read More</Typography>
          </CardActions>
        </CardActionArea>
      </Card>

      <Dialog PaperProps={{ sx: { minWidth: "50%", maxHeight: "55%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {meetInfo.announcement?.topic}
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          ผลประกาศ :
          <Typography variant="h5" sx={{ mt: 1 }}>
            {meetInfo.place}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {meetInfo.agendaRule}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default MeetInfoCard;