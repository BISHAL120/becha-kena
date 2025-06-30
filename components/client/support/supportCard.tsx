import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";

interface Props {
  number: string | null;
  name: string;
  address: string | null;
  image: string | null;
}
const SupportCard = ({ member }: { member: Props }) => {
  return (
    <div>
      <Card className="max-w-[500px]">
        <CardContent>
          <CardHeader className="p-3 px-0">
            <div className="flex items-center gap-3">
              <Image
                src={member.image ? member.image : "/demoImage/placeholder.svg"}
                alt=""
                width={50}
                height={50}
                quality={95}
                className="w-16 h-16 rounded-full overflow-hidden object-cover"
              />
              <h1 className="text-3xl">{member.name}</h1>
            </div>
          </CardHeader>
          <CardDescription className="text-base space-y-1">
            <div>
              Contact Number:{" "}
              <Link
                className="text-blue-600"
                href={`https://wa.me/${member.number}`}
              >
                {member.number}
              </Link>
            </div>
            <div>Address: {member.address}</div>
            <Link href={`/users/profile`}>
              <Button className="mt-5">Visit Profile</Button>
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCard;
