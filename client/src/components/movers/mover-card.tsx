"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Edit, User, MapPin, Phone, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoverCardDisplayProps } from "@/lib/interfaces/Mover";

export function MoverCardDisplay({ mover }: MoverCardDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-t-lg">
        <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
          <AvatarImage src={mover.avatar} alt={mover.name} />
          <AvatarFallback className="text-xl">{mover.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            {mover.name}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <Mail className="h-4 w-4 text-gray-500" />
            {mover.email}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">Mover since: January 2023</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verified Mover
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Top Rated
            </Badge>
          </div>
          <p className="text-sm text-gray-500 italic">
            Ready to help with your next move!
          </p>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
                Display Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {mover.name}'s Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mover.avatar} alt={mover.name} />
                    <AvatarFallback className="text-2xl">
                      {mover.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{mover.name}</h3>
                    <p className="text-sm text-gray-600">{mover.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <p className="text-sm">
                      {mover.phone || "Phone not provided"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <p className="text-sm">
                      {mover.location || "Location not specified"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <p className="text-sm">Mover since: January 2023</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Verified Mover
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      Top Rated
                    </Badge>
                    {mover.rating && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        {mover.rating} ★
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-gray-600">
                    {mover.bio ||
                      "Experienced mover ready to assist with all your relocation needs!"}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}