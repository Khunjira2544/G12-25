package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"

	"github.com/gin-gonic/gin"
)

func CreatePayment(c *gin.Context) {

	var payment entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&payment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payment})

}

// GET /user/:id

func GetPayment(c *gin.Context) {

	var payment entity.Payment

	id := c.Param("payment_id")

	if err := entity.DB().Raw("SELECT * FROM payments WHERE payment_id = ?", id).Scan(&payment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payment})

}

// GET /users

func ListPayments(c *gin.Context) {

	var payments []entity.Payment

	if err := entity.DB().Raw("SELECT * FROM payments").Scan(&payments).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payments})

}

// Get previous income id
// GET /previous_income
//func GetPreviousBill(c *gin.Context) {
//var bill entity.Bill
//if err := entity.DB().Last(&bill).Error; err != nil {
//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//return
//}

//c.JSON(http.StatusOK, gin.H{"data": bill})
//}
