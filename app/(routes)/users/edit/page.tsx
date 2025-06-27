import { auth } from "@/auth";
import EditProfile from "@/components/client/profile/editProfile";
import db from "@/prisma/db";

const Edit = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div>
      <EditProfile initialData={user} Categories={categories} />
    </div>
  );
};

export default Edit;
