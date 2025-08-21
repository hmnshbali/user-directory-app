import { User } from '@/store/slices/usersSlice';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

export const UserCard = ({ user, onSelect }: UserCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card shadow-card hover:shadow-card-hover transition-smooth cursor-pointer border-0">
      <div className="p-6 text-center" onClick={() => onSelect(user)}>
        <div className="relative mb-4">
          <Avatar className="h-20 w-20 mx-auto ring-2 ring-primary/20 group-hover:ring-primary/40 transition-smooth">
            <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
              {user.firstName}{user.lastName}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -inset-1 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-20 transition-smooth -z-10" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
          {user.firstName} {user.lastName}
        </h3>
        
        <div className="flex items-center justify-center text-muted-foreground mb-4 group-hover:text-foreground transition-smooth">
          <Mail className="h-4 w-4 mr-2" />
          <span className="text-sm">{user.email}</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth"
        >
          <UserIcon className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );
};