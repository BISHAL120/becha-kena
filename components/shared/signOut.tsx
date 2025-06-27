import { signOut } from "@/auth";

export default function SignOut({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        window.location.reload();
      }}
      className="w-[100px] h-full"
    >
      <button className={className} type="submit">
        Sign Out
      </button>
    </form>
  );
}
