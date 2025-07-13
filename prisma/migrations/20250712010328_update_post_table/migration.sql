/*
  Warnings:

  - You are about to drop the column `eventDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `eventTime` on the `Post` table. All the data in the column will be lost.
  - The `description` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "eventDate",
DROP COLUMN "eventTime",
ADD COLUMN     "eventEndDate" TIMESTAMP(3),
ADD COLUMN     "eventStartDate" TIMESTAMP(3),
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];
