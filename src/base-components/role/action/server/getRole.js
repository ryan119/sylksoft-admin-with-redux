import { getToken } from 'next-auth/jwt'
import { mxmtAPI } from 'src/store/axios'


export const getRoleData = async (roleId, req) => {
  console.log('roleID:', roleId)
  const secret = 'ss3a_passwd_provider'
  const { user } = await getToken({ req, secret })
  console.log('getToken: ', user)
  const token = user?.token?.token
  const res = await mxmtAPI.get(`/api/system/role/${roleId}`, {headers: {
      Authorization: `Bearer ${token}`
    }})
  //console.log(res)
  return await res.data
}

export default async function handler(req, res) {

  /*const data = await getData()
  res.status(200).json(data)*/
}
