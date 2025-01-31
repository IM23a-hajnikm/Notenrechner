import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';

async function createTestUser() {
  const connection = await getConnection();
  const hashedPassword = await bcrypt.hash('test123', 10);
  
  await connection
    .createQueryBuilder()
    .insert()
    .into('users')
    .values({
      email: 'test@test.com',
      password: hashedPassword,
      name: 'Test User'
    })
    .execute();
}

createTestUser()
  .then(() => console.log('Test user created'))
  .catch(console.error); 