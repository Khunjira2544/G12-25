package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65-project.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	//Migrete the schema
	database.AutoMigrate(
		&Officer{},
		&Collegeyear{},
		&Faculty{},
		&Teacher{},
		&Student{},
		//bill
		&Bill{},
		&Payment{},
		//Subject
		&Time{},
		&Subject{},
		//Teacher
		&Prefix{},
		&Educational{},
		//Registration
		&State{},
		&Registration{},
		// Teacher_assessment
		&Teacher_assessment{},
		&Content_difficulty_level{},
		&Content_quality{},
		&Teaching_duration{},
	)

	db = database

	// password, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("12345"), 14)

	db.Model(&Officer{}).Create(&Officer{
		Name:     "Pratchaya",
		Email:    "pratchaya@gmail.com",
		S_ID:     "O11111",
		Password: "1234",
	})
	db.Model(&Officer{}).Create(&Officer{
		Name:     "Sanploy",
		Email:    "sanploy@gmail.com",
		S_ID:     "O22222",
		Password: string(password2),
	})

	var Pratchaya Officer
	var Sanploy Officer
	db.Raw("SELECT * FROM officers WHERE email = ?", "pratchaya@gmail.com").Scan(&Pratchaya)
	db.Raw("SELECT * FROM officers WHERE email = ?", "sanploy@gmail.com").Scan(&Sanploy)

	// Resolution Data    // ของเรา Faculty Data
	science := Faculty{
		Name: "สำนักวิชาวิทยาศาสตร์",
	}
	db.Model(&Faculty{}).Create(&science)

	agricultural_technology := Faculty{
		Name: "สำนักวิชาเทคโนโลยีการเกษตร",
	}
	db.Model(&Faculty{}).Create(&agricultural_technology)

	socialtechnology := Faculty{
		Name: "สำนักวิชาเทคโนโลยีสังคม",
	}
	db.Model(&Faculty{}).Create(&socialtechnology)

	engineering := Faculty{
		Name: "สำนักวิชาวิศวกรรมศาสตร์",
	}
	db.Model(&Faculty{}).Create(&engineering)

	medicine := Faculty{
		Name: "สำนักวิชาแพทย์ศาสตร์",
	}
	db.Model(&Faculty{}).Create(&medicine)

	Nursing := Faculty{
		Name: "สำนักวิชาพยาบาลศาสตร์",
	}
	db.Model(&Faculty{}).Create(&Nursing)

	Dentist := Faculty{
		Name: "สำนักวิชาทันตแพทย์ศาสตร์",
	}
	db.Model(&Faculty{}).Create(&Dentist)

	//     // ของเรา collegeyear  Collegeyear Data
	P1 := Collegeyear{
		Name: "ปี 1",
	}
	db.Model(&Collegeyear{}).Create(&P1)

	P2 := Collegeyear{
		Name: "ปี 2",
	}
	db.Model(&Collegeyear{}).Create(&P2)

	P3 := Collegeyear{
		Name: "ปี 3",
	}
	db.Model(&Collegeyear{}).Create(&P3)

	P4 := Collegeyear{
		Name: "ปี 4",
	}
	db.Model(&Collegeyear{}).Create(&P4)

	T1 := Time{
		Period: "เวลา 1",
	}
	db.Model(&Time{}).Create(&T1)

	T2 := Time{
		Period: "เวลา 2",
	}
	db.Model(&Time{}).Create(&T2)

	T3 := Time{
		Period: "เวลา 3",
	}
	db.Model(&Time{}).Create(&T3)

	T4 := Time{
		Period: "เวลา 4",
	}
	db.Model(&Time{}).Create(&T4)

	// --- Video Data  // ของเรา Teacher Data
	T5001 := Teacher{
		Name:    "สมชาย ทันสมัย",
		Faculty: engineering,
	}
	db.Model(&Teacher{}).Create(&T5001)

	T5002 := Teacher{
		Name:    "สมหญิง จุลทล",
		Faculty: science,
	}
	db.Model(&Teacher{}).Create(&T5002)

	T5003 := Teacher{
		Name:    "มาสาย ประจำ",
		Faculty: engineering,
	}
	db.Model(&Teacher{}).Create(&T5003)

	//bill
	Payment_ID1 := Payment{
		PaymentID:     "PM01",
		Name:          "ธนาคารกสิกรไทย",
		Accountnumber: "741-326985-5",
	}
	db.Model(&Payment{}).Create(&Payment_ID1)
	//--------------

	Payment_ID2 := Payment{
		PaymentID:     "PM02",
		Name:          "ธนาคารไทยพานิชย์",
		Accountnumber: "049-547213-5",
	}
	db.Model(&Payment{}).Create(&Payment_ID2)
	//--------------

	Payment_ID3 := Payment{
		PaymentID:     "PM03",
		Name:          "ธนาคารกรุงไทย",
		Accountnumber: "924-336412-8",
	}
	db.Model(&Payment{}).Create(&Payment_ID3)

	//--------------
	//ตารางย่อย

	//ตารางหลัก
	// db.Model(&Bill{}).Create(&Bill{
	// 	Bill_ID:             1,
	// 	Datetimepay:         "30-08-2022",
	// 	Bill_StudentID:      "6001",
	// 	Bill_RegistrationID: "English for careers",
	// 	Payment:             Payment_ID1,
	// 	OfficerID:      Officer_Name,
	// 	Total:               3200,
	// })

	//ประเมิณอาจารย์ของเพื่อน
	//password
	// phone_1, err := bcrypt.GenerateFromPassword([]byte("0935463156"), 14)
	// phone_2, err := bcrypt.GenerateFromPassword([]byte("0917271607"), 14)

	//Teaching_duration data

	duration_one := Teaching_duration{
		Description: "ใช้เวลานานเกินไปในการสอน",
	}
	db.Model(&Teaching_duration{}).Create(&duration_one)

	duration_two := Teaching_duration{
		Description: "มีการใช้เวลาบางเนื้อหานานเกินไป",
	}
	db.Model(&Teaching_duration{}).Create(&duration_two)

	duration_three := Teaching_duration{
		Description: "เวลาเหมาะสมกับเนื้อหาที่เรียน",
	}
	db.Model(&Teaching_duration{}).Create(&duration_three)

	//content_quality data

	quality_one := Content_quality{
		Description: "เนื้อหาควรที่จะมีการอัพเดต",
	}
	db.Model(&Content_quality{}).Create(&quality_one)

	quality_two := Content_quality{
		Description: "เนื้อหาอยู่ในระดับปกติ",
	}
	db.Model(&Content_quality{}).Create(&quality_two)

	quality_three := Content_quality{
		Description: "เนื้อหามีความเหมาะสมกับรายวิชา",
	}
	db.Model(&Content_quality{}).Create(&quality_three)

	//content difficulty level data

	difficulty_one := Content_difficulty_level{
		Description: "ยากเกินไป",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_one)

	difficulty_two := Content_difficulty_level{
		Description: "พอใช้",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_two)

	difficulty_three := Content_difficulty_level{
		Description: "เหมาะสม",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_three)

	difficulty_four := Content_difficulty_level{
		Description: "เข้าใจง่าย",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_four)

	Prefix_1 := Prefix{
		Name: "อ.",
	}
	db.Model(&Prefix{}).Create(&Prefix_1)

	Prefix_2 := Prefix{
		Name: "อ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_2)

	Prefix_3 := Prefix{
		Name: "ศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_3)

	Prefix_4 := Prefix{
		Name: "ผศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_4)

	Prefix_5 := Prefix{
		Name: "รศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_5)

	Prefix_6 := Prefix{
		Name: "Asst. Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_6)

	Prefix_7 := Prefix{
		Name: "Assoc. Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_7)

	Prefix_8 := Prefix{
		Name: " Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_8)

	Educational_1 := Educational{
		Name: "ปริญญาโท",
	}
	db.Model(&Educational{}).Create(&Educational_1)

	Educational_2 := Educational{
		Name: "ปริญญาเอก",
	}
	db.Model(&Educational{}).Create(&Educational_2)

	//Status
	StateOnline := State{
		Name: "Online",
	}
	db.Model(&State{}).Create(&StateOnline)

	StateOnsite := State{
		Name: "Onsite",
	}
	db.Model(&State{}).Create(&StateOnsite)

}
