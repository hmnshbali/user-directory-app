import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  filteredUsers: User[];
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  filteredUsers: [],
};



// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number = 1) => {
    const limit = 5; // Number of users per page
    const skip = (page - 1) * limit;
    const response = await axios.get(`https://dummyjson.com/users/?limit=${limit}&skip=${skip}`);
   return {
      data: response.data.users,
      page,
      total_pages: 2,
    };
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredUsers = state.users.filter(user => 
        user.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
        user.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
        user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.filteredUsers = state.searchTerm 
          ? action.payload.data.filter(user => 
              user.first_name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              user.last_name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setSelectedUser, setSearchTerm, clearError } = usersSlice.actions;
export default usersSlice.reducer;