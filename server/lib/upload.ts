import { createUploadthing, type FileRouter } from 'uploadthing/server'

const f = createUploadthing()

export const uploadRouter = {
   // Define as many FileRoutes as you like, each with a unique routeSlug
   imageUploader: f({
      image: {
         /**
          * For full list of options and defaults, see the File Route API reference
          * @see https://docs.uploadthing.com/file-routes#route-config
          */
         maxFileSize: '4MB',
         maxFileCount: 5,
      },
   }).onUploadComplete((data) => {
      // Do something with the uploaded files
      console.log('Uploaded files: ')
   }),
} satisfies FileRouter

export type FileRouterType = typeof uploadRouter
