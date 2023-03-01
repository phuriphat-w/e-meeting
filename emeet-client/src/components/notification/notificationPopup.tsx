import { Button, TextField, Typography, Grid, TableCell, Stack } from "@mui/material";
import { Box, margin } from "@mui/system";
import { useRef, useState, useEffect, ChangeEvent} from "react";
import Announcement from "../../models/Announcement";
import Repo from '../../repositories';
import NotificationCard from "./NotificationCard";

function NotificationPopup(): JSX.Element {
  const [annList, setAnnList] = useState<Announcement[]>([])
  const [selectFilter, setSelectFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const fetchAnnList = async () => {
      let params: { keyword?: string} = {}
      if (searchFilter) {
          params.keyword = searchFilter
      }
      const result = await Repo.announcements.getAll(params)
      if (result) {
          if (annList.length) {
              setAnnList([])
          }
          setAnnList(result)
      } 
  }

  useEffect(() => {
      fetchAnnList()
  }, [selectFilter, searchFilter])

    return (
      <Box sx={{ width: 500, height: 1000}}>
      <div>
            {annList.length
              ?
              <Grid
                container spacing={2}
              >
                {annList.map((announcement, index) => 
                    <Grid item md={17}>
                        <NotificationCard announcement={announcement}></NotificationCard>
                    </Grid>
                )}
              </Grid>
              :
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', minHeight: 500, width: 450}}>
                <Typography variant='body2' color='text.secondary'>ไม่พบรายการการประชุม</Typography>
              </Box>
            }
            </div>
            <div style={{ margin: 20 }}>
              <Button variant="contained" sx={{ mb: 1, verticalAlign: 'bottom', width: 690, height: 50}}>อ่านทั้งหมด</Button>
            </div>
    </Box>
  )
}

export default NotificationPopup;