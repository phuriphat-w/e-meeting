import { useEffect, useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Dialog, DialogTitle, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Close, Delete, Edit, Upload, Download } from "@mui/icons-material";
import Announcement from "../models/Announcement";
import AnnouncementForm from "./announcement-form";
import Repo from '../repositories'
import MeetInfo from "../models/MeetInfo";
import { storage } from "../fireBaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2'

interface Prop {
  announcement: Announcement
  callbackFetchFn: () => void
  onUpdateAnnouncement : (announcement: Announcement) => void;
}

function AnnouncementCard(props: Prop) {
  const announcement = props.announcement
  const [meetInfoList, setMeetInfoList] = useState<Partial<MeetInfo>[]>([]);
  const [popup, setPopup] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [fileSelected, setFile] = useState<File>();
  const [agendaSelected, setAgenda] = useState<number>();
  const [downloadURL, setDownloadURL] = useState('');

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
        setPopup(false)
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((results) => {
          /* Read more about isConfirmed, isDenied below */
          if (results.isConfirmed) {
            props.onUpdateAnnouncement(result)
            Swal.fire('Saved!', '', 'success')
          } else if (results.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
    }
  }

  const onDelete = async () => {
    await Repo.announcements.delete(announcement.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.callbackFetchFn()
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        )
      }
    })
  }

  const handleSelectedFile = (file : any, n : number) => {
    if(file && isImporting == false){
      setAgenda(n)
      setIsImporting(true)
      setFile(file[0])
    }
  }

  const handleCancelFile = () => {
    setIsImporting(false)
  }

  const handleImport = async (event: any) => {
    if (fileSelected && isImporting == true){
      setIsImporting(false)
      const name = fileSelected.name
      const storageRef = ref(storage, 'meetDoc/annId_'+ announcement.id + '/agenId_' + agendaSelected + '/' + name)
      const uploadTask = uploadBytesResumable(storageRef, fileSelected)

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url)
          });
        }
      );
    }

    event.target.value = null
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
          subheader={announcement?.meetDate}
          action={
            <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={onDelete}>
              <Delete />
            </IconButton>
          }
        />
        <CardActionArea sx={{ height: '56%' }} onClick={() => setPopup(true)}>
          <CardContent sx={{ height: '40%' }}>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={3}>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Edit color="primary" />
          </CardActions>
        </CardActionArea>
      </Card>

      <Dialog PaperProps={{ sx: { minWidth: "50%", height: "55%" } }} open={popup} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tabs value={tabIndex} onChange={(event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="แก้ไขชื่อและวันที่" />
            <Tab label="ระบุสมาชิกที่มีส่วนร่วม" />
            <Tab label="อัปโหลดไฟล์เอกสาร" />
          </Tabs>
          <IconButton onClick={() => setPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Box hidden={tabIndex !== 0}>
          <AnnouncementForm announcement={announcement} callbackFn={onUpdate}></AnnouncementForm>
        </Box>
        <Box hidden={tabIndex !== 1} sx={{ margin: 2 }}>
          อยู่ระหว่างการพัฒนา
        </Box>
        <Box hidden={tabIndex !== 2}>
          <Box sx={{ margin: 2 }}>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 1.เรื่องแจ้งเพื่อทราบ
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 1)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 2.รับรองรายงานการประชุม
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 2)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 3.เรื่องสืบเนื่องจากการประชุมครั้งที่แล้ว
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 3)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 4.เรื่องค้างเพื่อพิจารณา
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 4)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 5.เรื่องเสนอเพื่อพิจารณาใหม่
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 5)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 6.เรื่องอื่น
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 6)} />
            </Button>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              วาระที่ 7.การเชิญประชุม
            </Typography>
            <Button disabled={isImporting} variant="contained" component="label" sx={{ mx: 1 }}>
              <Upload />
              เลือกไฟล์
              <input hidden type="file" accept=".pdf" onChange={(file) => handleSelectedFile(file.target.files, 7)} />
            </Button>
          </Box>
          <Button disabled={!isImporting} variant="contained" component="label" sx={{ mx: 4, my: 1 }} onClick={handleImport}>
            อัปโหลด
          </Button>
          <Button disabled={!isImporting} variant="contained" component="label" sx={{ mx: 4, my: 1 }} onClick={handleCancelFile}>
            ยกเลิก
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
}

export default AnnouncementCard;