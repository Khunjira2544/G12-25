package controller

import (
	"github.com/Khunjira2544/sa-65-project/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /State

// func CreateState(c *gin.Context) {

// 	var State entity.State
// 	if err := c.ShouldBindJSON(&State); err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		return

// 	}

// 	if err := entity.DB().Create(&State).Error; err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		return

// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": State})

// }

// GET /Teacher/:id

func GetState(c *gin.Context) {

	var State entity.State

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM states WHERE id = ?", id).Scan(&State).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": State})

}

// GET /Status

func ListState(c *gin.Context) {

	var States []entity.State

	if err := entity.DB().Raw("SELECT * FROM states").Scan(&States).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": States})

}

// DELETE /Teacher/:id

func DeleteState(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM states WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Status

func UpdateState(c *gin.Context) {

	var State entity.State

	if err := c.ShouldBindJSON(&State); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", State.ID).First(&State); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&State).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": State})

}
