BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "officers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"email"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "faculties" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "teachers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"email"	text,
	"faculty_id"	integer,
	CONSTRAINT "fk_faculties_teacher" FOREIGN KEY("faculty_id") REFERENCES "faculties"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "students" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"college_year"	integer,
	"gpax"	real,
	"owner_id"	integer,
	"faculty_id"	integer,
	"teacher_id"	integer,
	CONSTRAINT "fk_officers_students" FOREIGN KEY("owner_id") REFERENCES "officers"("id"),
	CONSTRAINT "fk_faculties_students" FOREIGN KEY("faculty_id") REFERENCES "faculties"("id"),
	CONSTRAINT "fk_teachers_students" FOREIGN KEY("teacher_id") REFERENCES "teachers"("id"),
	PRIMARY KEY("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_officers_email" ON "officers" (
	"email"
);
CREATE INDEX IF NOT EXISTS "idx_officers_deleted_at" ON "officers" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_faculties_deleted_at" ON "faculties" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_teachers_deleted_at" ON "teachers" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_students_deleted_at" ON "students" (
	"deleted_at"
);
COMMIT;
