import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle } from 'lucide-react';
import { fetchUsers } from '../api/usersApi';
import { UserCard } from './UserCard';

export const QueryUserList = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="state-container">
        <Loader2 size={24} className="spinner" />
        <span>Đang tải danh sách người dùng...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="state-container state-error">
        <AlertCircle size={24} />
        <span>{error?.message || 'Lỗi tải dữ liệu'}</span>
      </div>
    );
  }

  return (
    <div>
      {isFetching && !isLoading && (
        <div className="background-fetching-bar">
          <Loader2 size={14} className="spinner" />
          <span>Đang làm mới dữ liệu ngầm...</span>
        </div>
      )}

      <div className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
