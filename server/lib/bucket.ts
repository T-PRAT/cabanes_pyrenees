import { S3Client } from '@aws-sdk/client-s3'
import { HonoS3Storage } from '@hono-storage/s3'

const client = new S3Client({
   region: 'auto',
   endpoint: process.env.S3_ENDPOINT!,
   credentials: {
      accessKeyId: process.env.ACCESS_KEY!,
      secretAccessKey: process.env.SECRET_KEY!,
   },
})

const storage = new HonoS3Storage({
   key: (c, file) => {
      const { id } = c.req.valid('param')
      return `${id}-${file.name}`
   },
   bucket: '[cabane-pyrenees]',
   client,
})

export { storage }
