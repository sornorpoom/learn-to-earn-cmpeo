# Learn to Earn Chiang Mai — Strategy Presentation & Platform
> **สำนักงานศึกษาธิการจังหวัดเชียงใหม่ (ศธจ.เชียงใหม่)**  
> แพลตฟอร์มนำเสนอเชิงกลยุทธ์ ฐานข้อมูลสืบค้นโครงการ และระบบรับฟังความคิดเห็น 3 ประเด็นยุทธศาสตร์ขับเคลื่อน Learn to Earn จังหวัดเชียงใหม่

---

## 🌟 ฟีเจอร์หลัก (Key Features)

### 1. 🎯 การนำเสนอ 5 นาที (Strategy Pitch Mode)
- **Screen 1: "กลางน้ำบวม ปลายน้ำหาย"** (Value Chain Gap) — กราฟแท่งจำแนกโครงการตาม 7 กลยุทธ์ พร้อมประเด็น Credit Bank (3.5)
- **Screen 2: "เมืองกระจุก อำเภอรอบนอกกระจาย"** (Spatial & Sector Gap) — การกระจายตัวรายอำเภอ 25 อำเภอ และกลุ่มอาชีพเป้าหมาย
- **Screen 3: "รู้ว่ามีคนเรียน แต่ไม่รู้ว่ามีเงินจริงไหม"** (Outcome Gap) — ช่องว่างข้อมูลผู้ผ่าน 21,219 คน สู่กลุ่มที่ยืนยันการนำไปใช้จริง พร้อม QR Code Bridge สด

### 2. 🔍 สืบค้นและคัดกรองโครงการ (Project Explorer)
- ค้นหาแบบ Realtime จาก 23 โครงการของ 21 หน่วยงาน
- กรองตาม **อำเภอ (25 อำเภอ), กลุ่มอาชีพ, สังกัด/หน่วยงาน, รูปแบบการเรียนรู้, สถานะ Best Practice**
- สรุปตัวเลข KPI อัตโนมัติ (จำนวนโครงการ, งบประมาณรวม, ผู้เข้าร่วม, ผู้ผ่าน, ผู้ติดตามผล, ผู้นำไปใช้จริง)
- Deep-Dive Modal แสดงข้อมูลโครงการครบ 24 มิติ
- ส่งออกข้อมูลเป็นไฟล์ **CSV**

### 3. 💬 3 คำถามชวนคุยยุทธศาสตร์ (Strategic Discussion & Win-Win Model)
- **ข้อที่ 1 (ปิดช่องว่างข้อมูล & ติดตามผล):** วิธีติดตามผลลัพธ์รายได้/การใช้ทักษะจริงที่ไม่สร้างภาระครู
- **ข้อที่ 2 (ปิดช่องว่างการกระจายตัว & หลักสูตรพื้นที่):** ทักษะและหลักสูตรที่ควรเติมเต็มในพื้นที่เชียงใหม่
- **ข้อที่ 3 (ปิดช่องว่างการเชื่อมต่อ & แชร์ทรัพยากร Win-Win):** สิ่งที่หน่วยงานพร้อมสนับสนุน (Give) & สิ่งที่ต้องการให้ภาคีหนุนเสริม (Take)
- ตัวเลือกข้อมูลผู้ตอบแบบ **Dropdown ตำแหน่ง และ Dropdown หน่วยงาน**
- บันทึกตรงสู่ Google Sheets: [`1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0`](https://docs.google.com/spreadsheets/d/1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0/edit?usp=sharing)
- Auto-save ลง LocalStorage, คัดลอกมติการประชุมลง Clipboard

### 4. 🎨 การเข้าถึงและธีม (Accessibility & Controls)
- 3 โทนสีสว่าง: **Ocean (ครามฟ้า)**, **Sage (เขียวธรรมชาติ)**, **Warm (อบอุ่นนวลตา)**
- ปรับขนาดตัวอักษร 3 ระดับ: **ก- / ก / ก+**
- รองรับคีย์บอร์ดนำเสนอ: `Spacebar`, `ลูกศรซ้าย-ขวา`, `PageUp/Down`, `F` (Fullscreen)

---

## 🚀 วิธีการนำขึ้น GitHub และ Deploy บน Vercel

### ขั้นตอนที่ 1: นำโค้ดขึ้น GitHub
```bash
# 1. เริ่มต้น git repository
git init

# 2. เพิ่มไฟล์ทั้งหมด
git add .

# 3. Commit
git commit -m "Initial commit: Learn to Earn Chiang Mai Platform"

# 4. เชื่อมกับ GitHub Repository ของคุณ (สร้าง repo เปล่าบน GitHub ก่อน)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 5. Push ขึ้น GitHub
git branch -M main
git push -u origin main
```

### ขั้นตอนที่ 2: Deploy บน Vercel
1. ไปที่ [vercel.com](https://vercel.com) แล้วล็อกอินด้วยบัญชี **GitHub**
2. กดปุ่ม **"Add New..."** ➔ เลือก **"Project"**
3. เลือก Repository ที่เพิ่ง Push ขึ้นไป (เช่น `learn-to-earn-chiangmai`)
4. กดปุ่ม **"Deploy"** (ระบบจะตั้งค่าทั้งหมดให้อัตโนมัติ ไม่ต้องปรับแก้ใดๆ)
5. ภายใน 30 วินาที จะได้ URL เว็บไซต์พร้อมใช้งานทันที เช่น `https://learn-to-earn-chiangmai.vercel.app`

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
learn-to-earn-chiangmai/
├── index.html          # หน้าเว็บหลัก SPA (Dashboard + Presentation + Form)
├── package.json        # กำหนด Metadata และคำสั่งรันสำหรับ Vercel/Node.js
├── vercel.json         # การตั้งค่า Routing, Headers, CORS สำหรับ Vercel
├── .gitignore          # รายการไฟล์ที่ไม่ต้องนำขึ้น Git
├── api/
│   └── submit.js       # Vercel Serverless Function สำหรับรับส่งข้อมูล Form
├── code.gs             # โค้ด Google Apps Script (สำหรับเชื่อมต่อ Sheet Backend)
├── README.md           # เอกสารคู่มือโครงการ
└── *.csv               # ชุดข้อมูลสถิติและโครงการถอดรหัสครบ 6 มิติ
```

---

## 📊 แหล่งข้อมูลอ้างอิง (Data Sources)
- **Google Sheets ฐานข้อมูลโครงการ:** [`1W2LEgQdvGNCdxPpk6EWuPXHoxyOUve8aF-QwGt33TJ4`](https://docs.google.com/spreadsheets/d/1W2LEgQdvGNCdxPpk6EWuPXHoxyOUve8aF-QwGt33TJ4/edit?usp=sharing)
- **Google Sheets สำหรับจัดเก็บคำตอบ:** [`1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0`](https://docs.google.com/spreadsheets/d/1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0/edit?usp=sharing)
- **เอกสารประกอบการประชุม:** สำนักงานศึกษาธิการจังหวัดเชียงใหม่ (ศธจ.เชียงใหม่)
