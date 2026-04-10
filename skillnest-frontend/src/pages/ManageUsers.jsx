import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  ShieldCheck, 
  Trash2, 
  Edit2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const users = [
  { id: 1, name: 'Ananya Sharma', email: 'ananya@example.com', role: 'Intern', joined: 'Mar 15, 2024', status: 'Active', avatar: 'https://picsum.photos/seed/u1/100/100' },
  { id: 2, name: 'Rahul Verma', email: 'rahul@example.com', role: 'Admin', joined: 'Mar 10, 2024', status: 'Active', avatar: 'https://picsum.photos/seed/u2/100/100' },
  { id: 3, name: 'Priya Patel', email: 'priya@example.com', role: 'Intern', joined: 'Mar 05, 2024', status: 'Inactive', avatar: 'https://picsum.photos/seed/u3/100/100' },
  { id: 4, name: 'Amit Kumar', email: 'amit@example.com', role: 'Admin', joined: 'Feb 28, 2024', status: 'Active', avatar: 'https://picsum.photos/seed/u4/100/100' },
  { id: 5, name: 'Siddharth Jain', email: 'sid@example.com', role: 'Intern', joined: 'Mar 20, 2024', status: 'Active', avatar: 'https://picsum.photos/seed/u5/100/100' },
];

export default function ManageUsers({ isDark }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Manage Users
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Control user access and roles across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border flex-1 md:w-80 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-400"
            />
          </div>
          <button className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all ${
            isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
          }`}>
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </div>

      <div className={`rounded-3xl border overflow-hidden ${
        isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <button className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>All Users</button>
            <button className="text-sm font-bold text-slate-500">Admins</button>
            <button className="text-sm font-bold text-slate-500">Interns</button>
          </div>
          <button className={`p-2 rounded-xl border transition-all ${
            isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
          }`}>
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {users.map((user) => (
                <tr key={user.id} className={`group ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50/50'}`}>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.role === 'Admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {user.role === 'Admin' ? <ShieldCheck size={12} /> : <Users size={12} />}
                      {user.role}
                    </div>
                  </td>
                  <td className="p-6 text-xs text-slate-500">{user.joined}</td>
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {user.status}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500"><Edit2 size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`p-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <p className="text-xs text-slate-500">Showing 5 of 1,284 users</p>
          <div className="flex items-center gap-2">
            <button className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${isDark ? 'border-slate-700 text-slate-400' : 'border-gray-100 text-gray-500'}`}>Previous</button>
            <button className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${isDark ? 'border-slate-700 text-slate-400' : 'border-gray-100 text-gray-500'}`}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
