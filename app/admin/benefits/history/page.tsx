import BenefitsHistory from "@/components/admin/benefits/benefitsHistory";
import { getAllBenefits } from "@/lib/data-layer/client/activePage";
import React from "react";

const Page = async () => {
  const AllBenefits = await getAllBenefits();

  return (
    <div>
      <BenefitsHistory benefits={AllBenefits} />
    </div>
  );
};

export default Page;
