-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
