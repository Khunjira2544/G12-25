package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/Khunjira2544/sa-65-project/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload_s login body
type LoginPayload_s struct {
	S_ID  string `json:"s_id"`
	Phone string `json:"Phone"`
}

// SignUpPayload signup body
type SignUpPayload_s struct {
	Name  string `json:"name"`
	S_ID  string `json:"s_id"`
	Phone string `json:"phone"`

	Gpax          float32 `json:"gpax"`
	Date_of_birth string  `json:"date_of_birth"`
	Parent        string  `json:"Parent"`
	Password      string  `json:"password"`

	OfficerID     *uint `json:"OfficerID"`
	CollegeyearID *uint `json:"CollegeyearID"`
	FacultyID     *uint `json:"FacultyID"`
	TeacherID     *uint `json:"TeacherID"`
}

// LoginResponse token response
type LoginResponse_s struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// POST /login
func Login_s(c *gin.Context) {
	var payload LoginPayload_s
	var Student entity.Student

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Student ด้วย s_id ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM Students WHERE s_id = ?", payload.S_ID).Scan(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(Student.Password), []byte(payload.Phone))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "phone is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(Student.S_ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    Student.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /create A AA
func CreateStudent(c *gin.Context) {
	var payload SignUpPayload_s
	var Student entity.Student

	// var faculty entity.Faculty
	// var collegeyear entity.Collegeyear
	// var teacher entity.Teacher
	// var officer entity.Officer

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPhone, err := bcrypt.GenerateFromPassword([]byte(payload.Phone), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	Student.Name = payload.Name
	Student.S_ID = payload.S_ID
	Student.Password = string(hashPhone)

	Student.Gpax = payload.Gpax
	Student.Date_of_birth = payload.Date_of_birth
	Student.Phone = payload.Phone
	Student.Parent = payload.Parent

	Student.CollegeyearID = payload.CollegeyearID // โยงความสัมพันธ์กับ Entity Resolution		//**โยงความสัมพันธ์กับ Entity Collegeyear
	Student.FacultyID = payload.FacultyID         // โยงความสัมพันธ์กับ Entity Video				//**โยงความสัมพันธ์กับ Entity Faculty
	Student.TeacherID = payload.TeacherID         // โยงความสัมพันธ์กับ Entity Playlist				Teacher
	Student.OfficerID = payload.OfficerID

	if err := entity.DB().Create(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": Student})
}
