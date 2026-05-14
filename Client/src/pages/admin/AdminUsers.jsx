import React, { useEffect, useState } from "react";
import { Edit2, Ban, ShieldCheck, Users } from "lucide-react";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { banUnBanUser, getAllUsers } from "../../features/admin/adminSlice";
import UserAvatar from "../../components/UserAvatar";
import { Link } from "react-router-dom";

const initialUsers = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
  avatar: `https://i.pravatar.cc/150?u=${i + 10}`,
  role: i === 0 ? "Admin" : "User",
  status: i % 3 === 0 ? "Blocked" : "Active",
}));

export default function AdminUsers() {
  const { users, adminLoading, adminError, adminErrorMessage } = useSelector(
    (state) => state.admin,
  );
  // const [users, setUsers] = useState(Users);
  const [editingUser, setEditingUser] = useState(null);
  const dispatch = useDispatch();

  const handleBanUnbanUser = (uid) => {
    dispatch(banUnBanUser(uid));
  };

  useEffect(() => {
    if (!adminError) {
      // Fetch All User
      dispatch(getAllUsers());
    }

    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center" });
    }
  }, [adminError, adminErrorMessage]);

  if (adminLoading) {
    return <Loader />;
  }
  // Handlers for "API" actions
  const toggleUserStatus = (userId) => {
    // TODO: replace with API call: updateUser()
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === "Active" ? "Blocked" : "Active" };
        }
        return u;
      }),
    );
  };

  const saveUserEdits = (e) => {
    e.preventDefault();
    // TODO: replace with API call: updateUser()
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#111118]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-2xl font-bold font-['Syne'] text-white">
            Users List
          </h2>
          <p className="text-sm text-gray-400">
            Manage platform users and permissions
          </p>
        </div>
        <div className="bg-violet-600/20 text-violet-400 px-4 py-2 rounded-xl font-bold border border-violet-500/20">
          {users.length} Total
        </div>
      </div>

      <AdminTable columns={["Avatar/Name", "Role", "Status", "Actions"]}>
        {users.map((user) => (
          <tr
            key={user._id}
            className="hover:bg-white/5 transition-colors group"
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <UserAvatar username={user.name.slice(0, 1)} size="sm" />
                <div className="flex flex-col">
                  <Link to={`/profile/${user.name}`}><span className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {user.name}
                  </span></Link>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${user?.isAdmin ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-gray-400"}`}
              >
                {user?.isAdmin ? "ADMIN" : "USER"}
              </span>
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${user?.isActive ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-pink-500/10 text-pink-400 border-pink-500/20"}`}
              >
                {user?.isActive ? "ACTIVE" : "BLOCKED"}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {user.isActive ? (
                  <button
                    onClick={() => handleBanUnbanUser(user._id)}
                    className="border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    onClick={() => handleBanUnbanUser(user._id)}
                    className="border border-green-500/50 text-green-400 hover:bg-green-500/10 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    Unban
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <AdminModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User Role"
      >
        {editingUser && (
          <form onSubmit={saveUserEdits} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                disabled
                type="text"
                value={editingUser.name}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                disabled
                type="text"
                value={editingUser.email}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role</label>
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:brightness-110 text-white font-medium transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
