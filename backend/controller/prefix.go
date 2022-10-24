//Teacher ของเพื่อน
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khunjira2544/sa-65-project/entity"
)

func CreatePrefix(c *gin.Context) {
	var prefix entity.Prefix
	if err := c.ShouldBindJSON(&prefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": prefix})
}

// GET /users
// List all users
func ListPrefix(c *gin.Context) {
	var prefixs []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM prefixes").Scan(&prefixs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefixs})
}

// GET /user/:id
// Get user by id
func GetPrefix(c *gin.Context) {
	var prefix entity.Prefix
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefix})
}

// PATCH /users
func UpdatePrefix(c *gin.Context) {
	var prefix entity.Prefix
	if err := c.ShouldBindJSON(&prefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prefix.ID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefixes not found"})
		return
	}

	if err := entity.DB().Save(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefix})
}

// DELETE /users/:id
func DeletePrefix(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prefixes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}