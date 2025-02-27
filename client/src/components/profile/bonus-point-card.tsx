import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gift,
  TrendingUp,
  Award,
  ArrowRight,
  Calendar,
  Package,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BonusPointsCardProps {
  points: number;
}

export function BonusPointsCard({ points }: BonusPointsCardProps) {
  const nextTier = 1000;
  const progress = (points / nextTier) * 100;
  const tierName = points >= nextTier ? "Gold" : "Silver";

  return (
    <Card className="border-0 shadow-md h-full bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center">
          <Award className="h-6 w-6 mr-2 text-blue-600" />
          Bonus Points
          <Badge className="ml-3 bg-yellow-100 text-yellow-800">
            {tierName} Tier
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-500">Track your perks and rewards</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-blue-600">{points}</span>
          <span className="text-lg text-gray-600">points</span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Current: {points}</span>
            <span className="text-gray-600">Next tier: {nextTier}</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
          <p className="mt-2 text-sm text-gray-600">
            {nextTier - points} points to{" "}
            {points >= nextTier ? "Platinum" : "Gold"} tier
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start p-4 rounded-lg bg-gray-100 shadow-sm">
            <TrendingUp className="h-6 w-6 text-green-600 mt-1 mr-3" />
            <div>
              <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Activity
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Completed move: +250 points (Feb 25)
              </p>
              <p className="text-sm text-gray-600">
                Referral bonus: +100 points (Feb 20)
              </p>
              <p className="text-sm text-gray-600">
                Customer review: +50 points (Feb 18)
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 rounded-lg bg-blue-100 shadow-sm">
            <Gift className="h-6 w-6 text-blue-600 mt-1 mr-3" />
            <div>
              <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Available Rewards
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                $10 off next move (500 points)
              </p>
              <p className="text-sm text-gray-600">
                Free packing supplies (750 points)
              </p>
              <p className="text-sm text-gray-600">
                Priority booking (900 points)
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          View All Rewards
          <ArrowRight className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
