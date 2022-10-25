package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

func CreateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	var officers entity.Officer
	var faculties entity.Faculty
	var prefixes entity.Prefix
	var educational entity.Educational

	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", teacher.OfficerID).First(&officers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "officers not found"})
		return
	}

	// 10: ค้นหา teahcher ด้วย id
	if tx := entity.DB().Where("id = ?", teacher.FacultyID).First(&faculties); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "faculties not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", teacher.PrefixID).First(&prefixes); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefixes not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", teacher.EducationalID).First(&educational); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educational not found"})
		return
	}

	// 12: สร้าง WatchVideo
	t := entity.Teacher{
		Name:     teacher.Name,
		Email:    teacher.Email,
		Password: teacher.Password,

		Officer:     officers,
		Faculty:     faculties,
		Prefix:      prefixes,
		Educational: educational,
	}

	if err := entity.DB().Create(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": t})
}

// GET /users
// List all users
func ListTeachers(c *gin.Context) {
	var teachers []entity.Teacher
	if err := entity.DB().Preload("Officer").Preload("Faculty").Preload("Prefix").Preload("Educational").Raw("SELECT * FROM teachers").Find(&teachers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// GET /user/:id
// Get user by id
func GetTeacher(c *gin.Context) {
	var teacher entity.Teacher
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

// PATCH /users
func UpdateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", teacher.ID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	if err := entity.DB().Save(&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

// DELETE /users/:id
func DeleteTeacher(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM teachers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
