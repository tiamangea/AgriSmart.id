import React, { useState, useRef } from 'react';
import { 
  Search, Bell, ChevronDown, Sun, CloudSun, ChevronRight, 
  Home, Lightbulb, Store, User, Leaf, Zap, Droplet,
  MessageSquare, Camera, ImageIcon, Mic, Send, Shield, 
  CreditCard, HelpCircle, LogOut, Settings, X, ShoppingCart,
  Plus, Activity, RefreshCw, Wind, Flame, Truck, ArrowUpRight,
  Clock, MapPin, Calendar, Upload, Mail, Phone
} from 'lucide-react';

// URL Gambar Placeholder berdasarkan Kategori
const imgPupuk = "https://p16-images-common-sign-sg.tokopedia-static.net/tos-maliva-i-o3syd03w52-us/51ecb4b58cec4627b3de7b15217835b9~tplv-o3syd03w52-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1781352946&x-signature=FAYqW0wee%2F8BQxK5ZApbPUHSBnU%3D&x-signature-webp=xdpdIg4iy3HbRyvqfklXK9oLOdI%3D";
const imgcair = "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2025/4/17/40e2f52e-80b3-46b6-adaa-eba7ef38d3b7.jpg~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1781353010&x-signature=ToNKrV9rY1kQflq2UxbXxin3zQQ%3D&x-signature-webp=U9GpWztjg%2F26jOK0hJC85yAIAm0%3D";
const imgAlat = "https://tronhut.com/wp-content/uploads/2026/01/ff0c060c-4803-4f09-b425-9b37cd63038c.png";
const imgcabai = "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/100/MTA-75633832/cap_panah_merah_benih_cabai_rawit_merah_rawita_f1_2250_butir_cap_panah_dataran_rendah_tinggi_biji_bibit_dewata_cabe_pedas_sambal_sambel_hydroponik_hidroponik_full01_ju4hx2cv.jpg";
const imgBibit = "https://www.simonpeter-hidroponik.com/wp-content/uploads/2020/10/tomat-chery-juli-356x458.jpg";
const imgObat = "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=300&q=80";
const imgLain = "https://images.unsplash.com/photo-1530836369250-ef71a3f5e4bf?auto=format&fit=crop&w=300&q=80";
const imgset = "https://image.made-in-china.com/155f0j00uYKbkDQRJUod/DIY-Automatic-Agriculture-Drip-Irrigation-Set-Garden-Plant-Watering-System-for-4-7mm-Hose.webp"; 
const marketplaceProducts = [
  { id: 1, name: "Pupuk NPK GrowFast", price: 35000, rating: 4.8, category: "Pupuk", image: imgPupuk },
  { id: 2, name: "Sensor IoT AquaSense", price: 118000, rating: 4.7, category: "Alat", image: imgAlat },
  { id: 3, name: "Set Irigasi Tetes Premium", price: 88500, rating: 4.9, category: "Alat", image: imgset },
  { id: 4, name: "Benih Tomat Chery", price: 15000, rating: 4.6, category: "Bibit", image: imgBibit },
  { id: 5, name: "Benih Cabai Rawit Merah", price: 12000, rating: 4.8, category: "Bibit", image: imgcabai },
  { id: 6, name: "Pupuk Organik Cair (1L)", price: 45000, rating: 4.5, category: "Pupuk", image: imgcair },
];

const NAV_ITEMS = [
  { id: 'dashboard', icon: Home, label: 'Beranda' },
  { id: 'marketplace', icon: Store, label: 'Pasar' },
  { id: 'ai', icon: MessageSquare, label: 'AI' },
  { id: 'sustainability', icon: Leaf, label: 'Sirkular' },
  { id: 'account', icon: User, label: 'Akun' }
];

export default function FarmAIApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk mengatur Login
  const [isLoginMode, setIsLoginMode] = useState(true); // State untuk berpindah antara Login & Daftar
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(5);
  const [chatInput, setChatInput] = useState('');
  
  // State untuk Fitur Baru: Siram Otomatis
  const [autoWatering, setAutoWatering] = useState(true);
  
  // State untuk Setor Limbah (Sirkular)
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [wasteForm, setWasteForm] = useState({ type: 'Jerami Padi', amount: '', date: '' });
  const [activeWasteDeposit, setActiveWasteDeposit] = useState({
    active: true,
    type: 'Jerami Padi',
    amount: '150',
    date: 'Hari ini',
    status: 'Kurir Menuju Lokasi (Berjarak 2.5km)'
  });

  // State Profil Akun
  const [userProfile, setUserProfile] = useState({
    name: 'Budi Petani',
    email: 'budi.tani@farm.ai',
    phone: '0812-3456-7890',
    address: 'Desa Sukamakmur, Jawa Tengah'
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({...userProfile});

  // State untuk Chat AI
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', type: 'text', text: 'Halo! Saya asisten AI pertanian Anda. Ada yang bisa saya bantu terkait kondisi tanaman atau data lahan hari ini?' }
  ]);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', type: 'text', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'ai', type: 'text', text: 'Berdasarkan analisis kondisi saat ini, tindakan irigasi tambahan sangat direkomendasikan untuk Sektor B.' }]);
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChatMessages(prev => [...prev, { sender: 'user', type: 'image', imageUrl: reader.result }]);
        setTimeout(() => {
          setChatMessages(prev => [...prev, { sender: 'ai', type: 'text', text: 'Menganalisis gambar... Terdeteksi bercak daun yang mengindikasikan kekurangan Kalium (K). Saya sarankan aplikasi pupuk tinggi Kalium.' }]);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const DashboardView = () => (
    <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar bg-[#f4f7f6] animate-in fade-in">
      
      {/* Header & IoT */}
      <div className="relative pt-6 pb-8 px-5 rounded-b-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6 overflow-hidden bg-green-900">
        
        {/* --- GAMBAR LATAR BELAKANG HEADER BERANDA --- */}
        <div className="absolute inset-0 z-0">
          <img 
            src="background.jpg" 
            alt="Header Background" 
            className="w-full h-full object-cover opacity-90 blur-[0px]" 
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-3">
              {/* Logo Aplikasi yang bisa diganti */}
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm bg-white border border-white/50 flex items-center justify-center">
                <img src="logo.jpg" alt="Logo Aplikasi" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-extrabold text-2xl text-green-950 tracking-tight">AgriSmart</h1>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                Field 1 <ChevronDown size={20} className="text-gray-700" />
              </h2>
              <p className="text-xs text-gray-900 font-bold mt-1">Real-time IoT data, comprehended</p>
            </div>
            <div className="flex gap-2 text-green-800">
              <div className="p-2 bg-white/80 rounded-xl backdrop-blur-sm cursor-pointer shadow-sm"><Settings size={18}/></div>
            </div>
          </div>

          {/* Grid Metrik Atas (Kelembapan & pH) */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 shadow-sm border border-white/50 flex flex-col justify-between">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Droplet className="text-blue-500 fill-blue-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 leading-tight">Soil Moisture</h4>
                  <p className="text-2xl font-black text-gray-900 leading-tight mt-0.5">65%</p>
                  <p className="text-[10px] font-bold text-gray-500">(Optimal)</p>
                </div>
              </div>
              <svg className="w-full h-10 mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,30 L0,20 Q10,10 20,25 T40,15 T60,25 T80,10 T100,20 L100,30 Z" fill="url(#moistGrad)" opacity="0.3" />
                <path d="M0,20 Q10,10 20,25 T40,15 T60,25 T80,10 T100,20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="moistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 shadow-sm border border-white/50 flex flex-col items-center text-center">
              <div className="relative w-16 h-16 mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="6" fill="transparent" strokeDasharray="163" strokeDashoffset="40" strokeLinecap="round" />
                  <circle cx="32" cy="32" r="26" stroke="#22c55e" strokeWidth="6" fill="transparent" strokeDasharray="163" strokeDashoffset="70" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-8 border-2 border-green-600 rounded-b-xl rounded-t-sm flex items-end p-0.5 pb-1">
                    <div className="w-full h-1/2 bg-green-500 rounded-b-lg"></div>
                  </div>
                </div>
              </div>
              <h4 className="text-[11px] font-bold text-gray-500 leading-tight">pH Level</h4>
              <p className="text-xl font-black text-gray-900 leading-none mt-1">6.2</p>
              <p className="text-[10px] font-bold text-gray-500 mt-0.5">(Neutral)</p>
            </div>
          </div>

          {/* NPK Levels Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 shadow-sm border border-white/50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 text-sm">NPK Levels</h3>
              <ChevronRight className="text-gray-400 w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between px-2">
              <div className="w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none"/>
                  <circle cx="50" cy="50" r="40" stroke="#4ade80" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round"/>
                  <circle cx="50" cy="50" r="28" stroke="#f1f5f9" strokeWidth="8" fill="none"/>
                  <circle cx="50" cy="50" r="28" stroke="#facc15" strokeWidth="8" fill="none" strokeDasharray="175" strokeDashoffset="100" strokeLinecap="round"/>
                  <circle cx="50" cy="50" r="16" stroke="#f1f5f9" strokeWidth="8" fill="none"/>
                  <circle cx="50" cy="50" r="16" stroke="#a0522d" strokeWidth="8" fill="none" strokeDasharray="100" strokeDashoffset="20" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Leaf className="text-[#4ade80] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-800 leading-tight">N <span className="text-gray-500 font-normal">(Nitrogen)</span></p>
                    <p className="text-[10px] font-semibold text-gray-600">120 ppm <span className="text-gray-400">(Medium)</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="text-[#facc15] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-800 leading-tight">P <span className="text-gray-500 font-normal">(Phosphorus)</span></p>
                    <p className="text-[10px] font-semibold text-gray-600">50 ppm <span className="text-gray-400">(Low)</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="text-[#a0522d] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-800 leading-tight">K <span className="text-gray-500 font-normal">(Potassium)</span></p>
                    <p className="text-[10px] font-semibold text-gray-600">210 ppm <span className="text-gray-400">(High)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="px-5 space-y-4">
        
        {/* Fitur Siram Otomatis (Tombol Geser) */}
        <div>
          <div className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setAutoWatering(!autoWatering)}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-full transition-colors ${autoWatering ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <Droplet size={20} className={autoWatering ? 'fill-blue-500' : ''} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">Siram Otomatis</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Aktif berdasarkan sensor kelembapan</p>
              </div>
            </div>
            
            {/* Tombol Toggle Geser */}
            <button 
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 outline-none ${autoWatering ? 'bg-[#1e8654]' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${autoWatering ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* AI Advisor Wawasan */}
        <div>
          <h3 className="text-[15px] font-bold text-gray-900 mb-3">Wawasan AI</h3>
          <div className="bg-[#fffbeb] rounded-[20px] p-4 border border-amber-100 cursor-pointer shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-amber-600">
                <Lightbulb className="w-5 h-5 fill-amber-200" />
                <h4 className="font-bold text-sm text-gray-900">Saran Pemupukan NPK</h4>
              </div>
              <ChevronRight className="text-gray-400 w-4 h-4" />
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Kadar Fosfor (P) terdeteksi rendah (50 ppm). Disarankan mengaplikasikan pupuk TSP atau NPK tinggi Fosfor sebelum fase pembungaan dimulai.
            </p>
          </div>
        </div>

        {/* Aktivitas Terakhir */}
        <div className="mt-2">
          <h3 className="text-[15px] font-bold text-gray-900 mb-3">Aktivitas Terakhir</h3>
          <div className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600 shrink-0"><Droplet size={18}/></div>
              <div className="flex-1 border-b border-gray-50 pb-3">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-gray-800">Irigasi Otomatis Aktif</p>
                  <span className="text-[10px] font-semibold text-gray-400">Hari ini, 06:00</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">Sektor B disiram selama 45 menit sesuai rekomendasi sensor.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-50 rounded-full text-green-600 shrink-0"><Truck size={18}/></div>
              <div className="flex-1 pb-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-gray-800">Penjemputan Limbah</p>
                  <span className="text-[10px] font-semibold text-gray-400">Hari ini, 08:30</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {activeWasteDeposit.active ? activeWasteDeposit.type : 'Tidak ada jadwal'}: 
                  <span className={`font-semibold ml-1 ${activeWasteDeposit.active ? 'text-orange-500' : 'text-gray-400'}`}>
                    {activeWasteDeposit.active ? activeWasteDeposit.status : '-'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SustainabilityView = () => (
    <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar bg-[#f4f7f6] animate-in fade-in">
      
      {/* HEADER SIRKULAR DENGAN GAMBAR KHUSUS */}
      <div className="px-5 pt-10 pb-6 relative text-white rounded-b-[32px] mb-4 shadow-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Ganti "sirkular.jpg" dengan file gambar Sirkular Anda */}
          <img src="sirkular.jpg" alt="Background Sirkular" className="w-full h-full object-cover" />
          {/* Lapisan overlay agar teks tetap terbaca jelas */}
          <div className="absolute inset-0 bg-green-900/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-1">Keberlanjutan</h2>
          <p className="text-sm text-green-50">Praktik Tani Sirkular & Ramah Lingkungan.</p>
        </div>
      </div>

      <div className="px-5 space-y-4">
        
        {/* Card: Setor Limbah Pertanian */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Leaf size={80}/></div>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="p-2 bg-green-100 rounded-lg"><Leaf className="text-green-600 w-5 h-5" /></div>
            <h3 className="font-bold text-gray-900">Setor Limbah Pertanian</h3>
          </div>
          <p className="text-xs text-gray-600 mb-4 relative z-10">Kumpulkan sisa panen, jual atau tukar dengan poin kompos. Kami jemput ke lokasi Anda!</p>
          
          {activeWasteDeposit.active && (
            <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 mb-4 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-[11px] font-bold text-orange-800 uppercase tracking-wider">Pelacakan Penjemputan</h4>
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                  <Clock size={10} /> Aktif
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-200 rounded-full text-orange-700 animate-pulse"><Truck size={14} /></div>
                <span className="text-xs font-bold text-gray-800">{activeWasteDeposit.status}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-600 bg-white/60 p-2 rounded-lg">
                <div className="flex items-center gap-1"><Leaf size={12} className="text-green-600"/> {activeWasteDeposit.type}</div>
                <div className="flex items-center gap-1"><Zap size={12} className="text-amber-500"/> {activeWasteDeposit.amount} Kg</div>
              </div>
            </div>
          )}

          <button onClick={() => setShowWasteModal(true)} className="w-full text-sm font-bold text-white bg-green-600 py-3 rounded-xl flex justify-center items-center gap-2 shadow-sm hover:bg-green-700 transition-colors relative z-10">
             <Plus size={18}/> Buat Jadwal Penjemputan Baru
          </button>
        </div>

        {/* Card: Manajemen Kompos */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg"><RefreshCw className="text-amber-600 w-5 h-5" /></div>
            <h3 className="font-bold text-gray-900">Manajemen Limbah & Kompos</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Fase Dekomposisi Aktif</span>
              <span className="text-green-600">Hari ke-14</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* --- MODAL SETOR LIMBAH --- */}
        {showWasteModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
            <div className="bg-white w-full max-w-md rounded-t-[32px] p-5 pt-6 relative animate-in slide-in-from-bottom-full duration-300">
              <button onClick={() => setShowWasteModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 z-10 hover:bg-gray-200 transition-colors"><X size={20}/></button>
              
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-gray-900 leading-tight">Formulir Setor Limbah</h2>
                <p className="text-xs text-gray-500 mt-1">Lengkapi data untuk penjemputan limbah tani Anda.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Jenis Limbah</label>
                  <select 
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none appearance-none bg-gray-50" 
                    value={wasteForm.type} 
                    onChange={(e) => setWasteForm({...wasteForm, type: e.target.value})}>
                    <option>Jerami Padi</option>
                    <option>Kotoran Sapi/Kambing</option>
                    <option>Sisa Sayuran/Buah (Organik)</option>
                    <option>Sekam/Dedak Padi</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Foto Limbah (Opsional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 bg-gray-50 transition-colors">
                    <Upload size={24} className="mx-auto text-green-600 mb-2" />
                    <span className="text-xs font-bold text-gray-700 block">Sentuh untuk Unggah Foto</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">JPG, PNG maks 5MB</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Jumlah (Kg)</label>
                    <input 
                      type="number" placeholder="0" 
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50"
                      value={wasteForm.amount} 
                      onChange={(e) => setWasteForm({...wasteForm, amount: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Tanggal</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50"
                      value={wasteForm.date} 
                      onChange={(e) => setWasteForm({...wasteForm, date: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="pt-2 pb-8">
                  <button 
                    onClick={() => {
                      setActiveWasteDeposit({ 
                        active: true, type: wasteForm.type, 
                        amount: wasteForm.amount || '50', date: wasteForm.date || 'Besok', 
                        status: 'Menunggu Konfirmasi Kurir' 
                      });
                      setShowWasteModal(false);
                    }}
                    className="w-full bg-[#1e8654] text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    Ajukan Penjemputan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const AIAdvisorView = () => (
    <div className="flex-1 overflow-y-auto hide-scrollbar bg-[#f4f7f6] relative h-full flex flex-col animate-in fade-in pb-32">
      {showAIChat ? (
        <div className="flex flex-col h-full bg-white z-50 fixed inset-0 pb-8">
          <div className="px-5 py-4 bg-green-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-full"><Leaf className="text-green-600 w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-[15px]">AgriBot AI</h3>
                <p className="text-xs text-green-200">Online • Siap membantu</p>
              </div>
            </div>
            <button onClick={() => setShowAIChat(false)} className="p-1.5 bg-green-800 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 hide-scrollbar">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm overflow-hidden ${msg.sender === 'user' ? 'bg-[#1e8654] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none'}`}>
                  {msg.type === 'image' ? <img src={msg.imageUrl} alt="Uploaded" className="w-full h-auto rounded-lg mb-1" /> : msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 pb-8">
            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={handleImageUpload} />
            <input type="file" accept="image/*" ref={galleryInputRef} className="hidden" onChange={handleImageUpload} />
            <div className="flex items-center gap-2">
              <button onClick={() => cameraInputRef.current.click()} className="p-2 text-gray-400 bg-gray-50 rounded-full"><Camera size={20}/></button>
              <button onClick={() => galleryInputRef.current.click()} className="p-2 text-gray-400 bg-gray-50 rounded-full"><ImageIcon size={20}/></button>
              <div className="flex-1 relative">
                <input 
                  type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik atau ucapkan..." 
                  className="w-full bg-gray-100 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <button onClick={handleSendMessage} className="p-2.5 bg-[#1e8654] text-white rounded-full shadow-md"><Send size={18} className="ml-0.5"/></button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="px-5 pt-6 pb-2">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Penasihat AI</h2>
            <p className="text-sm text-gray-600">Analisis cerdas berdasarkan sensor & gambar.</p>
          </div>
          <div className="px-5 mt-2 space-y-4">
            
            {/* BANNER AI DENGAN GAMBAR KHUSUS */}
            <div className="rounded-[24px] p-6 shadow-lg border border-green-700 flex flex-col text-center items-center relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                {/* Ganti "bg-ai.jpg" dengan file gambar AI Anda */}
                <img src="ai.jpg" alt="Background AI" className="w-full h-full object-cover" />
                {/* Lapisan overlay hijau agar teks putih tetap terbaca dengan jelas */}
                <div className="absolute inset-0 bg-green-900/70"></div>
              </div>
              
              <div className="absolute -right-4 -top-4 opacity-10 z-0">
                <Leaf size={100} className="text-white"/>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 z-10">
                <MessageSquare className="text-white w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 z-10">AgriBot Siap Membantu</h3>
              <p className="text-xs text-gray-100 mb-5 z-10">Kirim foto daun sakit via Kamera/Galeri, atau tanyakan kondisi lahan Anda.</p>
              <button onClick={() => setShowAIChat(true)} className="w-full bg-white text-green-800 font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 z-10">
                 Mulai Chat AI Sekarang <ArrowUpRight size={18} />
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );

  const MarketplaceView = () => (
    <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar bg-[#f4f7f6] animate-in fade-in h-full flex flex-col">
      <div className="px-5 pt-4 pb-2 sticky top-0 bg-[#f4f7f6] z-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-extrabold text-gray-900">Katalog Pasar</h2>
          <div className="relative">
            <ShoppingCart className="text-gray-800" />
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
          </div>
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Cari bibit, pupuk, alat..." className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-sm outline-none shadow-sm" />
        </div>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3 pb-6">
        {marketplaceProducts.map(product => (
          <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-[16px] p-2 shadow-sm border border-gray-100 flex flex-col cursor-pointer active:scale-95 transition-transform">
            <div className="w-full h-32 rounded-xl overflow-hidden mb-2 relative bg-gray-100">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
               <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{product.category}</div>
            </div>
            <div className="px-1 flex flex-col flex-1">
              <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-2 flex-1">{product.name}</h4>
              <div className="flex justify-between items-end mt-auto">
                <p className="text-sm font-black text-green-700">{formatRupiah(product.price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[32px] p-5 pt-6 relative animate-in slide-in-from-bottom-full duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 z-10"><X size={20}/></button>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative bg-gray-100">
               <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="mb-6">
              <span className="text-[10px] font-extrabold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-2 inline-block uppercase tracking-wider">{selectedProduct.category}</span>
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{selectedProduct.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                 <p className="text-2xl font-black text-gray-900">{formatRupiah(selectedProduct.price)}</p>
              </div>
            </div>
            <div className="flex gap-3 pb-8">
              <button onClick={() => { setCartCount(c => c + 1); setSelectedProduct(null); }} className="flex-1 bg-green-50 text-[#1e8654] border border-green-200 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"><ShoppingCart size={18}/> Beli</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AccountView = () => (
    <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar bg-[#f4f7f6] animate-in fade-in">
      
      {/* HEADER AKUN DENGAN GAMBAR KHUSUS */}
      <div className="px-5 pt-10 pb-6 shadow-sm border-b border-gray-100 relative overflow-hidden rounded-b-[24px]">
        <div className="absolute inset-0 z-0">
          {/* Ganti "saya.jpg" dengan file gambar latar profil Anda */}
          <img src="saya.jpg" alt="Background Akun" className="w-full h-full object-cover" />
          {/* Overlay gelap agar teks yang diubah menjadi putih tetap terbaca */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full border-4 border-white/40 shadow-lg overflow-hidden shrink-0">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userProfile.name}`} alt="User" className="w-full h-full object-cover bg-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">{userProfile.name}</h2>
            <p className="text-sm text-gray-200 mb-1">{userProfile.email}</p>
            <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">Member Premium</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Pengaturan Akun</h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            
            {/* Pemicu Modal Pengaturan */}
            <div 
              onClick={() => { setEditForm(userProfile); setShowEditProfile(true); }}
              className="flex items-center justify-between p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Settings size={18}/></div>
                <span className="text-sm font-bold text-gray-800">Edit Profil</span>
              </div>
              <ChevronRight size={18} className="text-gray-400"/>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600"><Shield size={18}/></div>
                <span className="text-sm font-bold text-gray-800">Keamanan</span>
              </div>
              <ChevronRight size={18} className="text-gray-400"/>
            </div>

            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><HelpCircle size={18}/></div>
                <span className="text-sm font-bold text-gray-800">Bantuan & Dukungan</span>
              </div>
              <ChevronRight size={18} className="text-gray-400"/>
            </div>
            
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-white rounded-2xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Keluar Akun
        </button>
      </div>

      {/* --- MODAL EDIT PROFIL --- */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[32px] p-5 pt-6 relative animate-in slide-in-from-bottom-full duration-300">
            <button onClick={() => setShowEditProfile(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 z-10 hover:bg-gray-200 transition-colors"><X size={20}/></button>
            
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">Edit Profil</h2>
              <p className="text-xs text-gray-500 mt-1">Perbarui informasi akun Anda.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50 focus:ring-2 focus:ring-green-500"
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Alamat Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50 focus:ring-2 focus:ring-green-500"
                  value={editForm.email} 
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Nomor Telepon</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50 focus:ring-2 focus:ring-green-500"
                  value={editForm.phone} 
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Alamat Lengkap</label>
                <textarea 
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50 focus:ring-2 focus:ring-green-500"
                  value={editForm.address} 
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})} 
                />
              </div>

              <div className="pt-2 pb-8">
                <button 
                  onClick={() => {
                    setUserProfile(editForm);
                    setShowEditProfile(false);
                  }}
                  className="w-full bg-[#1e8654] text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // --- VIEW AUTENTIKASI (LOGIN & DAFTAR) ---
  const AuthView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = (e) => {
      e.preventDefault();
      if (email && password) {
        setIsAuthenticated(true);
      }
    };

    return (
      <div className="min-h-screen bg-[#111827] flex justify-center items-center font-sans">
        {/* Container putih seperti pada desain */}
        <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[auto] sm:rounded-[32px] sm:h-auto shadow-2xl flex flex-col p-8 justify-center">
          
          {/* --- AREA LOGO --- */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm overflow-hidden p-1.5">
              <img
                src="logo.jpg"
                alt="Logo Aplikasi"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          {/* Judul & Subjudul */}
          <h1 className="text-3xl font-extrabold text-[#1e8654] text-center mb-2 tracking-tight">
            AgriSmart
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8 px-2 leading-relaxed">
            {isLoginMode
              ? 'Masuk untuk mulai memantau dan mengelola lahan pertanian Anda.'
              : 'Daftar sekarang dan mulai langkah cerdas pertanian Anda.'}
          </p>

          {/* Form Email & Password */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Bisnis / Pribadi</label>
              <input
                type="email"
                required
                placeholder="email@anda.com"
                className="w-full border border-gray-300 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e8654] bg-white transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e8654] bg-white transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Tombol Aksi Utama */}
            <button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-4 text-sm"
            >
              {isLoginMode ? 'Masuk Sekarang' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Kotak Toggle Login/Daftar */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center text-[13px] text-gray-600 border border-gray-100">
            {isLoginMode ? (
              <>
                Belum memiliki akun?{' '}
                <span
                  className="font-bold text-[#1e8654] cursor-pointer hover:underline"
                  onClick={() => setIsLoginMode(false)}
                >
                  Daftar
                </span>
              </>
            ) : (
              <>
                Sudah memiliki akun?{' '}
                <span
                  className="font-bold text-[#1e8654] cursor-pointer hover:underline"
                  onClick={() => setIsLoginMode(true)}
                >
                  Masuk
                </span>
              </>
            )}
          </div>

        </div>
      </div>
    );
  };

  // Validasi: Jika belum login, tampilkan halaman Login/Daftar
  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-gray-900 font-sans flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          /* Mencegah highlight biru pada HP saat klik menu */
          .no-tap-highlight { -webkit-tap-highlight-color: transparent; }
        `}</style>

        {/* --- KONTEN UTAMA --- */}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'marketplace' && <MarketplaceView />}
        {activeTab === 'ai' && <AIAdvisorView />}
        {activeTab === 'sustainability' && <SustainabilityView />}
        {activeTab === 'account' && <AccountView />}

        {/* --- NAVIGASI BAWAH DENGAN EFEK BULAT PUTIH --- */}
        {!showAIChat && (
          <div className="absolute bottom-0 w-full bg-white px-6 pb-4 pt-2 h-[80px] z-30 flex justify-between items-end shadow-[0_-15px_30px_rgba(0,0,0,0.06)] rounded-t-[32px]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div key={item.id} className="relative flex flex-col items-center w-14 h-full justify-end pb-3 no-tap-highlight">
                  
                  {/* LUBANG (CUTOUT) & BACKGROUND PUTIH BULAT */}
                  {isActive && (
                    <div className="absolute -top-7 w-[68px] h-[68px] bg-[#f4f7f6] rounded-full flex items-center justify-center transition-all duration-300 z-0">
                      {/* Base Bulat Putih Solid */}
                      <div className="w-[52px] h-[52px] bg-white rounded-full relative shadow-[0_8px_15px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center">
                      </div>
                    </div>
                  )}
                  
                  {/* IKON TOMBOL YANG MELOMPAT */}
                  <button 
                    onClick={() => setActiveTab(item.id)}
                    className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] outline-none ${isActive ? '-translate-y-8' : 'translate-y-0 text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className={`p-2 rounded-full transition-transform duration-500 flex items-center justify-center ${isActive ? 'text-[#1e8654] scale-125' : 'text-gray-400 scale-100'}`}>
                       <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {/* Teks Label */}
                    <span className={`text-[10px] font-bold absolute top-11 transition-opacity duration-300 ${isActive ? 'opacity-100 text-[#1e8654] translate-y-2' : 'opacity-100 text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
}