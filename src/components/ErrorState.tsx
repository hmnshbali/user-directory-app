import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <Card className="p-8 text-center bg-gradient-card shadow-card border-0 max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-destructive/10 rounded-full">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Oops! Something went wrong</h3>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
        
        <Button 
          onClick={onRetry}
          className="bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </Card>
  );
};