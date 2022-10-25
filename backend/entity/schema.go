package entity

import (
	//"time"

	"gorm.io/gorm"
)

type Officer struct {
	gorm.Model
	S_ID     string `gorm:"uniqueIndex"`
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string `json:"-"`

	//ผู้ดูแลระบบ 1 คน สามารถบันทึกข้อมูลนักศึกษาได้หลายคน
	Students []Student `gorm:"foreignKey:OfficerID"`

	Teachers []Teacher `gorm:"ForeignKey:OfficerID"`

	Subjects []Subject `gorm:"foreignKey:OfficerID"`

	Bills []Bill `gorm:"foreignKey:OfficerID"`
}

type Faculty struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สำนักวิชา มีนักศึกษาหลายคน
	Students []Student `gorm:"foreignKey:FacultyID"`
	//1 สำนักวิชา มีอาจารย์หลายท่าน
	Teachers []Teacher `gorm:"foreignKey:FacultyID"`

	Subjects []Subject `gorm:"foreignKey:FacultyID"`
}

type Collegeyear struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 ชั้นปี มีนักศึกษาหลายคน
	Students []Student `gorm:"foreignKey:CollegeyearID"`
}

// type Teacher struct {
// 	gorm.Model
// 	Name string `gorm:"uniqueIndex"`
// 	//Email string `gorm:"uniqueIndex"`
// 	// TeacherID ทำหน้าที่เป็น FK
// 	FacultyID *uint
// 	// เป็นข้อมูล user เมื่อ join ตาราง
// 	Faculty Faculty `gorm:"references:id"`
// 	//อาจารย์1คน มีนักศึกษาหลายคน
// 	Students []Student `gorm:"foreignKey:TeacherID"`
// }

// bill
type Payment struct {
	gorm.Model
	PaymentID     string `gorm:"primaryKey"`
	Name          string
	Accountnumber string `gorm:"uniqueIndex"`
	Bills         []Bill `gorm:"foreignKey:PaymentID"`
}

// Subject
type Time struct {
	gorm.Model
	Period string

	Subject []Subject `gorm:"foreignKey:TimeID"`
}

// Teacher
type Prefix struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Teacher []Teacher `gorm:"ForeignKey:PrefixID"`
}

type Educational struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Teacher []Teacher `gorm:"ForeignKey:EducationalID"`
}

type State struct {
	gorm.Model
	Name         string         `gorm:"uniqueIndex"`
	Registration []Registration `gorm:"ForeignKey: StateID"`
}

// ประเมิณอาจารย์ ของเพื่อน
type Teaching_duration struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessments []Teacher_assessment `gorm:"foreignKey:Teaching_durationID"`
}

type Content_difficulty_level struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessments []Teacher_assessment `gorm:"foreignKey:Content_difficulty_levelID"`
}

type Content_quality struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessments []Teacher_assessment `gorm:"foreignKey:Content_qualityID"`
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
type Student struct {
	gorm.Model
	S_ID          string
	Name          string
	Gpax          float32
	Date_of_birth string
	Phone         string
	Parent        string
	Password      string

	OfficerID *uint
	Officer   Officer `gorm:"references:id"`

	CollegeyearID *uint
	Collegeyear   Collegeyear `gorm:"references:id"`

	FacultyID *uint
	Faculty   Faculty `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`

	Registration        []Registration       `gorm:"foreignKey:StudentID"`
	Teacher_assessments []Teacher_assessment `gorm:"foreignKey:StudentID"`
}

type Registration struct {
	gorm.Model

	SubjectID *uint
	Subject   Subject `gorm:"references:id"`
	StudentID *uint
	Student   Student `gorm:"references:id"`
	StateID   *uint
	State     State  `gorm:"references:id"`
	Bills     []Bill `gorm:"foreignKey:RegistrationID"` //เพิ่ม
}

type Teacher_assessment struct {
	gorm.Model
	Comment string

	StudentID *uint
	Student   Student `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`

	Teaching_durationID *uint
	Teaching_duration   Teaching_duration `gorm:"references:id"`

	Content_difficulty_levelID *uint
	Content_difficulty_level   Content_difficulty_level `gorm:"references:id"`

	Content_qualityID *uint
	Content_quality   Content_quality `gorm:"references:id"`
}

// Teacher ของเพื่อน
type Teacher struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string

	OfficerID *uint
	Officer   Officer `gorm:"references:id"`

	FacultyID *uint
	Faculty   Faculty `gorm:"references:id"`

	PrefixID *uint
	Prefix   Prefix `gorm:"references:id"`

	EducationalID *uint
	Educational   Educational `gorm:"references:id"`

	Students            []Student            `gorm:"foreignKey:TeacherID"` //
	Subjects            []Subject            `gorm:"foreignKey:TeacherID"` //
	Teacher_assessments []Teacher_assessment `gorm:"foreignKey:TeacherID"` //
}

type Subject struct {
	gorm.Model
	Code    string
	Name    string
	Credit  uint
	Section uint
	Day     string
	Take    uint

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`

	FacultyID *uint
	Faculty   Faculty `gorm:"references:id"`

	OfficerID *uint
	Officer   Officer `gorm:"references:id"`

	TimeID *uint
	Time   Time `gorm:"references:id"`

	Registration []Registration `gorm:"foreignKey:SubjectID"`
}

type Bill struct {
	Bill_ID     *uint `gorm:"primaryKey"`
	Datetimepay string
	Total       *uint

	RegistrationID *uint
	Registration   Registration `gorm:"references:id"`

	//FK
	PaymentID *string //ไม่ใช้ มันบัค`gorm:"references:payment_id"`
	Payment   Payment `gorm:"references:id"`

	//ต้องเพิ่มลงทะเบียน
	OfficerID *uint
	Officer   Officer `gorm:"references:id"`
}
