package main

import (
	"github.com/Khunjira2544/sa-65-project/controller"
	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/Khunjira2544/sa-65-project/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// User Routes   //ของเอา Officer officer
			router.GET("/officers", controller.ListOfficers)
			router.GET("/officer/:id", controller.GetOfficer)
			router.PATCH("/officers", controller.UpdateOfficer)
			router.DELETE("/officers/:id", controller.DeleteOfficer)

			// Resolution Routes   //ของเราคือ collegeyear  Collegeyear
			router.GET("/collegeyear", controller.ListCollegeyears)
			router.GET("/collegeyear/:id", controller.GetCollegeyear)
			router.POST("/collegeyear", controller.CreateCollegeyear)
			router.PATCH("/collegeyear", controller.UpdateCollegeyear)
			router.DELETE("/collegeyear/:id", controller.DeleteCollegeyear)

			// ของเรา faculty Faculty
			router.GET("/facultys", controller.ListFacultys)
			router.GET("/faculty/:id", controller.GetFaculty)
			router.POST("/facultys", controller.CreateFaculty)
			router.PATCH("/facultys", controller.UpdateFaculty)
			router.DELETE("/faculty/:id", controller.DeleteFaculty)

			// Video Routes  //ของเรา teacher  Teacher
			router.GET("/teachers", controller.ListTeachers)
			//router.GET("/faculty/:faculty_id", controller.ListT_Facultys)
			router.GET("/teacher/:id", controller.GetTeacher)
			router.POST("/teachers", controller.CreateTeacher)
			router.PATCH("/teachers", controller.UpdateTeacher)
			router.DELETE("/teachers/:id", controller.DeleteTeacher)

			// WatchVideo Routes   //ของเรา Student student
			router.GET("/students", controller.ListStudent)
			router.GET("/students/:id", controller.GetStudent)
			router.POST("/students/create", controller.CreateStudent) ///create pass token-----------------------------------------
			router.PATCH("/students", controller.UpdateStudent)
			router.DELETE("/student/:id", controller.DeleteStudent)

			//Subject
			// Time Routes
			router.GET("/times", controller.ListTimes) // ("path", cotroller)
			router.GET("/time/:id", controller.GetTime)
			router.POST("/times", controller.CreateTime)
			router.PATCH("/times", controller.UpdateTime)
			router.DELETE("/times/:id", controller.DeleteTime)
			// Subject Routes
			router.GET("/subjects", controller.ListSubject) // ("path", cotroller)
			router.GET("/subject/:id", controller.GetSubject)
			router.POST("/subjects", controller.CreateSubject)
			router.PATCH("/subjects", controller.UpdateSubject)
			router.DELETE("/subjects/:id", controller.DeleteSubject)
			//Subjectสุดแค่นี้

			//bill
			router.GET("/bills", controller.ListBills)
			router.GET("/bill/:bill_id", controller.GetBill)
			router.POST("/bills", controller.CreateBill)
			router.GET("/previous_bill", controller.GetPreviousBill)

			router.GET("/payments", controller.ListPayments)
			router.GET("/payment/:payment_id", controller.GetPayment)
			router.POST("/payments", controller.CreatePayment)
			//billสุดแค่ตรงนี้

			//Teacher ของเพื่อน
			//education
			router.GET("/educationnals", controller.ListEducational)
			router.GET("/educationnals/:id", controller.GetEducational)
			router.POST("/educationnals", controller.CreateEducational)
			router.PATCH("/educationnals", controller.UpdateEducational)
			router.DELETE("/educationnals/:id", controller.DeleteEducational)

			//Prefix
			router.GET("/prefixes", controller.ListPrefix)
			router.GET("/prefixes/:id", controller.GetPrefix)
			router.POST("/prefixes", controller.CreatePrefix)
			router.PATCH("/prefixes", controller.UpdatePrefix)
			router.DELETE("/prefixes/:id", controller.DeletePrefix)
			//Teacher ของเพื่อน สุดแคนี้

			//ประเมิณอาจารย์ของเพื่อน
			// Teacher_assessment
			router.GET("/Teacher_assessments", controller.ListTeacher_assessment)
			router.GET("/Teacher_assessment/:id", controller.GetTeacher_assessment)
			router.POST("/Teacher_assessments", controller.CreateTeacher_assessment)
			router.PATCH("/Teacher_assessments", controller.UpdateTeacher_assessment)
			router.DELETE("/Teacher_assessments/:id", controller.DeleteTeacher_assessment)
			//Teaching_duration
			router.GET("/Teaching_durations", controller.ListTeaching_duration)
			router.GET("/Teaching_duration/:id", controller.GetTeaching_duration)
			router.POST("/Teaching_duration", controller.CreateTeaching_duration)
			router.PATCH("/Teaching_duration", controller.UpdateTeaching_duration)
			router.DELETE("/Teaching_duration/:id", controller.DeleteTeaching_duration)
			//Content_difficulty_level
			router.GET("/Content_difficulty_levels", controller.ListContent_difficulty_level)
			router.GET("/Content_difficulty_level/:id", controller.GetContent_difficulty_level)
			router.POST("/Content_difficulty_level", controller.CreateContent_difficulty_level)
			router.PATCH("/Content_difficulty_level", controller.UpdateContent_difficulty_level)
			router.DELETE("/Content_difficulty_level/:id", controller.DeleteContent_difficulty_level)
			//Content_quality
			router.GET("/Content_qualitys", controller.ListContent_quality)
			router.GET("/Content_quality/:id", controller.GetContent_quality)
			router.POST("/Content_quality", controller.CreateContent_quality)
			router.PATCH("/Content_quality", controller.UpdateContent_quality)
			router.DELETE("/Content_quality/:id", controller.DeleteContent_quality)
			//ประเมิณอาจารย์ของเพื่อน สุดแค่นี้

		}
	}
	
	//Register
	r.GET("/states", controller.ListState)
	r.GET("/states/:id", controller.GetState)
	r.PATCH("/states", controller.UpdateState)
	r.DELETE("/states/:id", controller.DeleteState)

	//Registration Routes

	r.GET("/registrations", controller.ListRegistration)
	r.GET("/registrations/:id", controller.GetRegistration)
	r.POST("/registrations", controller.CreateRegistration)
	r.PATCH("/registrations", controller.UpdateRegistration)
	r.DELETE("/registrations/:id", controller.DeleteRegistration)

	// Signup User Route
	r.POST("/signup", controller.CreateOfficer)
	// login User Route
	r.POST("/login", controller.Login)
	// student login
	r.POST("/login_s", controller.Login_s)

	// Run the server go run main.go
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
