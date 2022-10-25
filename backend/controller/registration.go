package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateRegistration(c *gin.Context) {
	var registrations entity.Registration
	var subjects entity.Subject
	var student entity.Student
	var states entity.State

	if err := c.ShouldBindJSON(&registrations); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", registrations.StateID).First(&states); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 10: ค้นหา teahcher ด้วย id
	if tx := entity.DB().Where("id = ?", registrations.SubjectID).First(&subjects); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", registrations.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}

	// 12: สร้าง WatchVideo
	r := entity.Registration{
		Student: student,
		Subject: subjects,
		State:   states,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": r})

}

// GET /user/:id

func GetRegistration(c *gin.Context) {

	var registration entity.Registration

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM registrations WHERE id = ?", id).Scan(&registration).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": registration})

}

// GET /users

func ListRegistration(c *gin.Context) {

	var registrations []entity.Registration

	if err := entity.DB().Preload("Student").Preload("Subject").Preload("State").Raw("SELECT * FROM registrations").Find(&registrations).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": registrations})

}

// DELETE /users/:id

func DeleteRegistration(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM registrations WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "registration not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateRegistration(c *gin.Context) {

	var registration entity.Registration

	if err := c.ShouldBindJSON(&registration); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", registration.ID).First(&registration); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "registration not found"})

		return

	}
}
