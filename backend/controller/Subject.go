// วิชา ของเพื่อน
package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /subject
func CreateSubject(c *gin.Context) {
	var subject entity.Subject
	var time entity.Time
	var teacher entity.Teacher
	var officer entity.Officer
	var faculty entity.Faculty

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", subject.TimeID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 10: ค้นหา teahcher ด้วย id
	if tx := entity.DB().Where("id = ?", subject.TeacherID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", subject.FacultyID).First(&faculty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", subject.OfficerID).First(&officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}

	// 12: สร้าง WatchVideo
	s := entity.Subject{
		Officer: officer, // โยงความสัมพันธ์กับ Entity Officer
		Time:    time,    // โยงความสัมพันธ์กับ Entity Time
		Teacher: teacher, // โยงความสัมพันธ์กับ Entity Teacher
		Faculty: faculty, // โยงความสัมพันธ์กับ Entity Faculty
		Code:    subject.Code,
		Name:    subject.Name,
		Credit:  subject.Credit,
		Section: subject.Section,
		Day:     subject.Day,
		Take:    subject.Take,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": s})
	// var subject entity.Subject
	// if err := c.ShouldBindJSON(&subject); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// if err := entity.DB().Create(&subject).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"data": subject})
}

// ------------------------------------------Get--------------------------------------------

// GET /subject/:id
func GetSubject(c *gin.Context) {
	var subject entity.Subject
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM subjects WHERE id = ?", id).Scan(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// GET /subjects
func ListSubject(c *gin.Context) {
	var subjects []entity.Subject
	if err := entity.DB().Preload("Officer").Preload("Faculty").Preload("Time").Preload("Teacher").Raw("SELECT * FROM subjects").Find(&subjects).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subjects})
}

// DELETE /subjects/:id
func DeleteSubject(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FORM subjects WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /subjects
func UpdateSubject(c *gin.Context) {
	var subject entity.Subject
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", subject.ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}

	if err := entity.DB().Save(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject})
}
