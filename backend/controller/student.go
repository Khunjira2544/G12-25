package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

/*// POST /watch_videos   มีทุกอันยกเว้น officer ไม่รู้ทำไม
func CreateStudent(c *gin.Context) {

	var student entity.Student
	var faculty entity.Faculty
	var collegeyear entity.Collegeyear
	var teacher entity.Teacher

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา video ด้วย id              //ของเราเป็น ค้นหา collegeyear ด้วย id
	if tx := entity.DB().Where("id = ?", student.CollegeyearID).First(&collegeyear); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 10: ค้นหา resolution ด้วย id			//ของเราเป็น ค้นหา collegeyear ด้วย id
	if tx := entity.DB().Where("id = ?", student.FacultyID).First(&faculty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id				//ของเราเป็น ค้นหา teacher ด้วย id
	if tx := entity.DB().Where("id = ?", student.TeacherID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}
	// 12: สร้าง WatchVideo
	wv := entity.Student{
		Collegeyear: collegeyear, // โยงความสัมพันธ์กับ Entity Resolution		//**โยงความสัมพันธ์กับ Entity Collegeyear
		Faculty:     faculty,     // โยงความสัมพันธ์กับ Entity Video				//**โยงความสัมพันธ์กับ Entity Faculty
		Teacher:     teacher,     // โยงความสัมพันธ์กับ Entity Playlist				Teacher
		//date_of_birth: student.date_of_birth, // ตั้งค่าฟิลด์ watchedTime
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}*/

// POST /subject
// func CreateStudent(c *gin.Context) {
// 	var student entity.Student
// 	if err := c.ShouldBindJSON(&student); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&student).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": student})
// }

/*// GET /watchvideo/:id
func GetStudent(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}*/

// GET /subject/:id
func GetStudent(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

// GET /watch_videos
func ListStudent(c *gin.Context) {
	var student []entity.Student
	if err := entity.DB().Preload("Officer").Preload("Collegeyear").Preload("Faculty").Preload("Teacher").Raw("SELECT * FROM students").Find(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}

// DELETE /watch_videos/:id
func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /watch_videos
func UpdateStudent(c *gin.Context) {
	var student entity.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", student.ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if err := entity.DB().Save(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}
