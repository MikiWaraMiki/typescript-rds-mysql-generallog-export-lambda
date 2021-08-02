import { InstanceIdentifier } from '@/domain/rds/InstanceIdentifier'
import { LogFile } from '@/domain/rds/LogFile'

/**
 * RDS APIを操作するアクセスインタフェース
 */
export interface RdsApiAccessor {
  describeLogFileListByType(
    rdsIdentifier: InstanceIdentifier,
    typeName: string,
    minLastWritten: number | undefined,
  ): Promise<LogFile[]>
}
