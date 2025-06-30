import React from "react";

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  return <div>Dashboard{userId}</div>;
};

export default Dashboard;
