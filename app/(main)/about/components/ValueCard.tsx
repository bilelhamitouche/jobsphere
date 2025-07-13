import { Card, CardContent } from "@/components/ui/card";

interface ValueCardProps {
  icon: React.ReactNode;
  value: string;
  description: string;
}

export default function ValueCard({ icon, value, description }: ValueCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 items-center">
        <div className="relative rounded-lg bg-violet-100 p-4">{icon}</div>
        <span className="font-bold text-lg">{value}</span>
        <p className="text-sm text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
