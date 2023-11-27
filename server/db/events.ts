import connection from './connection.ts'

import { NewEvent, Event, DisplayEvent } from '../../models/Event.ts'

//function to get the details we need for the list of events
export function getEventList(db = connection) {
  const currentDate = new Date().toISOString()

  return db('events')
    .join('users', 'users.auth0Id', 'events.added_by_user')
    .where('date', '>=', currentDate)
    .select(
      'events.id',
      'events.name as name',
      'events.photo',
      'events.date',
      'events.location',
      'events.description',
      'users.name as added_by_user'
    )
    .orderBy('date')
}

export function newEvent(newEventData: NewEvent, db = connection) {
  return db('events')
    .insert({ ...newEventData })
    .returning([
      'id',
      'name',
      'location',
      'date',
      'description',
      'added_by_user',
      'photo',
    ])
}

export function newJoin(newJoinData, db = connection) {
  return db('users_attending_events')
    .insert({ ...newJoinData })
    .returning(['event_id', 'user'])
}

export function userIsAttending(user: string, db = connection) {
  return db('users_attending_events').where({ user }).select('*')
}

export function getEventDetails(
  id: number,
  db = connection
): Promise<DisplayEvent> {
  return db('events')
    .join('users', 'events.added_by_user', 'users.auth0Id')
    .where({ id })
    .select(
      'events.id',
      'events.name as eventName',
      'events.location',
      'events.date',
      'events.description',
      'users.name as userName',
      'users.email',
      'events.photo',
      'users.auth0Id'
    )
    .first()
}

export function updateEvent(
  id: number,
  updatedEventData: Event,
  db = connection
) {
  return db('events')
    .where({ id })
    .update({ ...updatedEventData })
    .returning([
      'id',
      'name',
      'location',
      'date',
      'description',
      'added_by_user',
      'photo',
    ])
}

//function to delete an event
export async function deleteEvent(id: number, db = connection) {
  await db('users_attending_events').where('event_id', id).del()
  return db('events').where({ id }).del()
}
