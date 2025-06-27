import Link from "next/link";

interface ProfileProps {
  user: {
    name: string;
  } | null;
}

const Profile = async ({ user }: ProfileProps) => {
  return (
    <div>
      {user ? (
        <Link href={`/dashboard`}>
          <div className="flex justify-center items-end gap-2">
            <span className="border p-1 px-3 font-medium hover:bg-slate-200 dark:hover:bg-slate-300 dark:hover:text-slate-800 rounded-lg">
              {" "}
              {user.name.split(" ")[0]}
            </span>
          </div>
        </Link>
      ) : (
        <Link href={`/login`}>Login</Link>
      )}
    </div>
  );
};

export default Profile;
