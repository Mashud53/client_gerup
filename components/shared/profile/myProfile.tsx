"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  profile: {
    profilePhoto: string | null;
  };
}

interface ProfilePageProps {
  profileData: ProfileData;
}

const MyProfile = ({ profileData }: ProfilePageProps) => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-28 w-28">
            {profileData.profile.profilePhoto ? (
              <AvatarImage
                src={profileData.profile.profilePhoto}
                alt={profileData.name}
              />
            ) : (
              <AvatarFallback className="text-3xl">
                {profileData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <CardTitle className="text-2xl">{profileData.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{profileData.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium break-all">{profileData.email}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{profileData.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;