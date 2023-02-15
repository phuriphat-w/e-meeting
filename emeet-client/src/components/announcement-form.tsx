import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import Announcement from "../models/Announcement";
import DatePicker from 'react-date-picker';

interface Prop {
  announcement: Partial<Announcement>
  callbackFn: (ann: Partial<Announcement>) => void
}

function AnnouncementForm(props: Prop) {
  const topicRef = useRef<HTMLInputElement>(null)
  const [value, onChange] = useState(new Date());

  const onSubmit = () => {
    props.callbackFn({
      id: props.announcement.id,
      topic: topicRef.current?.value,
      pubDateTime: value
    })
  }

  return (
    <Box>
      <div style={{ margin: 20 }}>
        <TextField fullWidth sx={{ minWidth: 120 }} label="Topic" variant="outlined" defaultValue={props.announcement.topic} inputRef={topicRef} />
      </div>
      <div style={{ margin: 35 }}>
        <DatePicker onChange={onChange} value={value}/>
      </div>
      <div style={{ margin: 20 }}>
        <Button variant="contained" sx={{ mb: 1, float: 'right', verticalAlign: 'bottom' }} onClick={onSubmit}>{props.announcement.id ? 'Update' : 'Create'}</Button>
      </div>
    </Box>
  )
}

export default AnnouncementForm;