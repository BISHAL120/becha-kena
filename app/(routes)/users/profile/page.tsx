import { auth } from "@/auth";
import db from "@/prisma/db";
import { AllProducts } from "./components/AllProducts";
// import { HotProducts } from "./components/hotProducts";
import ProfilePage from "@/components/client/profile/profileDetails";

const Profile = async () => {
  const session = await auth();
  const user = session?.user;

  const getUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    omit: {
      password: true,
    },
  });

  const allProducts = await db.product.findMany({
    where: {
      merchantId: user?.id,
    },
  });

  return (
    <div>
      <ProfilePage userData={getUser} />
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
