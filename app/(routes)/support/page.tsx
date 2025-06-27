import SupportCard from "@/components/client/support/supportCard";
import db from "@/prisma/db";

const Support = async () => {
  const SupportMembers = await db.user.findMany({
    where: {
      supportMember: true,
    },
    select: {
      image: true,
      name: true,
      number: true,
      address: true,
    },
  });

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center mx-auto">
        {SupportMembers.map((member, index) => (
          <SupportCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Support;
