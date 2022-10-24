package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /resolutions   //ของเราคือ collegeyear  Collegeyear
func CreateCollegeyear(c *gin.Context) {
	var collegeyear entity.Collegeyear
	if err := c.ShouldBindJSON(&collegeyear); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&collegeyear).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": collegeyear})
}

// GET /resolution/:id     //ของเราคือ collegeyear  Collegeyear
func GetCollegeyear(c *gin.Context) {
	var collegeyear entity.Collegeyear
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&collegeyear); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collegeyear not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": collegeyear})
}

// GET /resolutions      //ของเราคือ collegeyear  Collegeyear
func ListCollegeyears(c *gin.Context) {
	var collegeyears []entity.Faculty
	if err := entity.DB().Raw("SELECT * FROM collegeyears").Scan(&collegeyears).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": collegeyears})
}

// DELETE /resolutions/:id   //ของเราคือ collegeyear  Collegeyear
func DeleteCollegeyear(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM collegeyears WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collegeyear not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /resolutions     //ของเราคือ collegeyear  Collegeyear
func UpdateCollegeyear(c *gin.Context) {
	var collegeyear entity.Collegeyear
	if err := c.ShouldBindJSON(&collegeyear); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", collegeyear.ID).First(&collegeyear); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collegeyear not found"})
		return
	}

	if err := entity.DB().Save(&collegeyear).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": collegeyear})
}
