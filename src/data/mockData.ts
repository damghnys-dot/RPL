export interface User {
  id: string;
  nim?: string;
  name: string;
  role: 'student' | 'staff' | 'admin';
  avatar?: string;
  email: string;
}

export interface Deposit {
  id: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  rackId: string;
  status: 'active' | 'completed' | 'pending';
  startTime: string;
  endTime?: string;
  qrCode: string;
}

export interface Rack {
  id: string;
  name: string;
  totalSlots: number;
  availableSlots: number;
  status: 'available' | 'full' | 'maintenance';
}

export const users: User[] = [
  {
    id: 'u1',
    nim: '2100018001',
    name: 'Budi Santoso',
    role: 'student',
    email: 'budi.santoso@ui.ac.id',
  },
  {
    id: 'u2',
    name: 'Sarah Wijaya',
    role: 'staff',
    email: 'sarah.staff@ui.ac.id',
  },
  {
    id: 'u3',
    name: 'Admin Utama',
    role: 'admin',
    email: 'admin.smarthelm@ui.ac.id',
  }
];

export const racks: Rack[] = [
  { id: 'R1', name: 'Rack A-01', totalSlots: 20, availableSlots: 15, status: 'available' },
  { id: 'R2', name: 'Rack A-02', totalSlots: 20, availableSlots: 0, status: 'full' },
  { id: 'R3', name: 'Rack B-01', totalSlots: 20, availableSlots: 8, status: 'available' },
  { id: 'R4', name: 'Rack B-02', totalSlots: 20, availableSlots: 2, status: 'available' },
];

export const deposits: Deposit[] = [
  {
    id: 'D-10293',
    studentId: 'u1',
    studentName: 'Budi Santoso',
    studentNim: '2100018001',
    rackId: 'R1',
    status: 'active',
    startTime: '2026-06-23T08:30:00Z',
    qrCode: 'D-10293',
  },
  {
    id: 'D-10290',
    studentId: 'u1',
    studentName: 'Budi Santoso',
    studentNim: '2100018001',
    rackId: 'R3',
    status: 'completed',
    startTime: '2026-06-22T10:00:00Z',
    endTime: '2026-06-22T16:00:00Z',
    qrCode: 'D-10290',
  }
];

export const notifications = [
  {
    id: 'n1',
    title: 'Deposit Berhasil',
    message: 'Helm Anda telah berhasil disimpan di Rack A-01.',
    time: '5 menit yang lalu',
    isRead: false,
  },
  {
    id: 'n2',
    title: 'Pengambilan Helm',
    message: 'Helm Anda telah diambil pada pukul 16:00 kemarin.',
    time: '1 hari yang lalu',
    isRead: true,
  }
];

export const statistics = {
  weeklyDeposits: [
    { name: 'Mon', count: 45 },
    { name: 'Tue', count: 52 },
    { name: 'Wed', count: 38 },
    { name: 'Thu', count: 65 },
    { name: 'Fri', count: 48 },
    { name: 'Sat', count: 24 },
    { name: 'Sun', count: 12 },
  ],
  userStats: {
    totalStudents: 1250,
    activeStudents: 85,
    newStudents: 12,
  },
  rackStats: {
    totalSlots: 80,
    usedSlots: 55,
    availableSlots: 25,
  }
};
