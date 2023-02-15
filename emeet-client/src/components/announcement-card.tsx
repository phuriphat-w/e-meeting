import { useEffect, useState } from "react";
import { Button, Card, CardHeader, Dialog, DialogTitle, IconButton, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { Close, Delete, Upload } from "@mui/icons-material";
import { read, utils } from 'xlsx';
import { cloneDeep, find, isEqual, pick, assign } from 'lodash';
import Announcement from "../models/Announcement";
import AnnouncementForm from "./announcement-form";
import Repo from '../repositories'
import MeetInfo from "../models/MeetInfo";

interface Prop {
  announcement: Announcement
  callbackFetchFn: () => void
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

const USER_RESULT_BINDABLE = ['place', 'agendaRule']

function AnnouncementCard(props: Prop) {
  const announcement = props.announcement
  const [meetInfoList, setMeetInfoList] = useState<Partial<MeetInfo>[]>([]);
  const [popup, setPopup] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const xlsxHeading = [
    'place',
    'agendaRule'
  ];

  const fetchMeetInfoList = async (announcementId: number) => {
    const result = await Repo.announcements.getMeetInfo(announcementId)

    if (result) {
        setMeetInfoList([])
        setMeetInfoList(result)
        setIsImporting(false)
    }
  }

  const onUpdate = async (ann: Partial<Announcement>) => {
    const result = await Repo.announcements.update(ann)
    if (result) {
        props.onUpdateAnnouncement(result)
    }
    setPopup(false)
  }

  const onDelete = async () => {
    await Repo.announcements.delete(announcement.id)
    props.callbackFetchFn()
  }

  const handleImport = (event: any) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target?.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows: MeetInfo[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          let validate
          if (rows.length) {
            validate = true
            Object.keys(rows[0]).forEach((row: string, index) => {
              if (row !== xlsxHeading[index]) {
                validate = false
              }
            })
          }
          if (validate) {
            const result = cloneDeep(meetInfoList)
            for(const oldRow of result){
              oldRow._deleted = true
            }
            for(const row of rows){
              const bindable = pick(row, USER_RESULT_BINDABLE)
              bindable.userCode = bindable.userCode?.toString()
              const target = find(result, ['userCode', bindable.userCode])
              if(target){
                if(!isEqual(pick(target, USER_RESULT_BINDABLE), bindable)){
                  assign(target, bindable)
                  target._updated = true                  
                }
                target._deleted = false
              }else{
                result.push(bindable)
              }
            }
            console.log(result)
            setMeetInfoList(result)
            setIsImporting(true)
          }
        }
      }
      reader.readAsArrayBuffer(file);
    }
    event.target.value = null
  }

  const handleSubmitImport = async () => {
    await Repo.announcements.upsertMeetInfo(announcement.id, meetInfoList)
    fetchMeetInfoList(announcement.id)
  }

  const getConditionalBgColor = (meetInfo: Partial<MeetInfo>) => {
    if(meetInfo._deleted){
      return '#f78279'
    }
    if(meetInfo._updated){
      return '#ffe2b0'
    }
  }

  useEffect(() => {
    fetchMeetInfoList(announcement.id)
}, [announcement.id])


  return (
    <Box>
      <Card sx={{ maxWidth: 500, height: 240 }}>
        <CardHeader
          sx={{ height: '30%' }}
          title={announcement?.topic}
          subheader={new Date(announcement?.pubDateTime?.toString()).toLocaleString('en-GB')}
          action={
            <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={onDelete}>
              <Delete />
            </IconButton>
          }
        />
      </Card>

      <Dialog PaperProps={{ sx: { minWidth: "50%", height: "55%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tabs value={tabIndex} onChange={(event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="General" />
            <Tab label="Meet" />
          </Tabs>
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Box hidden={tabIndex !== 0}>
          <AnnouncementForm announcement={announcement} callbackFn={onUpdate}></AnnouncementForm>
        </Box>
        <Box hidden={tabIndex !== 1}>
          <Button variant="contained" component="label" sx={{ mx: 2 }}>
            <Upload />
            Import
            <input hidden type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleImport} />
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                {xlsxHeading.map((it, index) => <TableCell key={index}><b>{it}</b></TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {meetInfoList.map((meetInfo, index) =>
                <TableRow key={index} sx={{ backgroundColor: getConditionalBgColor(meetInfo) }}>
                  <TableCell>{meetInfo.userCode}</TableCell>
                  <TableCell>{meetInfo.place}</TableCell>
                  <TableCell>{meetInfo.agendaRule}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Button disabled={!isImporting} variant="contained" component="label" sx={{ m: 2, float: 'right' }} onClick={handleSubmitImport}>
            Submit
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
}

export default AnnouncementCard;