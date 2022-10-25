package controller

import (
	"github.com/Khunjira2544/sa-65-project/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Teacher_assessments

func CreateTeacher_assessment(c *gin.Context) {

	var teacher_assessments entity.Teacher_assessment
	var students entity.Student
	var teaching_durations entity.Teaching_duration
	var content_difficulty_levels entity.Content_difficulty_level
	var content_qualitys entity.Content_quality
	var teachers entity.Teacher

	if err := c.ShouldBindJSON(&teacher_assessments); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // 9: ค้นหา time ด้วย id
	// if tx := entity.DB().Where("id = ?", teacher_assessments.StudentID).First(&students); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "students not found"})
	// 	return
	// }

	// 10: ค้นหา teahcher ด้วย id
	if tx := entity.DB().Where("id = ?", teacher_assessments.TeacherID).First(&teachers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teachers not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", teacher_assessments.Teaching_durationID).First(&teaching_durations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teaching_durations not found"})
		return
	}

	// 12: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", teacher_assessments.Content_difficulty_levelID).First(&content_difficulty_levels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "content_difficulty_levels not found"})
		return
	}

	// 13: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", teacher_assessments.Content_qualityID).First(&content_qualitys); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "content_qualitys not found"})
		return
	}

	ta := entity.Teacher_assessment{
		Comment:                  teacher_assessments.Comment,
		Student:                  students,
		Teacher:                  teachers,
		Teaching_duration:        teaching_durations,
		Content_difficulty_level: content_difficulty_levels,
		Content_quality:          content_qualitys,
	}

	if err := entity.DB().Create(&ta).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ta})

}

// GET /user/:id

func GetTeacher_assessment(c *gin.Context) {

	var Teacher_assessment entity.Teacher_assessment

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Teacher_assessments WHERE id = ?", id).Scan(&Teacher_assessment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Teacher_assessment})

}

// GET /Teacher_assessments

func ListTeacher_assessment(c *gin.Context) {

	var Teacher_assessment []entity.Teacher_assessment

	if err := entity.DB().Preload("Student").Preload("Teacher").Preload("Teaching_duration").Preload("Content_difficulty_level").Preload("Content_quality").Raw("SELECT * FROM Teacher_assessments").Find(&Teacher_assessment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Teacher_assessment})

}

// DELETE /Teacher_assessments/:id

func DeleteTeacher_assessment(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Teacher_assessments WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teacher_assessments

func UpdateTeacher_assessment(c *gin.Context) {

	var Teacher_assessment entity.Teacher_assessment

	if err := c.ShouldBindJSON(&Teacher_assessment); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Teacher_assessment.ID).First(&Teacher_assessment); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Teacher_assessment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Teacher_assessment})

}
