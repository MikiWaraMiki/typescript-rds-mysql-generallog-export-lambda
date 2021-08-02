import { FileKeyName } from '@/domain/s3/FileKeyName'
import { SSE_TYPE, SSE_TYPE_ENUM } from '@/domain/s3/SSEType'
import { STORAGE_CLASS } from '@/domain/s3/StorageClass'

export class FileObject {
  private storageClass: STORAGE_CLASS
  private fileName: FileKeyName
  private serverSideEncryption: SSE_TYPE | undefined

  constructor(
    storageClass: STORAGE_CLASS,
    fileName: FileKeyName,
    isSSEEnable: boolean,
  ) {
    this.storageClass = storageClass
    this.fileName = fileName
    this.serverSideEncryption = isSSEEnable ? SSE_TYPE_ENUM.AES : undefined
  }

  fullKey(): string {
    return this.fileName.key()
  }

  isSSEEnabled(): boolean {
    return !!this.serverSideEncryption
  }

  algorithmOfSSE(): string {
    return this.serverSideEncryption ?? ''
  }
}
