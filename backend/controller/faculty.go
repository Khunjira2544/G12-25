package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /resolutions   ของเรา faculty Faculty
func CreateFaculty(c *gin.Context) {
	var faculty entity.Faculty
	if err := c.ShouldBindJSON(&faculty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&faculty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": faculty})
}

// GET /resolution/:id     ของเรา faculty Faculty
func GetFaculty(c *gin.Context) {
	var faculty entity.Faculty
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&faculty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "faculty not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": faculty})
}

// GET /resolutions      ของเรา faculty Faculty
func ListFacultys(c *gin.Context) {
	var facultys []entity.Faculty
	if err := entity.DB().Raw("SELECT * FROM faculties").Scan(&facultys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": facultys})
}

// DELETE /resolutions/:id   ของเรา faculty Faculty
func DeleteFaculty(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM faculties WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "faculty not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /resolutions     ของเรา faculty Faculty
func UpdateFaculty(c *gin.Context) {
	var faculty entity.Faculty
	if err := c.ShouldBindJSON(&faculty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", faculty.ID).First(&faculty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "faculty not found"})
		return
	}

	if err := entity.DB().Save(&faculty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": faculty})
}
