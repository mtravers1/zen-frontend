const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("admin", 12);

	const admin = await prisma.user.upsert({
		where: { email: "admin@zentavos.com" },
		update: { role: "ADMIN", password: hashedPassword, name: "Admin" },
		create: {
			name: "Admin",
			email: "admin@zentavos.com",
			password: hashedPassword,
			role: "ADMIN",
		},
	});

	console.log("✓ Admin user ready:");
	console.log("  Email:    admin@zentavos.com");
	console.log("  Password: admin");
	console.log("  Role:     ADMIN");
	console.log("  ID:       " + admin.id);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
