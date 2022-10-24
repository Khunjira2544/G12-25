package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

func CreateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&teacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": teacher})
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
