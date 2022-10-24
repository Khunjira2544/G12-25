//Teacher ของเพื่อน
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khunjira2544/sa-65-project/entity"
)

func CreateEducational(c *gin.Context) {
	var educational entity.Educational
	if err := c.ShouldBindJSON(&educational); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&educational).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": educational})
}

// GET /users
// List all users
func ListEducational(c *gin.Context) {
	var educationals []entity.Educational
	if err := entity.DB().Raw("SELECT * FROM educationals").Scan(&educationals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": educationals})
}

// GET /user/:id
// Get user by id
func GetEducational(c *gin.Context) {
	var educationals entity.Educational
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&educationals); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educational not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": educationals})
}

// PATCH /users
func UpdateEducational(c *gin.Context) {
	var educational entity.Educational
	if err := c.ShouldBindJSON(&educational); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", educational.ID).First(&educational); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educational not found"})
		return
	}

	if err := entity.DB().Save(&educational).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": educational})
}

// DELETE /users/:id
func DeleteEducational(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM educationals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educational not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}