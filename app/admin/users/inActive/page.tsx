import { InActiveUserTable } from "@/components/client/users/inActiveUserTable";
import db from "@/prisma/db";

const InActiveUSers = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    per_page: string;
    search: string;
  }>;
}) => {
  const searchParamsValues = await searchParams;
  const { page = "1", per_page = "10", search } = searchParamsValues;
  const users = await db.user.findMany({
    where: {
      number: {
        contains: search,
      },
      role: {
        has: "USER",
      },
      isActive: false,
    },
    select: {
      id: true,
      image: true,
      name: true,
      number: true,
      createdAt: true,
      role: true,
      isActive: true,
      division: true,
      productCount: true,
      supportMember: true,
    },
    orderBy: { createdAt: "desc" },
    take: Number(per_page),
    skip: (Number(page) - 1) * Number(per_page),
  });
  const count = await db.user.count({
    where: {
      isActive: false,
    },
  });

  return (
    <div>
      <div className="bg-red-600 text-white mt-5 text-center py-4 px-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">In-Active Users List</h1>
      </div>
      <InActiveUserTable
        users={users}
        count={count}
        page={page}
        per_page={per_page}
      />
    </div>
  );
};

export default InActiveUSers;
