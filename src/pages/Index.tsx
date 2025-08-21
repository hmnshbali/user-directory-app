import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchUsers, setSelectedUser, setSearchTerm } from '@/store/slices/usersSlice';
import { UserCard } from '@/components/UserCard';
import { UserModal } from '@/components/UserModal';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { Users, Sparkles } from 'lucide-react';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    users, 
    filteredUsers, 
    selectedUser, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    searchTerm 
  } = useSelector((state: RootState) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handleUserSelect = (user: any) => {
    dispatch(setSelectedUser(user));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedUser(null));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchUsers(page));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleRetry = () => {
    dispatch(fetchUsers(currentPage));
  };

  const displayUsers = searchTerm ? filteredUsers : users;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-primary py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Users className="h-8 w-8 text-primary-foreground" />
              <Sparkles className="h-6 w-6 text-primary-foreground animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            User Directory
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Discover and connect with our amazing community members
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          {searchTerm && (
            <p className="text-center text-muted-foreground mt-4">
              {displayUsers.length} user{displayUsers.length !== 1 ? 's' : ''} found for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Content Area */}
        {error ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingGrid />
        ) : displayUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms.' : 'No users available at the moment.'}
            </p>
          </div>
        ) : (
          <>
            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {displayUsers.map((user) => (
                <UserCard key={user.id} user={user} onSelect={handleUserSelect} />
              ))}
            </div>

            {/* Pagination - Only show if not searching */}
            {!searchTerm && totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* User Modal */}
      <UserModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Index;