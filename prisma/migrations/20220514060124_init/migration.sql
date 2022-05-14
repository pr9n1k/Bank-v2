-- CreateEnum
CREATE TYPE "TypeEncashment" AS ENUM ('ENCASHMENT', 'REINFORCEMENT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'RUB', 'EUR', 'UAH');

-- CreateEnum
CREATE TYPE "TypeOperation" AS ENUM ('EXPENSE', 'ARRIVAL');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MEN', 'WOOMEN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR', 'CASHIER');

-- CreateEnum
CREATE TYPE "LegalType" AS ENUM ('WATER', 'GAS', 'LIGHT', 'COMPANY');

-- CreateEnum
CREATE TYPE "DepartmentType" AS ENUM ('BANK', 'DEPARTMENT');

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "isWork" BOOLEAN NOT NULL DEFAULT true,
    "type" "DepartmentType" NOT NULL DEFAULT E'DEPARTMENT',

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT,
    "surname" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isWork" BOOLEAN NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT,
    "surname" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDay" INTEGER NOT NULL,
    "inn" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "flat" TEXT,
    "series" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "isSued" TEXT NOT NULL,
    "isSuedDate" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT,
    "surname" TEXT NOT NULL,
    "numberAccount" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "employeeId" INTEGER,
    "cashierId" INTEGER NOT NULL DEFAULT 0,
    "type" "TypeOperation" NOT NULL,
    "number" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL,
    "inn" TEXT NOT NULL,
    "isConfirm" BOOLEAN NOT NULL,
    "purpose" TEXT NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT,
    "surname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "flat" TEXT,
    "departmentId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Communal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunalData" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "communalType" "LegalType" NOT NULL,
    "startData" INTEGER,
    "endData" INTEGER,
    "startCounter" INTEGER,
    "endCounter" INTEGER,
    "money" DOUBLE PRECISION NOT NULL,
    "communalId" INTEGER NOT NULL,

    CONSTRAINT "CommunalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Individual" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "inn" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "LegalType" NOT NULL,

    CONSTRAINT "Legal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountDepartment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "AccountDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encashment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "operatorId" INTEGER NOT NULL,
    "cashierId" INTEGER DEFAULT 0,
    "isAdmin" BOOLEAN NOT NULL,
    "isCashier" BOOLEAN NOT NULL,
    "type" "TypeEncashment" NOT NULL,

    CONSTRAINT "Encashment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValueEncashment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "encashmentId" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ValueEncashment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_number_key" ON "Department"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_login_key" ON "Employee"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Client_inn_key" ON "Client"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Operation_number_key" ON "Operation"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Communal_number_key" ON "Communal"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Individual_number_key" ON "Individual"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Legal_inn_key" ON "Legal"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Legal_number_key" ON "Legal"("number");

-- CreateIndex
CREATE UNIQUE INDEX "AccountDepartment_number_key" ON "AccountDepartment"("number");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communal" ADD CONSTRAINT "Communal_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communal" ADD CONSTRAINT "Communal_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunalData" ADD CONSTRAINT "CommunalData_communalId_fkey" FOREIGN KEY ("communalId") REFERENCES "Communal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Individual" ADD CONSTRAINT "Individual_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legal" ADD CONSTRAINT "Legal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountDepartment" ADD CONSTRAINT "AccountDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encashment" ADD CONSTRAINT "Encashment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encashment" ADD CONSTRAINT "Encashment_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueEncashment" ADD CONSTRAINT "ValueEncashment_encashmentId_fkey" FOREIGN KEY ("encashmentId") REFERENCES "Encashment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
