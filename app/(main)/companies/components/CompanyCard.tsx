import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface CompanyCardProps {
  id: string;
  name: string;
  imageUrl: string;
  industry: string;
  foundationYear: number;
  website: string;
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
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
    </Card>
  );
}

export default CompanyCard;
