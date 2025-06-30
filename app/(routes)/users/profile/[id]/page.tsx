import ProfileDetails from "@/components/client/profile/profileDetails";
import { getUserDetailsById } from "@/lib/data-layer/client/DataLayer";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let userDetails;

  try {
    userDetails = await getUserDetailsById(id);
  } catch (error) {
    console.log(error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md w-full">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg
              className="w-full h-full text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 21h-11a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 016.5 3h11a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z" />
              <circle cx="12" cy="8.5" r="2.5" />
              <path d="M15 14.5c1.66 0 3 1.34 3 3V20h-3M9 14.5c-1.66 0-3 1.34-3 3V20h3M12 11v9" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="animate-bounce">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t find the profile you&apos;re looking for. The user
            may have been deleted or is not available.
          </p>
          <div className="space-x-4">
            <Link
              href={"/"}
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 text-white rounded-2xl"
            >
              <Link href="/">Home</Link>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md w-full">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg
              className="w-full h-full text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 21h-11a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 016.5 3h11a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z" />
              <circle cx="12" cy="8.5" r="2.5" />
              <path d="M15 14.5c1.66 0 3 1.34 3 3V20h-3M9 14.5c-1.66 0-3 1.34-3 3V20h3M12 11v9" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="animate-bounce">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t find the profile you&apos;re looking for. The user
            may have been deleted or is not available.
          </p>
          <div className="space-x-4">
            {/*  <Link
              href={"/"}
              className="hover:bg-gray-100 transition-colors"
            >
              Go Back
            </Link> */}
            <Link
              href={"/"}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Link href="/">Home</Link>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProfileDetails userData={userDetails} />
    </div>
  );
};

export default Page;
