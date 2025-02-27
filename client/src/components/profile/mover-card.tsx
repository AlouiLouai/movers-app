"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context/authContext";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mover.name);
  const [avatar, setAvatar] = useState(mover.avatar || "");

  const handleSave = async () => {
    await updateProfile({ name, avatar });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mover.avatar} alt={mover.name} />
          <AvatarFallback>{mover.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-semibold"
            />
          ) : (
            <h3 className="text-lg font-semibold">{mover.name}</h3>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Avatar URL"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
