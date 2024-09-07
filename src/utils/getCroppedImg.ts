import { Area } from 'react-easy-crop'

/**
 * Creates an HTMLImageElement from a given URL.
 * @param url - The image URL.
 * @returns Promise resolving to the created image element.
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // Avoid cross-origin issues
    image.src = url
  })
}

/**
 * Converts a Blob object to a File object.
 *
 * @param blob - The Blob object to be converted to a File.
 * @param fileName - The name to be assigned to the created File.
 * @returns The newly created File object with the specified fileName and type.
 */
export function blobToFile(blob: Blob, fileName: string): File {
  const file: File = new File([blob], String(fileName || '')?.toLowerCase(), {
    type: blob.type,
    lastModified: Date.now(),
  })

  return file
}

/**
 * Crops the image at the given source to match the specified pixelCrop and aspect ratio.
 * @param imageSrc - The source of the image.
 * @param pixelCrop - The cropping coordinates and dimensions.
 * @param aspectRatio - Aspect ratio to maintain (default is 1 for 1:1 aspect ratio).
 * @param fileType - The file format of the resulting image (e.g., 'image/jpeg', 'image/png').
 * @returns Promise resolving to a blob URL of the cropped image.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  aspectRatio: number,
  fileType: string
): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  // Calculate new crop dimensions to enforce the aspect ratio (e.g., 1:1)
  const cropWidth = Math.min(pixelCrop.width, pixelCrop.height * aspectRatio)
  const cropHeight = Math.min(pixelCrop.height, pixelCrop.width / aspectRatio)

  // Set canvas dimensions to match the crop
  canvas.width = cropWidth
  canvas.height = cropHeight

  // Draw the image on the canvas at the desired crop area
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  )

  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob((file: Blob) => {
      if (file) resolve(file)
      else reject(null)
    }, fileType, 0.65)
  })
}
