import db from "./db"

async function loadFixtures(clearData = false){
  if(clearData){
    console.warn('clearing data')
    await db('announcement').del()
  }

  await db.batchInsert('announcement', [
    { id: 1, topic: 'Group Coaching 1', meetDate: '08-02-2566', detail: 'ให้คำปรึกษาครั้งที่ 1', place: 'Online', agendaRule: '1/2566', pubDateTime: '2023-2-8 00:00:00'},
    { id: 2, topic: 'Group Coaching 2', meetDate: '10-02-2566', detail: 'ให้คำปรึกษาครั้งที่ 2', place: 'Online', agendaRule: '1/2566', pubDateTime: '2023-2-10 00:00:00'},
  ])
}

export default loadFixtures