import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================
const API = "https://control-backend-ndpz.onrender.com";

const loadScript = (url) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ==========================================
// FORMATEO MONETARIO Y TEXTO
// ==========================================
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const cleanConcepto = (raw) => {
  if (!raw) return "-";
  return raw.replace(/\[|\]/g, '').trim();
};

function AnimatedCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = Math.round(start + (end - start) * easeProgress);
      
      setDisplayValue(current);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{formatMoney(displayValue)}</>;
}

// ==========================================
// ICONOS PREMIUM (SVG)
// ==========================================
const IconSun = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const IconMoon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const IconLogout = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const IconTrash = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;
const IconEdit = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
const IconEye = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>;
const IconPDF = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
const IconCSV = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
const IconPlus = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>;
const IconSearch = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const IconWallet = (props) => <svg width={props.width || "32"} height={props.height || "32"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
const IconList = (props) => <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
const IconUsers = (props) => <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconHandCoin = (props) => <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const IconClock = (props) => <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;

// ==========================================
// APP COMPONENT
// ==========================================
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'info' });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js").then(() => {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js");
    });
  }, []);

  const showToast = (msg, type = 'info') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 3000);
  };

  const handleLogout = () => {
    setToken('');
    setUserEmail('');
    localStorage.clear();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased ${isDarkMode ? 'bg-[#111827] text-[#F9FAFB]' : 'bg-[#F4F7FB] text-[#1E293B]'}`}>
      
      {toast.show && (
        <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 transform transition-all flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top-5
          ${toast.type === 'success' ? 'bg-[#10B981]/90 text-white' : toast.type === 'error' ? 'bg-[#F43F5E]/90 text-white' : 'bg-[#1E293B]/90 text-white'}`}>
          <span className="font-medium tracking-wide text-sm">{toast.msg}</span>
        </div>
      )}

      {!token ? (
        <AuthScreen setToken={setToken} setUserEmail={setUserEmail} showToast={showToast} isDarkMode={isDarkMode} />
      ) : (
        <Dashboard 
          token={token} 
          userEmail={userEmail}
          handleLogout={handleLogout} 
          isDarkMode={isDarkMode} 
          toggleTheme={() => setIsDarkMode(!isDarkMode)} 
          showToast={showToast} 
        />
      )}
    </div>
  );
}

// ==========================================
// AUTH SCREEN
// ==========================================
function AuthScreen({ setToken, setUserEmail, showToast, isDarkMode }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isRegisterMode ? '/api/auth/signup' : '/api/auth/login';

    try {
      const response = await fetch(`${API}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error de autenticación');

      setToken(data.token);
      setUserEmail(data.user.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className={`w-full max-w-md p-10 rounded-[32px] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${isDarkMode ? 'bg-[#1F2937] border-[#374151] shadow-2xl' : 'bg-[#F7F9FC] border-[#E2E8F0]'}`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-[#6366F1]/10 text-[#6366F1] mb-6">
            <IconWallet />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{isRegisterMode ? 'Comienza ahora' : 'Bienvenido de nuevo'}</h2>
          <p className={`mt-3 text-sm font-medium ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]'}`}>
            {isRegisterMode ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
            <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="ml-1 text-[#6366F1] font-medium hover:text-indigo-500 transition-colors">
              {isRegisterMode ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-6 py-4 rounded-[20px] outline-none transition-all font-medium border ${isDarkMode ? 'bg-[#111827] border-[#374151] focus:border-[#6366F1] text-white' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] text-[#1E293B]'}`} 
          />
          <input 
            type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-6 py-4 rounded-[20px] outline-none transition-all font-medium border ${isDarkMode ? 'bg-[#111827] border-[#374151] focus:border-[#6366F1] text-white' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] text-[#1E293B]'}`} 
          />
          <button 
            type="submit" disabled={loading}
            className="w-full py-4 mt-4 rounded-[20px] bg-[#6366F1] hover:bg-indigo-500 text-white font-medium tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_8px_20px_rgba(99,102,241,0.25)]"
          >
            {loading ? 'Procesando...' : (isRegisterMode ? 'Crear cuenta' : 'Ingresar')}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// DASHBOARD (Master View)
// ==========================================
function Dashboard({ token, userEmail, handleLogout, isDarkMode, toggleTheme, showToast }) {
  const [cuentasRaw, setCuentasRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, id: null, name: '', newName: '' });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      if (Array.isArray(data)) {
        data.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
        setCuentasRaw(data);
      }
    } catch (e) {
      showToast("Error al cargar los datos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const loadMoreTransactions = async (cuentaId, currentCount) => {
    setLoadingMore(true);
    try {
      const res = await fetch(`${API}/api/cuentas/${cuentaId}/transacciones?skip=${currentCount}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) throw new Error("Error");
      const nuevasTx = await res.json();
      if(nuevasTx.length === 0) showToast("No hay más movimientos", "info");
      setCuentasRaw(prev => prev.map(c => c.id === cuentaId ? { ...c, transacciones: [...c.transacciones, ...nuevasTx] } : c));
    } catch (e) {
      showToast("Error al cargar historial", "error");
    } finally {
      setLoadingMore(false);
    }
  };

  // ==========================================
  // LÓGICA E INFRAESTRUCTURA (INTACTAS)
  // ==========================================
  const cuentas = useMemo(() => {
    return cuentasRaw.map(c => {
      const txs = c.transacciones || [];
      
      const isLoan = txs.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
      const hasIngreso = txs.some(t => t.tipo === "Ingreso" && (!t.concepto || !t.concepto.includes("[Abono / Pago de deuda]")));
      
      let accountType = "asset"; 
      if (isLoan) accountType = "loan"; 
      else if (!hasIngreso && txs.some(t => t.tipo === "Gasto")) accountType = "expense"; 
      
      let balanceCuenta = 0;
      txs.forEach(t => {
         if(t.tipo === 'Ingreso' || t.tipo === 'Abono') balanceCuenta += t.monto;
         if(t.tipo === 'Gasto' || t.tipo === 'Préstamo') balanceCuenta -= t.monto;
      });

      return {
        ...c,
        accountType,
        canBeSourceOfFunds: accountType === "asset",
        balanceCuenta
      };
    });
  }, [cuentasRaw]);

  const metricas = useMemo(() => {
    let ingresos = 0, gastos = 0, deuda = 0;
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();

    cuentas.forEach(u => {
      if (u.accountType === 'loan') {
        if (u.balanceCuenta < 0) deuda += Math.abs(u.balanceCuenta);
      }

      if (u.accountType !== 'loan') {
        (u.transacciones || []).forEach(t => {
          const fechaTx = new Date(t.fecha);
          if (fechaTx.getMonth() === mesActual && fechaTx.getFullYear() === anioActual) {
            const concepto = t.concepto || "";
            
            const isTransfer = concepto.includes("[Transferencia]") || concepto.includes("[Pago de]");
            const isAbonoDeuda = concepto.includes("[Abono / Pago de deuda]") || concepto.includes("[Capital Devuelto]");
            const isPrestamoOtorgado = concepto.includes("[Préstamo Otorgado]");

            if (t.tipo === "Ingreso" && !isTransfer && !isAbonoDeuda) {
              ingresos += t.monto;
            }
            if (t.tipo === "Gasto" && !isTransfer && !isPrestamoOtorgado) {
              gastos += t.monto;
            }
          }
        });
      }
    });
    return { ingresos, gastos, deuda };
  }, [cuentas]);

  const balanceNeto = metricas.ingresos - metricas.gastos - metricas.deuda;
  const cuentasActivas = cuentas.length;
  const deudoresActivos = cuentas.filter(c => c.accountType === 'loan' && c.balanceCuenta < 0).length;
  const prestamosPendientes = metricas.deuda;

  const ultimoMovimiento = useMemo(() => {
      let allTx = [];
      cuentas.forEach(c => {
          (c.transacciones || []).forEach(t => {
              allTx.push({ ...t, cuentaNombre: c.nombre });
          });
      });
      if (allTx.length === 0) return null;
      allTx.sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || b.id - a.id);
      return allTx[0];
  }, [cuentas]);

  const toggleRow = (id) => {
    setExpandedRows(prev => prev[id] ? {} : { [id]: true });
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API}/cuentas/${deleteModal.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setDeleteModal({ isOpen: false, id: null, name: '' });
      fetchDashboard();
    } catch (e) { showToast("Error al eliminar", "error"); }
  };

  const confirmEdit = async () => {
    if (!editModal.newName.trim()) return;
    try {
      await fetch(`${API}/cuentas/${editModal.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nombre: editModal.newName })
      });
      setEditModal({ isOpen: false, id: null, name: '', newName: '' });
      fetchDashboard();
    } catch (e) { showToast("Error al actualizar", "error"); }
  };

  const generarCSV = (cuenta) => {
    let csvContent = "Fecha,Tipo,Monto,Concepto\n";
    (cuenta.transacciones || []).forEach(t => {
      let tipo = t.tipo;
      if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipo = "Préstamo";
      csvContent += `${new Date(t.fecha).toLocaleDateString()},${tipo},${t.monto},${cleanConcepto(t.concepto)}\n`;
    });
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = `Historial_${cuenta.nombre}.csv`;
    link.click();
  };

  const generarPDF = (cuenta) => {
    const windowJsPDF = window.jspdf?.jsPDF;
    if (!windowJsPDF) return showToast("Preparando PDF...", "info");

    const doc = new windowJsPDF();
    if (typeof doc.autoTable !== 'function') {
        return showToast("Cargando complementos del PDF, intenta de nuevo...", "info");
    }

    doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text("Estado de Cuenta", 14, 20); 
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text(`Registro: ${cuenta.nombre}`, 14, 28);
    
    const tablaDatos = (cuenta.transacciones || []).map(t => {
      let tipo = t.tipo;
      if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipo = "Préstamo";
      return [ tipo, `${formatMoney(t.monto)}`, new Date(t.fecha).toLocaleDateString(), cleanConcepto(t.concepto) ];
    });

    doc.autoTable({ startY: 35, head: [['Tipo', 'Monto', 'Fecha', 'Concepto']], body: tablaDatos, headStyles: { fillColor: [99, 102, 241] } });
    doc.save(`Estado_Cuenta_${cuenta.nombre}.pdf`);
  };

  const chartData = useMemo(() => {
    const total = metricas.ingresos + metricas.gastos + metricas.deuda;
    if (total === 0) return null;
    const r = 50; const circ = 2 * Math.PI * r;
    return {
      r, circ, total,
      ingDash: `${(metricas.ingresos / total) * circ} ${circ}`,
      gasDash: `${(metricas.gastos / total) * circ} ${circ}`,
      deuDash: `${(metricas.deuda / total) * circ} ${circ}`,
      gasOffset: -((metricas.ingresos / total) * circ),
      deuOffset: -(((metricas.ingresos + metricas.gastos) / total) * circ),
      pctIngresos: ((metricas.ingresos / total) * 100).toFixed(1),
      pctGastos: ((metricas.gastos / total) * 100).toFixed(1),
      pctDeuda: ((metricas.deuda / total) * 100).toFixed(1),
    };
  }, [metricas]);

  const cardClass = `rounded-[32px] transition-all border ${isDarkMode ? 'bg-[#1F2937] border-[#374151] shadow-2xl' : 'bg-[#F7F9FC] border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}`;
  
  // Botones sutilmente más pequeños para mayor densidad y look profesional
  const iconBtnClass = `w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95`;
  
  const textMuted = isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]';
  const textSecondary = isDarkMode ? 'text-[#D1D5DB]' : 'text-[#475569]';

  if (!loading && cuentas.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-12 pb-40">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6366F1] rounded-[12px] flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"><IconWallet /></div>
              <h1 className="text-2xl font-semibold tracking-tight">Finanzas</h1>
            </div>
            <p className={`${textSecondary} text-sm font-medium mt-2`}>{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-sm font-medium transition-all border ${isDarkMode ? 'bg-[#1F2937] border-[#374151] text-[#D1D5DB]' : 'bg-white border-[#E2E8F0] text-[#1E293B] shadow-sm'}`}>
              {isDarkMode ? <><IconSun /> Claro</> : <><IconMoon /> Oscuro</>}
            </button>
            <button onClick={handleLogout} className={`flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-sm font-medium transition-all border text-[#F43F5E] ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0] shadow-sm'}`}>
              <IconLogout /> Salir
            </button>
          </div>
        </header>

        <div className={`${cardClass} flex flex-col items-center justify-center py-20 px-6 text-center animate-in zoom-in-95 duration-500`}>
          <div className="w-24 h-24 bg-[#6366F1]/10 text-[#6366F1] rounded-full flex items-center justify-center mb-6">
            <IconWallet />
          </div>
          <h2 className="text-2xl font-semibold mb-3 tracking-tight">Comienza tu control financiero</h2>
          <p className={`${textSecondary} mb-10 max-w-md font-medium text-base`}>Aún no tienes cuentas ni movimientos registrados. Rompe el lienzo en blanco creando tu primer registro y descubre el potencial de tus métricas.</p>
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-[#6366F1] text-white font-medium rounded-[20px] shadow-[0_8px_20px_rgba(99,102,241,0.25)] hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
            <IconPlus /> Crear primer movimiento
          </button>
        </div>

        {isModalOpen && <MovementModal token={token} cuentas={cuentas} isDarkMode={isDarkMode} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchDashboard(); }} showToast={showToast} />}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 pb-40">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6366F1] rounded-[12px] flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <IconWallet />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Finanzas</h1>
          </div>
          <p className={`${textSecondary} text-sm font-medium mt-2`}>{userEmail}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-sm font-medium transition-all border ${isDarkMode ? 'bg-[#1F2937] border-[#374151] text-[#D1D5DB] hover:bg-[#273449]' : 'bg-white border-[#E2E8F0] text-[#1E293B] shadow-sm hover:shadow-md'}`}>
            {isDarkMode ? <><IconSun /> Claro</> : <><IconMoon /> Oscuro</>}
          </button>
          <button onClick={handleLogout} className={`flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-sm font-medium transition-all border text-[#F43F5E] ${isDarkMode ? 'bg-[#1F2937] border-[#374151] hover:bg-[#273449]' : 'bg-white border-[#E2E8F0] shadow-sm hover:shadow-md'}`}>
            <IconLogout /> Salir
          </button>
        </div>
      </header>

      {/* MÉTRICAS SUPERIORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${cardClass} p-8 flex flex-col items-center justify-center text-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Ingresos (Mes)</p>
          <h2 className="text-[40px] font-semibold text-[#10B981] tracking-tighter leading-none"><AnimatedCounter value={metricas.ingresos} /></h2>
        </div>
        <div className={`${cardClass} p-8 flex flex-col items-center justify-center text-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Gastos (Mes)</p>
          <h2 className="text-[40px] font-semibold text-[#F43F5E] tracking-tighter leading-none"><AnimatedCounter value={metricas.gastos} /></h2>
        </div>
        <div className={`${cardClass} p-8 flex flex-col items-center justify-center text-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Deuda Activa (A tu favor)</p>
          <h2 className="text-[40px] font-semibold text-[#1E293B] dark:text-[#F9FAFB] tracking-tighter leading-none"><AnimatedCounter value={metricas.deuda} /></h2>
        </div>
      </div>

      {/* DASHBOARD VISUAL (RESUMEN FINANCIERO) */}
      <div className={`${cardClass} mb-8 overflow-hidden`}>
        <div className="flex flex-col lg:flex-row">
          
          {/* DISTRIBUCIÓN FINANCIERA (IZQUIERDA) */}
          <div className="flex-1 p-8 lg:border-r border-[#E2E8F0] dark:border-[#374151] flex flex-col justify-start">
            <h3 className={`text-[11px] font-bold uppercase tracking-widest ${textMuted} mb-6 text-left w-full`}>Distribución Financiera</h3>
            
            {chartData ? (
              <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full flex-1">
                
                <div className="relative flex items-center justify-center">
                  <svg width="170" height="170" viewBox="0 0 120 120" className="transform -rotate-90 drop-shadow-md">
                    <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#273449' : '#E2E8F0'} strokeWidth="12" />
                    <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray={chartData.ingDash} />
                    <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#F43F5E" strokeWidth="12" strokeDasharray={chartData.gasDash} strokeDashoffset={chartData.gasOffset} />
                    <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#FFFFFF' : '#1E293B'} strokeWidth="12" strokeDasharray={chartData.deuDash} strokeDashoffset={chartData.deuOffset} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#1E293B] dark:text-[#F9FAFB]">{formatMoney(balanceNeto)}</span>
                    <span className={`text-[9px] uppercase tracking-widest ${textMuted} mt-1`}>Balance Neto</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 w-40">
                    <span className="w-3 h-3 rounded-full bg-[#10B981] mt-1"></span>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB]">Ingresos</span>
                        <span className={`text-xs font-medium ${textSecondary}`}>{chartData.pctIngresos}%</span>
                      </div>
                      <span className={`text-sm font-medium ${textMuted}`}>{formatMoney(metricas.ingresos)}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 w-40">
                    <span className="w-3 h-3 rounded-full bg-[#F43F5E] mt-1"></span>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB]">Gastos</span>
                        <span className={`text-xs font-medium ${textSecondary}`}>{chartData.pctGastos}%</span>
                      </div>
                      <span className={`text-sm font-medium ${textMuted}`}>{formatMoney(metricas.gastos)}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 w-40">
                    <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white' : 'bg-[#1E293B]'} mt-1`}></span>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB]">Deuda Activa</span>
                        <span className={`text-xs font-medium ${textSecondary}`}>{chartData.pctDeuda}%</span>
                      </div>
                      <span className={`text-sm font-medium ${textMuted}`}>{formatMoney(metricas.deuda)}</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <p className={`${textMuted} font-medium text-sm text-center w-full`}>Registra movimientos para visualizar tu actividad</p>
            )}
          </div>

          {/* RESUMEN FINANCIERO (DERECHA) */}
          <div className="flex-1 p-8 flex flex-col justify-start bg-[#F8FAFC] dark:bg-[#111827]/30">
            <h3 className={`text-[11px] font-bold uppercase tracking-widest ${textMuted} mb-6 text-left w-full`}>Resumen Financiero</h3>
            
            <div className="flex flex-col gap-4 w-full flex-1 justify-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#10B981]/10 text-[#10B981] flex items-center justify-center"><IconWallet width="20" height="20" /></div>
                  <span className="text-sm font-medium text-[#1E293B] dark:text-[#F9FAFB]">Balance Neto</span>
                </div>
                <span className="text-base font-bold text-[#10B981]">{formatMoney(balanceNeto)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center"><IconList width="20" height="20" /></div>
                  <span className="text-sm font-medium text-[#1E293B] dark:text-[#F9FAFB]">Cuentas activas</span>
                </div>
                <span className="text-base font-semibold text-[#1E293B] dark:text-[#F9FAFB]">{cuentasActivas}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#F43F5E]/10 text-[#F43F5E] flex items-center justify-center"><IconUsers width="20" height="20" /></div>
                  <span className="text-sm font-medium text-[#1E293B] dark:text-[#F9FAFB]">Deudores activos</span>
                </div>
                <span className="text-base font-semibold text-[#1E293B] dark:text-[#F9FAFB]">{deudoresActivos}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center"><IconHandCoin width="20" height="20" /></div>
                  <span className="text-sm font-medium text-[#1E293B] dark:text-[#F9FAFB]">Préstamos pendientes</span>
                </div>
                <span className="text-base font-semibold text-[#F59E0B]">{formatMoney(prestamosPendientes)}</span>
              </div>
            </div>

            {/* Último Movimiento */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#374151] w-full">
              <h4 className={`text-[10px] font-bold uppercase tracking-widest ${textMuted} mb-4`}>Último movimiento</h4>
              {ultimoMovimiento ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[12px] bg-[#E2E8F0] dark:bg-[#374151] flex items-center justify-center ${textMuted}`}><IconClock width="20" height="20" /></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB] truncate max-w-[150px] sm:max-w-xs">{cleanConcepto(ultimoMovimiento.concepto) || ultimoMovimiento.cuentaNombre}</span>
                      <span className={`text-sm font-bold ${ultimoMovimiento.tipo === 'Gasto' ? 'text-[#F43F5E]' : ultimoMovimiento.tipo === 'Ingreso' || ultimoMovimiento.tipo === 'Abono' ? 'text-[#10B981]' : 'text-[#6366F1]'}`}>
                        {ultimoMovimiento.tipo === 'Gasto' ? '-' : '+'}{formatMoney(ultimoMovimiento.monto)}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${textSecondary}`}>{new Date(ultimoMovimiento.fecha).toLocaleDateString('es-MX')}</span>
                </div>
              ) : (
                <p className={`text-sm ${textMuted}`}>Sin movimientos registrados</p>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* TABLA DE CUENTAS */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="p-6 md:px-8 border-b border-[#E2E8F0] dark:border-[#374151] flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Historial de Cuentas</h2>
          <div className="flex gap-3 w-full md:w-auto relative">
            <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className={`px-4 py-2.5 rounded-[14px] text-sm outline-none transition-all border font-medium ${isDarkMode ? 'bg-[#111827] border-[#374151] text-[#F9FAFB] focus:border-[#6366F1]' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] shadow-sm'}`} />
            <div className="relative flex-1 md:w-64">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`}><IconSearch /></span>
              <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-[14px] text-sm outline-none transition-all border font-medium ${isDarkMode ? 'bg-[#111827] border-[#374151] text-[#F9FAFB] focus:border-[#6366F1]' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] shadow-sm'}`} />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className={`p-16 text-center ${textMuted} font-medium animate-pulse`}>Cargando datos...</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#374151] bg-[#F4F7FB]/50 dark:bg-[#111827]/50">
                  {/* AJUSTE DE COLUMNAS PARA ALTA DENSIDAD Y LECTURA CONTINUA */}
                  <th className={`w-[35%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${textMuted} text-left`}>Registro</th>
                  <th className={`w-[15%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${textMuted} text-left`}>Tipo</th>
                  <th className={`w-[15%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${textMuted} text-left`}>Balance</th>
                  <th className={`w-[35%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${textMuted} text-left`}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuentas.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map(cuenta => {
                  let colorSaldo = "text-[#10B981]"; 
                  if (cuenta.balanceCuenta === 0) colorSaldo = "text-[#10B981]";
                  else if (cuenta.accountType === 'loan') colorSaldo = isDarkMode ? "text-[#D1D5DB]" : "text-[#1E293B]"; 
                  else if (cuenta.balanceCuenta < 0) colorSaldo = "text-[#F43F5E]"; 

                  let mainType = "General";
                  if (cuenta.accountType === 'loan') mainType = "Préstamo";
                  else if (cuenta.accountType === 'expense') mainType = "Gasto";
                  else if (cuenta.accountType === 'asset') mainType = "Ingreso";

                  const txFiltradas = filterMonth ? (cuenta.transacciones || []).filter(t => t.fecha.startsWith(filterMonth)) : (cuenta.transacciones || []);
                  if (filterMonth && txFiltradas.length === 0) return null;

                  const isRowOpen = expandedRows[cuenta.id];

                  return (
                    <React.Fragment key={cuenta.id}>
                      {/* --- FILA PRINCIPAL COMPACTA --- */}
                      <tr className={`border-b border-[#E2E8F0] dark:border-[#374151] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937]/50 transition-all duration-200 group ${isRowOpen ? (isDarkMode ? 'bg-[#1F2937]/50' : 'bg-[#F8FAFC]') : ''}`}>
                        <td className="px-6 py-3.5 text-left">
                          <div className={`text-[10px] font-medium tracking-widest ${textMuted} mb-1 opacity-70`}>ID {cuenta.id}</div>
                          <div className="font-medium text-base text-[#1E293B] dark:text-[#F9FAFB]">{cuenta.nombre}</div>
                        </td>
                        <td className="px-6 py-3.5 text-left">
                          <div className="flex justify-start">
                            <span className={`px-3 py-1 rounded-md text-[11px] font-medium bg-[#E2E8F0]/50 text-[#475569] dark:bg-[#374151]/50 dark:text-[#D1D5DB]`}>
                              {mainType}
                            </span>
                          </div>
                        </td>
                        <td className={`px-6 py-3.5 font-semibold text-lg tracking-tight text-left ${colorSaldo}`}>
                          {formatMoney(Math.abs(cuenta.balanceCuenta))}
                        </td>
                        <td className="px-6 py-3.5 text-left">
                          <div className="flex justify-start items-center gap-1.5">
                            <button onClick={() => toggleRow(cuenta.id)} className={`${iconBtnClass} ${isRowOpen ? 'bg-[#6366F1] text-white shadow-md' : `bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#6366F1] dark:hover:text-indigo-400`}`}>
                              <IconEye />
                            </button>
                            <button onClick={() => generarPDF(cuenta)} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#6366F1] dark:hover:text-indigo-400`}><IconPDF /></button>
                            <button onClick={() => generarCSV(cuenta)} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#10B981] dark:hover:text-emerald-400`}><IconCSV /></button>
                            <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#F59E0B] dark:hover:text-amber-400`}><IconEdit /></button>
                            <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className={`${iconBtnClass} bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white`}><IconTrash /></button>
                          </div>
                        </td>
                      </tr>

                      {/* --- SECCIÓN EXPANDIDA --- */}
                      {isRowOpen && (
                        <tr>
                          <td colSpan="4" className="p-0 bg-[#F8FAFC] dark:bg-[#0B1120]/40 border-b border-[#E2E8F0] dark:border-[#374151]">
                            <div className="p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <h4 className={`text-[11px] font-bold uppercase tracking-widest ${textMuted} mb-5 ml-2`}>Historial de movimientos</h4>
                              
                              {txFiltradas.length === 0 ? (
                                <p className={`text-sm font-medium ${textSecondary} ml-2`}>Sin movimientos en este periodo.</p>
                              ) : (
                                <div className="flex flex-col gap-3">
                                  {txFiltradas.map((t) => {
                                    let label = t.tipo;
                                    if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) label = "Préstamo";
                                    if (t.concepto && t.concepto.includes("[Abono / Pago de deuda]")) label = "Abono / Pago de deuda";
                                    
                                    let dotClass = "bg-[#64748B]";
                                    if (label === 'Ingreso' || label === 'Abono / Pago de deuda') dotClass = "bg-[#10B981]";
                                    if (label === 'Gasto') dotClass = "bg-[#F43F5E]";
                                    if (label === 'Préstamo') dotClass = "bg-[#6366F1]";

                                    return (
                                      <div key={t.id} className={`p-5 rounded-[20px] border ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'} shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3`}>
                                        
                                        <div className="flex items-center gap-3">
                                          <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`}></span>
                                          <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB] tracking-wide">{label}</span>
                                        </div>
                                        
                                        <div className="pl-5 flex flex-col gap-2">
                                          <div className={`text-xs font-medium ${textSecondary} text-left`}>
                                            {new Date(t.fecha).toLocaleDateString('es-MX')}
                                          </div>
                                          
                                          <div className="flex flex-col items-start">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${textMuted}`}>Monto</span>
                                            <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F9FAFB] text-left">{formatMoney(t.monto)}</span>
                                          </div>
                                          
                                          <div className="flex flex-col items-start">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${textMuted}`}>Concepto</span>
                                            <span className="text-sm font-medium text-[#1E293B] dark:text-[#F9FAFB] leading-relaxed text-left">
                                              {cleanConcepto(t.concepto)}
                                            </span>
                                          </div>
                                        </div>

                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              
                              {!filterMonth && txFiltradas.length > 0 && (
                                <button onClick={() => loadMoreTransactions(cuenta.id, cuenta.transacciones.length)} disabled={loadingMore} className={`mt-5 w-full max-w-sm mx-auto block py-3 text-xs font-bold uppercase tracking-wider rounded-[16px] bg-white dark:bg-[#1F2937] border border-[#E2E8F0] dark:border-[#374151] ${textSecondary} hover:text-[#6366F1] transition-colors disabled:opacity-50 shadow-sm hover:shadow-md`}>
                                  {loadingMore ? 'Cargando...' : 'Cargar historial anterior'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && <MovementModal token={token} cuentas={cuentas} isDarkMode={isDarkMode} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchDashboard(); }} showToast={showToast} />}

      {/* FAB BTN */}
      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 rounded-[24px] bg-[#6366F1] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 shadow-[0_8px_30px_rgba(99,102,241,0.4)]">
        <IconPlus />
      </button>

      {/* MODAL ELIMINAR */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-md">
          <div className={`w-full max-w-md p-8 rounded-[32px] shadow-2xl border ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
            <h3 className="text-xl font-semibold mb-2 text-center">Eliminar cuenta</h3>
            <p className={`text-sm font-medium ${textSecondary} mb-8 text-center`}>¿Seguro que deseas eliminar <strong>{deleteModal.name}</strong> y todo su historial? No podrás deshacerlo.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })} className={`flex-1 py-3.5 rounded-[16px] font-medium bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:bg-[#E2E8F0] dark:hover:bg-[#374151] transition-colors`}>Cancelar</button>
              <button onClick={confirmDelete} className="flex-1 py-3.5 rounded-[16px] font-medium bg-[#F43F5E] text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)] hover:bg-rose-600 transition-colors">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-md">
          <div className={`w-full max-w-md p-8 rounded-[32px] shadow-2xl border ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
            <h3 className="text-xl font-semibold mb-6 text-center">Renombrar cuenta</h3>
            <input type="text" value={editModal.newName} onChange={(e) => setEditModal(prev => ({ ...prev, newName: e.target.value }))} className={`w-full px-5 py-4 rounded-[20px] mb-8 outline-none border font-medium transition-all ${isDarkMode ? 'bg-[#111827] border-[#374151] focus:border-[#6366F1] text-white' : 'bg-[#F4F7FB] border-[#E2E8F0] focus:border-[#6366F1] focus:bg-white'}`} />
            <div className="flex gap-4">
              <button onClick={() => setEditModal({ isOpen: false, id: null, name: '', newName: '' })} className={`flex-1 py-3.5 rounded-[16px] font-medium bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} transition-colors`}>Cancelar</button>
              <button onClick={confirmEdit} className="flex-1 py-3.5 rounded-[16px] font-medium bg-[#6366F1] text-white shadow-[0_8px_20px_rgba(99,102,241,0.25)] transition-colors">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// FORMULARIO MODAL OPTIMIZADO (UX PROFESIONAL)
// ==========================================
function MovementModal({ token, cuentas, isDarkMode, onClose, onSuccess, showToast }) {
  const [tipo, setTipo] = useState('Ingreso');
  const [categoria, setCategoria] = useState('');
  const [modo, setModo] = useState('EXISTING');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [cuentaId, setCuentaId] = useState('');
  const [origenId, setOrigenId] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [concepto, setConcepto] = useState('');
  const [loading, setLoading] = useState(false);

  const isAbono = tipo === 'Préstamo' && categoria === 'Abono / Pago de deuda';
  const isPrestamoOut = tipo === 'Préstamo' && categoria && !isAbono;
  
  const sourceAccounts = cuentas.filter(c => c.canBeSourceOfFunds);
  const loanAccounts = cuentas.filter(c => c.accountType === 'loan');

  const handleTypeChange = (t) => {
    setTipo(t);
    setCategoria('');
    setCuentaId('');
    setOrigenId('');
    setModo('EXISTING');
  };

  const handleCatChange = (val) => {
    setCategoria(val);
  };

  const getCategorias = () => {
    switch (tipo) {
      case 'Ingreso':
        return ['Nómina / Salario', 'Comisiones', 'Ventas', 'Bono', 'Otros ingresos'];
      case 'Gasto':
        return ['Comida y despensa', 'Transporte / Gasolina', 'Vivienda y servicios', 'Salud', 'Educación', 'Ocio y entretenimiento', 'Otros gastos'];
      case 'Préstamo':
        return ['Préstamo personal', 'Préstamo familiar', 'Préstamo laboral', 'Otro préstamo', 'Abono / Pago de deuda'];
      default:
        return [];
    }
  };

  const handleMontoChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setMonto('');
      return;
    }
    setMonto(formatMoney(parseInt(rawValue, 10)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (tipo !== 'Transferencia' && !categoria) {
      return showToast("Selecciona una categoría para continuar.", "error");
    }

    const finalMonto = parseFloat(monto.replace(/[^0-9]/g, ''));
    if (!finalMonto || isNaN(finalMonto)) return showToast("Monto inválido", "error");

    setLoading(true);

    try {
      if ((tipo === 'Gasto' || isPrestamoOut || tipo === 'Transferencia') && origenId) {
        const acc = cuentas.find(c => c.id === Number(origenId));
        if (acc && acc.balanceCuenta < finalMonto) {
            setLoading(false);
            return showToast("Saldo insuficiente en la cuenta de origen.", "error");
        }
      }

      if (tipo === 'Transferencia') {
        if (!origenId || !cuentaId) {
          setLoading(false); return showToast("Selecciona origen y destino", "error");
        }
        if (origenId === cuentaId) {
          setLoading(false); return showToast("El origen y destino deben ser distintos", "error");
        }

        const origenName = cuentas.find(c => c.id === Number(origenId))?.nombre || "Origen";
        const targetName = cuentas.find(c => c.id === Number(cuentaId))?.nombre || "Destino";

        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ cuentaId: Number(origenId), tipo: "Gasto", monto: finalMonto, concepto: `[Transferencia] Enviado a ${targetName}`, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
        });

        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ cuentaId: Number(cuentaId), tipo: "Ingreso", monto: finalMonto, concepto: `[Transferencia] Recibido de ${origenName}`, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
        });

        onSuccess();
        return;
      }

      if (isAbono) {
        const deudorName = cuentas.find(c => c.id === Number(cuentaId))?.nombre || "Deudor";
        
        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ cuentaId: Number(cuentaId), tipo: "Ingreso", monto: finalMonto, concepto: `[Abono / Pago de deuda] ${concepto}`.trim(), fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
        });

        if (origenId) {
          await fetch(`${API}/movimientos`, { 
            method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
            body: JSON.stringify({ cuentaId: Number(origenId), tipo: "Ingreso", monto: finalMonto, concepto: `[Abono / Pago de deuda] recibido de ${deudorName}`, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
          });
        }
        
        onSuccess();
        return;
      }

      let targetId = cuentaId;
      let targetName = "";

      if (modo === "NEW") {
        const res = await fetch(`${API}/cuentas`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ nombre: nombreNuevo, monto: 0 }) 
        });
        const data = await res.json();
        targetId = data.id; targetName = data.nombre;
      } else {
        targetName = cuentas.find(c => c.id === Number(cuentaId))?.nombre || "Cuenta";
      }

      const conceptoFinal = `[${categoria}] ${concepto}`.trim();
      
      await fetch(`${API}/movimientos`, { 
        method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
        body: JSON.stringify({ cuentaId: Number(targetId), tipo, monto: finalMonto, concepto: conceptoFinal, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
      });

      if ((isPrestamoOut || tipo === 'Gasto') && origenId) {
        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ cuentaId: Number(origenId), tipo: "Gasto", monto: finalMonto, concepto: tipo === "Préstamo" ? `[Préstamo Otorgado] a ${targetName}` : `[Pago de] ${targetName}`, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
        });
      }

      onSuccess();
    } catch (error) { 
      showToast("Error al registrar movimiento", "error"); 
    } finally { 
      setLoading(false); 
    }
  };

  const inputClass = `w-full px-5 py-4 rounded-[20px] outline-none border font-medium transition-all ${isDarkMode ? 'bg-[#111827] border-[#374151] text-[#F9FAFB] focus:border-[#6366F1]' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]'}`;
  const labelClass = `block text-[11px] font-semibold uppercase tracking-widest ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]'} mb-2 ml-1`;
  const textMuted = isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-md p-8 rounded-[32px] shadow-2xl my-8 border animate-in zoom-in-95 ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-[#F7F9FC] border-[#E2E8F0]'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Registro</h2>
          <button type="button" onClick={onClose} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${textMuted} hover:bg-[#E2E8F0] dark:hover:bg-[#374151] transition-colors`}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className={labelClass}>Tipo de Acción</label>
            <div className={`flex gap-1 p-1.5 rounded-[20px] border overflow-x-auto ${isDarkMode ? 'bg-[#111827] border-[#374151]' : 'bg-[#E2E8F0]/50 border-transparent'}`}>
              {['Ingreso', 'Gasto', 'Transferencia', 'Préstamo'].map(t => (
                <button 
                  key={t} type="button" 
                  onClick={() => handleTypeChange(t)} 
                  className={`flex-1 min-w-[70px] py-3 text-[11px] font-medium uppercase tracking-wider rounded-[16px] transition-all ${tipo === t ? 'bg-white dark:bg-[#1F2937] text-[#1E293B] dark:text-white shadow-sm' : `${textMuted} hover:text-[#1E293B] dark:hover:text-white`}`}
                >
                  {t === 'Transferencia' ? 'Transf.' : t}
                </button>
              ))}
            </div>
          </div>

          {tipo === 'Préstamo' && (
            <div>
              <label className={labelClass}>Categoría</label>
              <select value={categoria} onChange={e => handleCatChange(e.target.value)} className={inputClass}>
                <option value="" disabled>-- Seleccionar categoría --</option>
                {getCategorias().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {tipo === 'Transferencia' ? (
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Cuenta Origen (Descuento)</label>
                <select required value={origenId} onChange={e => setOrigenId(e.target.value)} className={inputClass}>
                  <option value="" disabled>-- Selecciona de dónde sale --</option>
                  {sourceAccounts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Cuenta Destino (Ingreso)</label>
                <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
                  <option value="" disabled>-- Selecciona a dónde llega --</option>
                  {sourceAccounts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
            </div>
          ) : (tipo !== 'Préstamo' || categoria) ? (
            <div className="space-y-6">
              <div>
                <label className={labelClass}>
                  {isAbono ? 'Deudor' : 'Registro o Persona destino'}
                </label>
                
                {isAbono ? (
                  <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
                    <option value="" disabled>-- Seleccionar deudor --</option>
                    {loanAccounts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                ) : (
                  <>
                    <select value={modo} onChange={(e) => setModo(e.target.value)} className={`${inputClass} mb-4`}>
                      <option value="EXISTING">Seleccionar registro existente</option>
                      <option value="NEW">Crear nuevo registro</option>
                    </select>

                    {modo === "NEW" ? (
                      <input type="text" placeholder="Escribe el nuevo nombre" required value={nombreNuevo} onChange={e => setNombreNuevo(e.target.value)} className={inputClass} />
                    ) : (
                      <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
                        <option value="" disabled>-- Selecciona el registro --</option>
                        {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                      </select>
                    )}
                  </>
                )}
              </div>

              {isAbono && (
                <div>
                  <label className={labelClass}>¿A qué cuenta regresa el dinero?</label>
                  <select value={origenId} onChange={e => setOrigenId(e.target.value)} className={inputClass}>
                    <option value="">No registrar en otra cuenta</option>
                    {sourceAccounts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              )}

              {(isPrestamoOut || tipo === 'Gasto') && (
                <div>
                  <label className={labelClass}>¿De qué cuenta saldrá el dinero?</label>
                  <select value={origenId} onChange={e => setOrigenId(e.target.value)} className={inputClass}>
                    <option value="">No descontar (solo registrar el movimiento)</option>
                    {sourceAccounts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              )}
            </div>
          ) : null}

          {(tipo !== 'Préstamo' || categoria) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Monto</label>
                <input type="text" placeholder="$0" required value={monto} onChange={handleMontoChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Fecha</label>
                <input type="date" required value={fecha} onChange={e => setFecha(e.target.value)} className={inputClass} />
              </div>
            </div>
          )}

          {(tipo === 'Ingreso' || tipo === 'Gasto') && (
            <div>
              <label className={labelClass}>Categoría</label>
              <select value={categoria} onChange={e => handleCatChange(e.target.value)} className={inputClass}>
                <option value="" disabled>-- Seleccionar categoría --</option>
                {getCategorias().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {(tipo !== 'Préstamo' || categoria) && tipo !== 'Transferencia' && (
            <div>
              <label className={labelClass}>Concepto</label>
              <textarea 
                placeholder="Ej. Salario quincenal, Pago de internet..." 
                value={concepto} 
                onChange={e => setConcepto(e.target.value)} 
                className={`${inputClass} resize-none h-24 py-4`} 
              />
            </div>
          )}

          <button type="submit" disabled={loading} className={`w-full mt-8 py-4 rounded-[20px] font-medium tracking-wide text-white transition-all active:scale-[0.98] ${loading ? 'opacity-50' : 'bg-[#6366F1] hover:bg-indigo-500 shadow-[0_8px_20px_rgba(99,102,241,0.25)]'}`}>
            {loading ? 'Procesando...' : 'Confirmar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
}
