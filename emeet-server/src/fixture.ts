import db from "./db"

async function loadFixtures(clearData = false){
  if(clearData){
    console.warn('clearing data')
    await db('meetinfo').del()
    await db('announcement').del()
  }

  await db.batchInsert('announcement', [
    { id: 1, topic: 'Group Coaching 1', meetDate: '08-02-2566', pubDateTime: '2023-2-8 00:00:00', userCode: 'suthon.s'},
    { id: 2, topic: 'Group Coaching 2', meetDate: '10-02-2566', pubDateTime: '2023-2-10 00:00:00', userCode: 'suthon.s'},
  ])
  
  await db.batchInsert('meetinfo', [
    { id: 1, announcementId: 1, place:'Microsoft Team', agendaRule:'1/2566', userCode: '6210110227'},
    { id: 2, announcementId: 2, place:'Microsoft Team', agendaRule:'1/2566', userCode: '6210110227'},
  ])
}

export default loadFixtures