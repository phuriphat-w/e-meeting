import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography, Card, CardHeader, CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import Announcement from "../../models/Announcement";

interface Prop {
    announcement: Announcement
  }

function NotificationCard(props: Prop) {
    const announcement = props.announcement;

    return(
        <Box>
            <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardActionArea>
                    <CardHeader
                        sx={{ height: 100 ,width: 1000}}
                        title={announcement.topic}
                        subheader={announcement.meetDate}
                    />
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default NotificationCard;