import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompanyCardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  industry: string;
  foundationYear: number;
  website: string | null;
}

function CompanyCard({
  id,
  name,
  imageUrl,
  industry,
  foundationYear,
  website,
}: CompanyCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 items-start">
        <CardTitle className="flex gap-4 items-center">
          {imageUrl ? (
            <Avatar>
              <AvatarImage
                src={imageUrl}
                alt="${company} url"
                width="18"
                height="18"
              />
            </Avatar>
          ) : (
            <div className="flex justify-center items-center text-xl size-18 bg-primary-foreground">
              {name.toUpperCase()[0]}
            </div>
          )}
          <span className="text-lg font-medium">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default CompanyCard;
