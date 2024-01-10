import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { sub } from 'date-fns'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    
    // const allNotifications = selectAllNotifications(getState())
    // const [latestNotification] = allNotifications
    // const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.post('http://localhost:3001/notifications', 
        {
            "user": 3,
            "id": nanoid(),
            "message": `created at ${new Date()}`,
            "date": sub(new Date(), { minutes: 10 }).toISOString(),
            "isNew": true,
            "read": false
        })
    return [response.data]
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    allNotificationsRead(state, action) {
        state.forEach(notification => {
          notification.read = true
          notification.isNew = false
        })
      }
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      // Sort with newest first
      state.forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications