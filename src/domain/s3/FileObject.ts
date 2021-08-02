import { FileBody } from '@/domain/s3/FileBody'
import { FileKeyName } from '@/domain/s3/FileKeyName'
import { SSE_TYPE, SSE_TYPE_ENUM } from '@/domain/s3/SSEType'
import { STORAGE_CLASS } from '@/domain/s3/StorageClass'

// TODO: 必要になったらストレージクラスの変更等のメソッドを拡充
export class FileObject {
  private storageClass: STORAGE_CLASS
  private fileName: FileKeyName
  private fileBody: FileBody
  private serverSideEncryption: SSE_TYPE | undefined

  constructor(
    storageClass: STORAGE_CLASS,
    fileName: FileKeyName,
    fileBody: FileBody,
    isSSEEnable: boolean,
  ) {
    this.storageClass = storageClass
    this.fileName = fileName
    this.fileBody = fileBody
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

  storageClassValue(): string {
    return this.storageClass
  }

  body(): string {
    return this.fileBody.data()
  }
}
