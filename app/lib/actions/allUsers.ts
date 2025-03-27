"use server"
import prisma from "../prisma";

export async function allUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
