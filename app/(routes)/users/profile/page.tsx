import { auth } from "@/auth";
import db from "@/prisma/db";
import { AllProducts } from "./components/AllProducts";
// import { HotProducts } from "./components/hotProducts";
import { ProfileInfo } from "./components/ProfileInfo";

const Profile = async () => {
  const session = await auth();
  const user = session?.user;

  const getUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      ratingCount: true,
      ratingTotal: true,
      bannerImage: true,
      image: true,
      emailVerified: true,
      shopName: true,
      name: true,
      role: true,
      createdAt: true,
      address: true,
      number: true,
    },
  });

  const allProducts = await db.product.findMany({
    where: {
      merchantId: user?.id,
    },
  });

  const productCount = await db.product.count({
    where: {
      merchantId: user?.id,
    },
  });

  const lastLogin = await db.session.findFirst({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userRating = (
    Number(getUser?.ratingTotal) / Number(getUser?.ratingCount)
  ).toFixed(1);

  return (
    <div>
      <ProfileInfo
        rating={userRating}
        ratingCount={getUser?.ratingCount}
        userData={getUser}
        productCount={productCount}
        lastLogin={lastLogin}
      />
      <div className=" py-8">
        <div className="w-full">
          <div className="space-y-8 w-full">
            {/* <HotProducts /> */}
            <AllProducts products={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
