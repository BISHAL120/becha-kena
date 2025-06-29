import db from "@/prisma/db"

export const getAllBenefits = async () => {
    const result = await db.benefits.findMany({
        orderBy: {
            createdAt: "desc"
        },

    })

    return result
}

export const GetIdActivationSettings = async () => {
    const result = await db.idActiveSettings.findFirst({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            price: true
        }
    });

    return result
}