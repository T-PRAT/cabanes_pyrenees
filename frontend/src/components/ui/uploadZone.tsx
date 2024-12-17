import { FileRouterType } from '../../../../server/lib/upload'

import { UploadButton, UploadDropzone } from '@uploadthing/react'

export const UploadZone = () => (
   <UploadButton<FileRouterType, 'imageUploader'>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
         // Do something with the response
         console.log('Files: ', res)
         alert('Upload Completed')
      }}
      onUploadError={(error: Error) => {
         alert(`ERROR! ${error.message}`)
      }}
      onUploadBegin={(name) => {
         // Do something once upload begins
         console.log('Uploading: ', name)
      }}
   />
)
