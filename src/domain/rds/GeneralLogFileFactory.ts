import { LogFile } from '@/domain/rds/LogFile'

/**
 * RDSの一般クエリログの一覧を取得し、LogFileオブジェクトを生成する
 */
export interface GeneralLogFileFactory {
  execute(rdsInstanceName: string): Promise<LogFile[]>
}
