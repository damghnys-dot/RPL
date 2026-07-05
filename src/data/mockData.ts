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
    nim: '202410370110329',
    name: 'Adam Al Ghonniy Soetejoe',
    role: 'student',
    email: 'adam@student.umm.ac.id',
  },
  {
    id: 'u4',
    nim: '202410370110303',
    name: 'Habib Anoraga',
    role: 'student',
    email: 'habib@student.umm.ac.id',
  },
  {
    id: 'u5',
    nim: '202410370110301',
    name: 'Budi Santoso',
    role: 'student',
    email: 'budi@student.umm.ac.id',
  },
  {
    id: 'u6',
    nim: '202410370110302',
    name: 'Siti Aminah',
    role: 'student',
    email: 'siti@student.umm.ac.id',
  },
  {
    id: 'u7',
    nim: '202410370110304',
    name: 'Rizky Pratama',
    role: 'student',
    email: 'rizky@student.umm.ac.id',
  },
  {
    id: 'u8',
    nim: '202410370110305',
    name: 'Dewi Lestari',
    role: 'student',
    email: 'dewi@student.umm.ac.id',
  },
  {
    id: 'u9',
    nim: '202410370110306',
    name: 'Ahmad Fauzi',
    role: 'student',
    email: 'ahmad@student.umm.ac.id',
  },
  {
    id: 'u10',
    nim: '202410370110307',
    name: 'Lestari Putri',
    role: 'student',
    email: 'lestari@student.umm.ac.id',
  },
  {
    id: 'u2',
    name: 'StaffUMM',
    role: 'staff',
    email: 'staff@umm.ac.id',
  },
  {
    id: 'u3',
    name: 'AdminUMM',
    role: 'admin',
    email: 'admin@umm.ac.id',
  }
];

export const racks: Rack[] = [
  { id: 'R1', name: 'Rack A-01', totalSlots: 20, availableSlots: 15, status: 'available' },
  { id: 'R2', name: 'Rack A-02', totalSlots: 20, availableSlots: 0, status: 'full' },
  { id: 'R3', name: 'Rack B-01', totalSlots: 20, availableSlots: 8, status: 'available' },
  { id: 'R4', name: 'Rack B-02', totalSlots: 20, availableSlots: 2, status: 'available' },
  { id: 'R5', name: 'Rack C-01', totalSlots: 20, availableSlots: 10, status: 'available' },
  { id: 'R6', name: 'Rack C-02', totalSlots: 20, availableSlots: 5, status: 'available' },
];

export const deposits: Deposit[] = [
  {
    id: 'D-10293',
    studentId: 'u1',
    studentName: 'Adam Al Ghonniy Soetejoe',
    studentNim: '202410370110329',
    rackId: 'R1',
    status: 'active',
    startTime: '2026-06-23T08:30:00Z',
    qrCode: 'D-10293',
  },
  {
    id: 'D-10294',
    studentId: 'u5',
    studentName: 'Budi Santoso',
    studentNim: '202410370110301',
    rackId: 'R1',
    status: 'active',
    startTime: '2026-06-23T09:00:00Z',
    qrCode: 'D-10294',
  },
  {
    id: 'D-10295',
    studentId: 'u6',
    studentName: 'Siti Aminah',
    studentNim: '202410370110302',
    rackId: 'R3',
    status: 'active',
    startTime: '2026-06-23T09:15:00Z',
    qrCode: 'D-10295',
  },
  {
    id: 'D-10290',
    studentId: 'u4',
    studentName: 'Habib Anoraga',
    studentNim: '202410370110303',
    rackId: 'R3',
    status: 'completed',
    startTime: '2026-06-22T10:00:00Z',
    endTime: '2026-06-22T16:00:00Z',
    qrCode: 'D-10290',
  },
  {
    id: 'D-10291',
    studentId: 'u7',
    studentName: 'Rizky Pratama',
    studentNim: '202410370110304',
    rackId: 'R4',
    status: 'completed',
    startTime: '2026-06-22T08:00:00Z',
    endTime: '2026-06-22T12:00:00Z',
    qrCode: 'D-10291',
  },
  {
    id: 'D-10292',
    studentId: 'u8',
    studentName: 'Dewi Lestari',
    studentNim: '202410370110305',
    rackId: 'R5',
    status: 'completed',
    startTime: '2026-06-22T09:30:00Z',
    endTime: '2026-06-22T15:30:00Z',
    qrCode: 'D-10292',
  },
  {
    id: 'D-10296',
    studentId: 'u9',
    studentName: 'Ahmad Fauzi',
    studentNim: '202410370110306',
    rackId: 'R6',
    status: 'active',
    startTime: '2026-06-23T10:00:00Z',
    qrCode: 'D-10296',
  },
  {
    id: 'D-10297',
    studentId: 'u10',
    studentName: 'Lestari Putri',
    studentNim: '202410370110307',
    rackId: 'R6',
    status: 'completed',
    startTime: '2026-06-21T07:30:00Z',
    endTime: '2026-06-21T17:00:00Z',
    qrCode: 'D-10297',
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
    totalSlots: 120,
    usedSlots: 85,
    availableSlots: 35,
  }
};