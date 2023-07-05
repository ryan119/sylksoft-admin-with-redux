import { getToken } from 'next-auth/jwt'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export default async (req, res) => {
  console.log(req.body)
  let token = ''
  try {
    const t = await getToken({ req })
    if(t) {
      token = t?.user?.token
    }
  } catch (err) {
    console.log('Catch Error From API Router:', err)
  }

  return httpProxyMiddleware(req, res, {
    target: baseUrl,
    pathRewrite: [{
      patternStr: '^/api/mxmt', replaceStr: '/api'
    }],
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}