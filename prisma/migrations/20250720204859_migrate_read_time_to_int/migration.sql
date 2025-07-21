/*
  Warnings:

  - You are about to drop the column `href` on the `Post` table. All the data in the column will be lost.
  - The `readTime` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "href",
DROP COLUMN "readTime",
ADD COLUMN     "readTime" INTEGER;
