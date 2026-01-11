## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
````

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commit History
![Screenshot](https://img5.pic.in.th/file/secure-sv1/Screenshot-2026-01-11-235205.png)


## Project Structure

### Public

- **images/**: เก็บรูปภาพทั่วไปที่ใช้ใน Project
- **locales/**: เก็บไฟล์แปลภาษา ใช้เป็น i18n เป็นไฟล์ json
- **logo/**: เก็บไฟล์โลโก้ของ Project

### Src
#### App
- **api/companies/**: API route ของ companies ที่เอาไว้ใช้ดึงข้อมูลจาก companies.json (ข้อมูลตัวอย่าง)
  - `[id]/route.ts` → API สำหรับเรียกข้อมูลของแต่ละบริษัทด้วย id
  - `route.ts` → API สำหรับเรียกข้อมูลบริษัททั้งหมด ด้วยข้อมูลของ filter และ คำค้นหา  

- **components/**: เก็บ Components ต่าง ๆ 
  - **content/**: Component ที่รวบรวมแสดงเป็นหน้าของ Project 
    - `AboutUsPage.tsx`, `CompaniesPage.tsx`, `LandingPage.tsx` → หน้าต่าง ๆ โดยจะเรียกที่ page.tsx เพื่อแสดงเป็นหน้าหลัก
    - `EmptyData.tsx` → หน้า state เมื่อไม่มีข้อมูล  
    - `ErrorComponent.tsx` → หน้า state เมื่อเกิด Error ของการเรียก API
  - **filter/**: Component สำหรับ filter ข้อมูลบริษัท
    - `Filter.tsx` → รวบรวม filter 5 filter เพื่อส่งข้อมูลไปยัง CompaniesPage.tsx เพื่อ fetch API
    - `FilterComponent.tsx` → เป็น Component ของ filter เพื่อลดการเขียนซ้ำ
  - **layout/**: Component layout ซ้ำ ๆ เช่น  
    - `Header.tsx`, `Footer.tsx` → ส่วนหัวและท้ายของเว็บ  
  - **Components อื่น ๆ**: `CompanyCard.tsx` เป็น card แสดงข้อมูลของแต่ละบริษัท, `CompanyList.tsx` รวม card บริษัท, `CompanyModal.tsx` เป็น Modal แสดงข้อมูลเพิ่มเติมของบริษัท , `LanguageChange.tsx` เป็น dropdown เปลี่ยนภาษา, `Pagination.tsx` แถบหน้าของ CompanyList , `SearchBar.tsx` อยู่ใน LandingPage แต่ส่งข้อมูลที่ไป CompaniesPage.tsx เพื่อ fetch API

- **layout.tsx**: เพื่อทำ I18nProvider ให้สามารถเปลี่ยนภาษาได้ และทำ metadata
- **page.tsx**: เป็นหน้าหลัก ที่รวมทุกหน้า ให้เป็น Single Page 
- **globals.css**: Styles หลักของ Project เขียน Design System เพื่อเป็น theme ของเว็บ
- **favicon.ico**


### Data

- **companies.json**: ตัวอย่างข้อมูลบริษัท 65 บริษัท ( logo ยังไม่มี )

### i18n

- **i18nConfig.ts**: การตั้งค่า i18n  

### Providers

- **i18nProvider.tsx**: Provider สำหรับ context ของ i18n

### Types

- **i18next.d.ts**: Type definitions สำหรับ i18n  


## AI-Assisted Contributions
- **ช่วยแปลภาษาไทยและภาษาอังกฤษ
- **ช่วยแก้การส่งข้อมูลของการ Search ที่ส่งไป api
- **ช่วยแก้เรื่องแปล i18n ในการทำ Providers และ Types
- **ช่วยแนะนำการปรับ ESLint + Prettier + TS strict mode
- **ช่วยแก้เรื่องเปิด dropdown แล้ว overflow y scroll hindder ทำให้ scroll ทั้งหน้า ไม่ได้
- **ช่วยรวบรวมข้อมูลบริษัท 65 บริษัท
- **ช่วยคิดคำต่าง ๆ ที่ใช้ในหน้า Landing และ About Us