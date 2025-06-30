import { auth } from "@/auth";
import { MerchantCard } from "@/components/client/merchant-of-bangladesh/merchantCard";
import MerchantFilters from "@/components/client/merchant-of-bangladesh/merchantFilter";
import db from "@/prisma/db";

const Merchants = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    per_page: string;
    search: string;
    category: string;
  }>;
}) => {
  const searchParamsValues = await searchParams;
  const { page = "1", per_page = "10", category = "all" } = searchParamsValues;

  const categories = await db.category.findMany();

  const categoryName = categories.find((c) => c.id === category)?.name || "all";

  const merchants = await db.user.findMany({
    where: {
      role: {
        has: "MERCHANT",
      },
      businessCategory: category !== "all" ? categoryName : undefined,
    },
    select: {
      number: true,
      name: true,
      id: true,
      address: true,
      ratingCount: true,
      ratingTotal: true,
      image: true,
      bannerImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const count = await db.user.count({
    where: {
      role: {
        has: "MERCHANT",
      },
    },
  });
  const userId = await auth().then((res) => {
    return res?.user.id;
  });
  let currentUser: {
    id: string;
    saveMerchant: string[];
    isActive: boolean;
    idDeactivationDate: Date;
  } | null = null;

  if (userId) {
    currentUser = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        saveMerchant: true,
        isActive: true,
        idDeactivationDate: true,
      },
    });
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          {/* <h1 className="text-3xl font-bold mb-6">Our Merchants</h1> */}
          <MerchantFilters
            page={page}
            per_page={per_page}
            total={count}
            allCategories={categories}
            category={category}
          />
        </div>

        {merchants?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {merchants?.map((merchant, idx) => (
              <MerchantCard
                key={idx}
                merchant={merchant}
                current={currentUser}
              />
            ))}
          </div>
        ) : (
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center w-full text-muted-foreground items-center text-2xl font-bold">
              No Merchants Found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Merchants;
