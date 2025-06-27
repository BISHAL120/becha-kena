import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold py-8">Users Navigation</h1>
      <div className="py-10 flex items-center gap-3">
        <Link
          href={"/admin/users/all"}
          className="text-base font-semibold p-6 ring rounded-md"
        >
          All Users
        </Link>
        <Link
          href={"/admin/users/inActive"}
          className="text-base font-semibold p-6 ring rounded-md"
        >
          In Active USers
        </Link>
        <Link
          href={"/admin/users/merchants"}
          className="text-base font-semibold p-6 ring rounded-md"
        >
          Merchants
        </Link>
      </div>
    </div>
  );
};

export default Users;
