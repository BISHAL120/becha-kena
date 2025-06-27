import { User } from "@prisma/client";
import axios from "axios";
import { Bookmark, BookmarkCheckIcon, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DetailsButton = ({
  id,
  name,
  user,
  userId,
}: {
  id: string;
  name: string;
  user: User | null;
  userId: string | undefined;
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/products/${
        name.split(" ").join("-") + id
      }`
    );
    toast.success("Product Link Copied");
  };

  const router = useRouter();

  const handleSaveProduct = async () => {
    toast.loading("Saving...");
    try {
      await axios
        .patch("/api/user/saveProduct", {
          id: userId,
          saveId: id,
          type: "save",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Product Saved");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveProduct = async () => {
    toast.loading("Removing...");
    try {
      await axios
        .patch("/api/user/saveProduct", {
          id: userId,
          saveId: id,
          type: "remove",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Product Removed");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 px-2">
      <div
        className="rounded-md bg-gray-200 dark:bg-slate-700 dark:text-white h-9 md:h-10 px-3 py-2 cursor-pointer"
        onClick={() => onCopy()}
      >
        <Share2 className="md:w-6 w-5 md:h-6 h-5" />
      </div>

      <div className="rounded-md bg-gray-200 dark:bg-slate-700 dark:text-white h-9 md:h-10 px-3 py-2 cursor-pointer">
        {user?.saveProducts.includes(id) ? (
          <BookmarkCheckIcon
            onClick={() => handleRemoveProduct()}
            className="h-5 md:h-6 w-5 md:w-6"
          />
        ) : (
          <Bookmark
            onClick={() => handleSaveProduct()}
            className="h-5 md:h-6 w-5 md:w-6"
          />
        )}
      </div>
    </div>
  );
};

export default DetailsButton;
