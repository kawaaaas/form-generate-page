import { PrismaClient } from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class DatabaseClient {
  private static instance: PrismaClient | null = null

  static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient({
        log: ['error', 'warn'],
      })
    }
    return DatabaseClient.instance
  }

  static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect()
      DatabaseClient.instance = null
    }
  }
}

export const prisma = DatabaseClient.getInstance()
export { DatabaseClient }
