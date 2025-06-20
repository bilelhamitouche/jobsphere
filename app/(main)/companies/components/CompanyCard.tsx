import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Factory, MapPin } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  industry: string;
  headquarters: string | null;
  count: number;
}

export default function CompanyCard({
  id,
  name,
  imageUrl,
  industry,
  headquarters,
  count,
}: CompanyCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 items-center">
        <CardTitle className="flex flex-col gap-2 items-center">
          {imageUrl ? (
            <Avatar>
              <AvatarImage
                src={imageUrl}
                alt="${company} url"
                width="20"
                height="20"
              />
            </Avatar>
          ) : (
            <div className="flex justify-center items-center text-2xl size-20 bg-primary-foreground">
              {name.toUpperCase()[0]}
            </div>
          )}
          <span className="text-xl font-medium">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-start">
        <div className="flex gap-2 items-center text-sm text-gray-700">
          <MapPin size="18" />
          <span>{headquarters}</span>
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-700">
          <Factory size="18" />
          <span>{industry}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-1 font-semibold">
          <span>{count}</span>
          <span>{`Job Offer${count === 1 ? "" : "s"}`}</span>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/companies/${id}`}>View company</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
