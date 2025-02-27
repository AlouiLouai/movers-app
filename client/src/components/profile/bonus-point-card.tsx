import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, TrendingUp, Award, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BonusPointsCardProps {
  points: number;
}

export function BonusPointsCard({ points }: BonusPointsCardProps) {
  // Calculate progress to next tier
  const nextTier = 1000;
  const progress = (points / nextTier) * 100;

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium text-gray-800 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          Bonus Points
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-3xl font-medium text-blue-600">{points}</span>
            <span className="ml-2 text-sm text-gray-500">points</span>
          </div>

          <div className="mt-4 mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Current</span>
              <span>Next tier: {nextTier}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-xs text-gray-500">
              Earn {nextTier - points} more points to reach Gold tier
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start p-3 rounded-lg bg-gray-50">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Recent activity</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Completed move: +250 points
                </p>
                <p className="text-xs text-gray-500">
                  Referral bonus: +100 points
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 rounded-lg bg-blue-50">
              <Gift className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Available rewards</h4>
                <p className="text-xs text-gray-500 mt-1">
                  $10 off your next move (500 points)
                </p>
                <p className="text-xs text-gray-500">
                  Free packing supplies (750 points)
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto"
          >
            View all rewards
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
