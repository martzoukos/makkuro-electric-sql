import fs from 'fs'
import pg from 'pg'

const migrationsFolder = './migrations/data';

async function seed() {
  const { Client } = pg
  const client = new Client({
    // Postgres URL, not Electric Proxy URL
    connectionString: 'postgresql://postgres:pg_password@localhost:5433/postgres'
  })
  await client.connect()
  try {
    await client.query('BEGIN')
    // Transaction starts
    const migrations = await getMigrations(migrationsFolder)
    migrations.forEach(async migration => {
      const migrationData = readFile(migration);
      await client.query(migrationData)
    })
    // Transaction ends
    await client.query('COMMIT')
    console.log('✅ Migrations ran successfully!')
  } catch (e) {
    console.log('❌ There was an issue, rolling back changes.')
    await client.query('ROLLBACK')
    throw e
  } finally {
    await client.end()
  }

}

seed()


const getMigrations = async (migrationsFolder: string) => {
  const files = fs.readdirSync(migrationsFolder)
  return files.map(f => migrationsFolder + '/' + f)
}

const readFile = (file: string) => {
  return fs.readFileSync(file, { encoding: 'utf-8' });
}
