const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Create Departments
  const hr = await prisma.department.create({
    data: { name: "Human Resources" },
  });
  const eng = await prisma.department.create({ data: { name: "Engineering" } });
  const sales = await prisma.department.create({ data: { name: "Sales" } });

  // 2. Create Designations
  const manager = await prisma.designation.create({
    data: { title: "Manager" },
  });
  const developer = await prisma.designation.create({
    data: { title: "Software Developer" },
  });
  const executive = await prisma.designation.create({
    data: { title: "Sales Executive" },
  });

  // 3. Create a manager-level employee first (so others can reference them)
  const johnManager = await prisma.employee.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      departmentId: eng.id,
      designationId: manager.id,
      salary: 90000,
      dateOfJoining: new Date("2020-01-15"),
      status: "active",
    },
  });

  // 4. Create employees who report to John
  await prisma.employee.create({
    data: {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@company.com",
      departmentId: eng.id,
      designationId: developer.id,
      managerId: johnManager.id,
      salary: 65000,
      dateOfJoining: new Date("2021-03-10"),
      status: "active",
    },
  });

  await prisma.employee.create({
    data: {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@company.com",
      departmentId: eng.id,
      designationId: developer.id,
      managerId: johnManager.id,
      salary: 62000,
      dateOfJoining: new Date("2022-06-01"),
      status: "active",
    },
  });

  await prisma.employee.create({
    data: {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@company.com",
      departmentId: sales.id,
      designationId: executive.id,
      salary: 55000,
      dateOfJoining: new Date("2023-02-20"),
      status: "active",
    },
  });

  await prisma.employee.create({
    data: {
      firstName: "Ramesh",
      lastName: "Khadka",
      email: "ramesh.khadka@company.com",
      departmentId: hr.id,
      designationId: manager.id,
      salary: 70000,
      dateOfJoining: new Date("2019-11-05"),
      status: "active",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
