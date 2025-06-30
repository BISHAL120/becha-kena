import db from "@/prisma/db"

export const getProductCount = async (id: string) => {
    const result = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            productCount: true
        }
    })

    return result?.productCount
}