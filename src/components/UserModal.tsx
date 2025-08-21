import { User } from '@/store/slices/usersSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, User as UserIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card shadow-modal border-0">
        <DialogHeader className="text-center pb-4">
          <div className="relative mx-auto mb-4">
            <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/20">
              <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-bold">
                {user.firstName}{user.lastName}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -inset-1 bg-gradient-primary rounded-full opacity-10 -z-10" />
          </div>
          
          <DialogTitle className="text-2xl font-bold text-foreground">
            {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <UserIcon className="h-4 w-4 mr-2" />
              User ID: {user.id}
            </Badge>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-accent-foreground">Contact Information</h4>
            <div className="flex items-center text-muted-foreground">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Profile Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">First Name:</span>
                <p className="font-medium text-foreground">{user.firstName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Name:</span>
                <p className="font-medium text-foreground">{user.lastName}</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onClose} 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            Close Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};