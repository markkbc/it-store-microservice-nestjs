# it-store-microservice-nestjs

## วิธีการใช้งาน
`cd` เข้าทุก folder จากนั้น `run npm run start:dev` ทุก folder พร้อมกัน โดยแต่ละ folder จะมี `PORT` ตามด้านล่าง
- gateway:  เป็น `Client` ใช้ `PORT 3000`
- member:  เป็น `Member Service` ใช้ `PORT 3001`
- notify:  เป็น `Notify Service` ใช้ `PORT 3002`
- store:  เป็น `Store Service` ใช้ `PORT 3003` 
    - หลังจาก npm install ให้ run คำสั่งพวกนี้ตามมา
    - `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mydb -d postgres` (db localhost)
    - `npx prisma generate`
    - `npx prisma migrate dev` (เพื่อ migrate schema prisma)
    - `npx prisma db seed` (เพื่อ seed data เข้าไปใน db)