/** @format */

import axios from 'axios'

// Mock
import mockAlbuns from '../mock/albuns'
import mockRideInGroup from '../mock/rideInGroup'
import mockDayOfTheWeek from '../mock/dayOfTheWeek'

const api = {
  get: {
    users: axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data),
    photos: axios.get('https://jsonplaceholder.typicode.com/photos').then(response => response.data),
    posts: axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data),
    albuns: new Promise((resolve, reject) => {
      resolve(mockAlbuns)
    }),
    rideInGroup: new Promise((resolve, reject) => {
      resolve(mockRideInGroup)
    }),
    dayOfTheWeek: new Promise((resolve, reject) => {
      resolve(mockDayOfTheWeek)
    }),
  },
}

export default api
