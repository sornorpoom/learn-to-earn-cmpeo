/**
 * Learn to Earn Chiang Mai - Strategy Presentation & Management Web App
 * สำนักงานศึกษาธิการจังหวัดเชียงใหม่ (ศธจ.เชียงใหม่)
 * Backend Controller & Google Sheets Integration
 * 
 * Database Sheet ID: 1W2LEgQdvGNCdxPpk6EWuPXHoxyOUve8aF-QwGt33TJ4
 * Responses Sheet ID: 1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0
 */

const DATA_SPREADSHEET_ID = '1W2LEgQdvGNCdxPpk6EWuPXHoxyOUve8aF-QwGt33TJ4';
const RESPONSES_SPREADSHEET_ID = '1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0';

function doGet(e) {
  // รองรับ JSON API เมื่อเรียกผ่าน ?api=data
  if (e && e.parameter && e.parameter.api) {
    var data = getSpreadsheetData();
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ใช้ createHtmlOutputFromFile เพื่อความเร็วและเสถียรภาพสูงสุดใน GAS
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Learn to Earn จังหวัดเชียงใหม่ — Strategy Platform')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    var postData;
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      postData = e.parameter;
    } else {
      postData = {};
    }

    var formData = postData.formData || postData;
    var result = saveStrategicAnswers(formData);

    return ContentService.createTextOutput(JSON.stringify({ success: true, result: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ดึงข้อมูลโครงการสดจาก Google Sheets
 * ใช้ getDisplayValues เพื่อป้องกัน Serialization Error ของ Date object ใน GAS
 */
function getSpreadsheetData() {
  try {
    var ss = SpreadsheetApp.openById(DATA_SPREADSHEET_ID);
    var sheets = ss.getSheets();
    var result = {
      projects: [],
      timestamp: new Date().toISOString()
    };

    sheets.forEach(function(sheet) {
      var name = sheet.getName();
      // ใช้ getDisplayValues() เพื่อได้ String ล้วน ป้องกัน crash
      var data = sheet.getDataRange().getDisplayValues();
      if (data.length < 2) return;

      var headers = data[0];
      var rows = data.slice(1).map(function(row) {
        var obj = {};
        headers.forEach(function(h, idx) {
          if (h) obj[h.toString().trim()] = row[idx] || '';
        });
        return obj;
      });

      if (name.indexOf('โครงการ') !== -1 || name.indexOf('Project') !== -1) {
        result.projects = rows;
      }
    });

    if (result.projects.length === 0 && sheets.length > 0) {
      var firstSheetData = sheets[0].getDataRange().getDisplayValues();
      var h = firstSheetData[0];
      result.projects = firstSheetData.slice(1).map(function(row) {
        var obj = {};
        h.forEach(function(header, idx) {
          if (header) obj[header.toString().trim()] = row[idx] || '';
        });
        return obj;
      });
    }

    return { status: 'success', data: result };
  } catch (error) {
    console.error("getSpreadsheetData error:", error);
    return { status: 'error', message: error.toString() };
  }
}

/**
 * บันทึกคำตอบ 3 คำถามชวนคุยยุทธศาสตร์ลง Google Sheets (ID: 1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0)
 * ป้องกัน Date serialization crash โดยส่งคืน String ล้วน
 */
function saveStrategicAnswers(form) {
  try {
    if (!form || typeof form !== 'object') {
      return { success: false, error: 'ข้อมูลแบบฟอร์มไม่ถูกต้อง' };
    }

    var ss = SpreadsheetApp.openById(RESPONSES_SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    
    // หากชีตยังว่างอยู่ ให้สร้างหัวตาราง
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'ประทับเวลา (Timestamp)',
        'ตำแหน่ง',
        'หน่วยงาน / สถาบัน / สถานศึกษา',
        'ข้อที่ 1: วิธีติดตามผลลัพธ์รายได้/การใช้ทักษะจริง (ไม่สร้างภาระครู)',
        'ข้อที่ 2: ทักษะ/หลักสูตรพื้นที่ที่ควรเติม (ท่องเที่ยว/ดิจิทัล/เกษตรแปรรูป ฯลฯ)',
        'ข้อที่ 3 (Give): สิ่งที่หน่วยงานพร้อมสนับสนุน (งบ/สถานที่/วิทยากร/ตลาด)',
        'ข้อที่ 3 (Take): สิ่งที่อยากให้เพื่อนภาคีหนุนเสริม',
        'ข้อคิดเห็น/ข้อเสนอแนะเพิ่มเติม'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#0f766e').setFontColor('#ffffff');
    }

    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      timeFormatted,
      String(form.position || ''),
      String(form.agency || ''),
      String(form.q1_tracking || ''),
      String(form.q2_skills || ''),
      String(form.q3_give || ''),
      String(form.q3_take || ''),
      String(form.remarks || '')
    ]);

    // ส่งคืนเฉพาะค่า primitive (ห้ามส่งคืน Date object ข้าม google.script.run)
    return { 
      success: true, 
      sheetName: sheet.getName(), 
      timestamp: timeFormatted,
      sheetUrl: 'https://docs.google.com/spreadsheets/d/' + RESPONSES_SPREADSHEET_ID + '/edit'
    };
  } catch (error) {
    console.error("saveStrategicAnswers error:", error);
    return { success: false, error: error.toString() };
  }
}
