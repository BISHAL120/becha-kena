import db from "@/prisma/db";

export const getUserById = async (id: string) => {
    const result = await db.user.findUnique({
        where: { id: id },
        select: { id: true, name: true, email: true, number: true },
    });

    return result
}
export const getUserDetailsById = async (id: string) => {
    const result = await db.user.findUnique({
        where: { id: id },
        omit: { password: true },
    });

    return result
}