-- CreateTable
CREATE TABLE "job_offers" (
    "id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "salary_range" JSONB NOT NULL,
    "posted_date" TIMESTAMP(3) NOT NULL,
    "provider" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "job_offers_pkey" PRIMARY KEY ("id")
);
