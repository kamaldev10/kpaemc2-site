/*
  Warnings:

  - You are about to drop the column `eventEndDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `eventStartDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `readTime` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `registrationLink` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "eventEndDate",
DROP COLUMN "eventStartDate",
DROP COLUMN "location",
DROP COLUMN "price",
DROP COLUMN "readTime",
DROP COLUMN "registrationLink";
