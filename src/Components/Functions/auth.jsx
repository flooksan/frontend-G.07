import axios from 'axios'

export const register = async (value) =>
  await axios.post(import.meta.env.VITE_APP_API + '/register', value)

export const login = async (value) =>
  await axios.post(import.meta.env.VITE_APP_API + '/login', value)

export const currentUser = async (authtoken) => {
  return await axios.post(import.meta.env.VITE_APP_API + '/current-user',
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
}
export const editProfile = async (value) => {
  await axios.put(import.meta.env.VITE_APP_API + '/users', value).then((res) => {
    // console.log('res.data',res.data.payload.user.images)
    // alert(res.data)
  })
  .catch((err) => {
    console.log(err.response.data)
    alert(err.response.data)

  })

}
