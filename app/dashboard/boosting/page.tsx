import BoostingPage from "@/components/dashboard/boosting/boosting";

const Boosting = async () => {
  /*  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const userId = await auth().then((res) => res?.user?.id);
 */
  return (
    <div>
      <BoostingPage />
    </div>
  );
};

export default Boosting;

{
  /* <BoostingForm categories={categories} userId={userId} /> */
}
