import { generateUploadButton, generateUploadDropzone, generateUploader } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'

import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } = {
  UploadButton: generateUploadButton<OurFileRouter>(),
  UploadDropzone: generateUploadDropzone<OurFileRouter>(),
  Uploader: generateUploader<OurFileRouter>(),
};

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
