import db from "./db"

async function loadFixtures(clearData = false){
  if(clearData){
    console.warn('clearing data')
    await db('meet_info').del()
    await db('announcement').del()
  }

  await db.batchInsert('announcement', [
    { id: 1, topic: 'Group Coaching 1', pubDateTime: '2023-02-08', userCode: 'suthon.s'},
    { id: 2, topic: 'Group Coaching 2', pubDateTime: '2023-02-10', userCode: 'suthon.s'},
  ])
  
  await db.batchInsert('meet_info', [
    { id: 1, announcementId: 1, place:'Microsoft Team', agendaRule:'1/2566', userCode: '6210110227'},
    { id: 2, announcementId: 2, place:'Microsoft Team', agendaRule:'1/2566', userCode: '6210110227'},
  ])
}

export default loadFixtures