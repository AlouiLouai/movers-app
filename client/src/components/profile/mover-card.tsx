"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Edit, User, MapPin } from "lucide-react";
import { useAuth } from "@/lib/context/authContext";

interface MoverCardProps {
  mover: {
    name: string;
    email: string;
    avatar?: string | undefined;
  };
}

export function MoverCard({ mover }: MoverCardProps) {
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mover.name);
  const [avatar, setAvatar] = useState(mover.avatar || "");

  const handleSave = async () => {
    await updateProfile({ name, avatar });
    setIsEditing(false);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-t-lg">
        <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
          <AvatarImage src={mover.avatar} alt={mover.name} />
          <AvatarFallback className="text-xl">{mover.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-semibold border-blue-300 focus:border-blue-500"
            />
          ) : (
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              {mover.name}
            </CardTitle>
          )}
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <Mail className="h-4 w-4 text-gray-500" />
            {mover.email}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="avatar"
                className="text-sm font-medium text-gray-700"
              >
                Avatar URL
              </Label>
              <Input
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter avatar URL"
                className="mt-1 border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-sm text-gray-600">Mover since: January 2023</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Verified Mover
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Top Rated
              </Badge>
            </div>
            <p className="text-sm text-gray-500 italic">
              Ready to help with your next move!
            </p>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
