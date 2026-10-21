import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { fetchUsers } from '../api/usersApi';
import { UserCard } from './UserCard';

export const ManualUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchUsers()
      .then((data) => {
        if (isMounted) {
          setUsers(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Lỗi tải dữ liệu');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="state-container">
        <Loader2 size={24} className="spinner" />
        <span>Đang tải danh sách người dùng...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container state-error">
        <AlertCircle size={24} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
