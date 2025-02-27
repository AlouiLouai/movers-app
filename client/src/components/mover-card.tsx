import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { Star } from "lucide-react";

interface MoverCardProps {
  mover: {
    name: string;
    email: string;
    avatar?: string | undefined;
    // rating: number;
    // completedMoves: number;
  };
}

export function MoverCard({ mover }: MoverCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mover.avatar} alt={mover.name} />
          <AvatarFallback>{mover.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{mover.name}</h3>
          {/* <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-500">
              {mover.rating.toFixed(1)}
            </span>
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        {/* <p className="text-sm text-gray-500">
          {mover.completedMoves} moves completed
        </p> */}
      </CardContent>
    </Card>
  );
}
