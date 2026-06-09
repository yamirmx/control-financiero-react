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
// FORMATEO MONETARIO GLOBAL (MXN)
// ==========================================
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
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
const IconWallet = () => <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;

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
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js");
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
      
      {/* Sistema de Toasts Premium */}
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
// DASHBOARD
// ==========================================
function Dashboard({ token, userEmail, handleLogout, isDarkMode, toggleTheme, showToast }) {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, id: null, name: '', newName: '' });
  const [refundModal, setRefundModal] = useState({ isOpen: false, targetId: null, targetName: '', options: [], selectedId: '', monto: 0, fecha: '' });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      if (Array.isArray(data)) {
        data.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
        setCuentas(data);
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
      setCuentas(prev => prev.map(c => c.id === cuentaId ? { ...c, transacciones: [...c.transacciones, ...nuevasTx] } : c));
    } catch (e) {
      showToast("Error al cargar historial", "error");
    } finally {
      setLoadingMore(false);
    }
  };

  // ==========================================
  // LÓGICA FINANCIERA CORREGIDA Y AISLADA
  // ==========================================
  const metricas = useMemo(() => {
    let ingresos = 0, gastos = 0, deuda = 0;
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();

    cuentas.forEach(u => {
      const txs = u.transacciones || [];
      
      // Si la cuenta tiene al menos un préstamo donde el usuario es el prestamista, es Cuenta por Cobrar
      const isLoanAccount = txs.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
      
      let balanceCuenta = 0;
      txs.forEach(t => {
         if(t.tipo === 'Ingreso' || t.tipo === 'Abono') balanceCuenta += t.monto;
         if(t.tipo === 'Gasto' || t.tipo === 'Préstamo') balanceCuenta -= t.monto;
      });

      // Cálculo de DEUDA ACTIVA (Sólo el dinero que realmente te deben en las Cuentas por Cobrar)
      if (isLoanAccount) {
        if (balanceCuenta < 0) deuda += Math.abs(balanceCuenta);
      }

      // Cálculo de INGRESOS y GASTOS (Se ignoran las Cuentas por Cobrar para no mezclar)
      if (!isLoanAccount) {
        txs.forEach(t => {
          const fechaTx = new Date(t.fecha);
          if (fechaTx.getMonth() === mesActual && fechaTx.getFullYear() === anioActual) {
            const concepto = t.concepto || "";
            
            // FILTROS ESTRICTOS: No considerar transferencias ni devoluciones de préstamos
            // Incluimos [Pago de] para ignorar los descuentos secundarios de gastos con otra cuenta
            const isTransfer = concepto.includes("[Transferencia]") || concepto.includes("[Pago de]");
            const isCapitalDevuelto = concepto.includes("[Capital Devuelto]");
            const isPrestamoOtorgado = concepto.includes("[Préstamo Otorgado]");

            if (t.tipo === "Ingreso" && !isTransfer && !isCapitalDevuelto) {
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

  const toggleRow = (id) => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

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
      csvContent += `${new Date(t.fecha).toLocaleDateString()},${tipo},${t.monto},${(t.concepto || "-").replace(/,/g, " ")}\n`;
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
    doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text("Estado de Cuenta", 14, 20); 
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text(`Registro: ${cuenta.nombre}`, 14, 28);
    
    const tablaDatos = (cuenta.transacciones || []).map(t => {
      let tipo = t.tipo;
      if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipo = "Préstamo";
      return [ tipo, `${formatMoney(t.monto)}`, new Date(t.fecha).toLocaleDateString(), t.concepto || "-" ];
    });

    doc.autoTable({ startY: 35, head: [['Tipo', 'Monto', 'Fecha', 'Concepto']], body: tablaDatos, headStyles: { fillColor: [99, 102, 241] } });
    doc.save(`Estado_Cuenta_${cuenta.nombre}.pdf`);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    if (!refundModal.selectedId) return setRefundModal(prev => ({ ...prev, isOpen: false }));
    try {
      await fetch(`${API}/movimientos`, {
        method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
          cuentaId: Number(refundModal.selectedId), tipo: "Ingreso", monto: refundModal.monto,
          concepto: `[Capital Devuelto] Abono de ${refundModal.targetName}`,
          fecha: refundModal.fecha ? new Date(refundModal.fecha + "T12:00:00").toISOString() : new Date().toISOString()
        })
      });
      setRefundModal(prev => ({ ...prev, isOpen: false }));
      fetchDashboard();
    } catch (error) {}
  };

  const chartData = useMemo(() => {
    const total = metricas.ingresos + metricas.gastos + metricas.deuda;
    if (total === 0) return null;
    const r = 50; const circ = 2 * Math.PI * r;
    return {
      r, circ,
      ingDash: `${(metricas.ingresos / total) * circ} ${circ}`,
      gasDash: `${(metricas.gastos / total) * circ} ${circ}`,
      deuDash: `${(metricas.deuda / total) * circ} ${circ}`,
      gasOffset: -((metricas.ingresos / total) * circ),
      deuOffset: -(((metricas.ingresos + metricas.gastos) / total) * circ)
    };
  }, [metricas]);

  // Constantes de estilo premium adaptadas a Soft UI / Notion
  const cardClass = `rounded-[32px] transition-all border ${isDarkMode ? 'bg-[#1F2937] border-[#374151] shadow-2xl' : 'bg-[#F7F9FC] border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}`;
  const iconBtnClass = `w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95`;
  const textMuted = isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]';
  const textSecondary = isDarkMode ? 'text-[#D1D5DB]' : 'text-[#475569]';

  // === EMPTY STATE DEL DASHBOARD ===
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

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${cardClass} p-8 flex flex-col justify-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Ingresos (Mes)</p>
          <h2 className="text-[40px] font-semibold text-[#10B981] tracking-tighter leading-none"><AnimatedCounter value={metricas.ingresos} /></h2>
        </div>
        <div className={`${cardClass} p-8 flex flex-col justify-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Gastos (Mes)</p>
          <h2 className="text-[40px] font-semibold text-[#F43F5E] tracking-tighter leading-none"><AnimatedCounter value={metricas.gastos} /></h2>
        </div>
        <div className={`${cardClass} p-8 flex flex-col justify-center`}>
          <p className={`uppercase tracking-widest text-xs font-medium ${textMuted} mb-2`}>Deuda Activa (A tu favor)</p>
          <h2 className="text-[40px] font-semibold text-[#1E293B] dark:text-[#F9FAFB] tracking-tighter leading-none"><AnimatedCounter value={metricas.deuda} /></h2>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className={`${cardClass} mb-8 flex flex-col justify-center items-center py-12 px-6`}>
        {chartData ? (
          <div className="flex flex-col sm:flex-row items-center gap-12 justify-center w-full">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 120 120" className="transform -rotate-90 drop-shadow-xl">
                <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#273449' : '#E2E8F0'} strokeWidth="12" />
                <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray={chartData.ingDash} />
                <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#F43F5E" strokeWidth="12" strokeDasharray={chartData.gasDash} strokeDashoffset={chartData.gasOffset} />
                <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#FFFFFF' : '#1E293B'} strokeWidth="12" strokeDasharray={chartData.deuDash} strokeDashoffset={chartData.deuOffset} />
              </svg>
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#10B981]"></span> <span className={textSecondary}>Ingresos</span> <span className="text-[#1E293B] dark:text-[#F9FAFB] ml-auto font-semibold">{((metricas.ingresos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#F43F5E]"></span> <span className={textSecondary}>Gastos</span> <span className="text-[#1E293B] dark:text-[#F9FAFB] ml-auto font-semibold">{((metricas.gastos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
              <div className="flex items-center gap-3"><span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white' : 'bg-[#1E293B]'}`}></span> <span className={textSecondary}>Deuda Activa</span> <span className="text-[#1E293B] dark:text-[#F9FAFB] ml-auto font-semibold">{((metricas.deuda / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
            </div>
          </div>
        ) : (
          <p className={`${textMuted} font-medium text-sm`}>Registra movimientos para visualizar tu actividad</p>
        )}
      </div>

      {/* TABLA DE CUENTAS */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="p-6 md:px-8 border-b border-[#E2E8F0] dark:border-[#374151] flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Directorio de Cuentas</h2>
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
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#374151] bg-[#F4F7FB]/50 dark:bg-[#111827]/50">
                  <th className={`px-8 py-4 text-[11px] font-medium uppercase tracking-widest ${textMuted}`}>Registro / Categoría</th>
                  <th className={`px-8 py-4 text-[11px] font-medium uppercase tracking-widest ${textMuted}`}>Balance</th>
                  <th className={`px-8 py-4 text-[11px] font-medium uppercase tracking-widest ${textMuted} text-right`}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuentas.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map(cuenta => {
                  const txs = cuenta.transacciones || [];
                  const isLoan = txs.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
                  
                  let balanceCuenta = 0;
                  txs.forEach(t => {
                     if(t.tipo === 'Ingreso' || t.tipo === 'Abono') balanceCuenta += t.monto;
                     if(t.tipo === 'Gasto' || t.tipo === 'Préstamo') balanceCuenta -= t.monto;
                  });

                  let colorSaldo = "text-[#10B981]"; 
                  if (balanceCuenta === 0) colorSaldo = "text-[#10B981]";
                  else if (isLoan) colorSaldo = isDarkMode ? "text-[#D1D5DB]" : "text-[#1E293B]"; 
                  else if (balanceCuenta < 0) colorSaldo = "text-[#F43F5E]"; 

                  const txFiltradas = filterMonth ? txs.filter(t => t.fecha.startsWith(filterMonth)) : txs;
                  if (filterMonth && txFiltradas.length === 0) return null;

                  return (
                    <React.Fragment key={cuenta.id}>
                      <tr className="border-b border-[#E2E8F0] dark:border-[#374151] hover:bg-white dark:hover:bg-[#273449] transition-all duration-200 group">
                        <td className="px-8 py-6">
                          <div className={`text-[10px] font-medium tracking-widest ${textMuted} mb-1 opacity-70`}>ID {cuenta.id}</div>
                          <div className="font-medium text-base">{cuenta.nombre}</div>
                        </td>
                        <td className={`px-8 py-6 font-semibold text-xl tracking-tight ${colorSaldo}`}>
                          {formatMoney(Math.abs(balanceCuenta))}
                        </td>
                        <td className="px-8 py-6 flex justify-end gap-2">
                          <button onClick={() => toggleRow(cuenta.id)} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#6366F1] dark:hover:text-indigo-400`}><IconEye /></button>
                          <button onClick={() => generarPDF(cuenta)} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#6366F1] dark:hover:text-indigo-400`}><IconPDF /></button>
                          <button onClick={() => generarCSV(cuenta)} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#10B981] dark:hover:text-emerald-400`}><IconCSV /></button>
                          <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className={`${iconBtnClass} bg-[#F4F7FB] dark:bg-[#111827] ${textSecondary} hover:text-[#F59E0B] dark:hover:text-amber-400`}><IconEdit /></button>
                          <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className={`${iconBtnClass} bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white`}><IconTrash /></button>
                        </td>
                      </tr>
                      {expandedRows[cuenta.id] && (
                        <tr>
                          <td colSpan="3" className="p-0 bg-[#F4F7FB]/50 dark:bg-[#111827]/50 border-b border-[#E2E8F0] dark:border-[#374151]">
                            <div className="px-8 py-6">
                              {txFiltradas.length === 0 ? (
                                <p className={`text-sm font-medium ${textSecondary}`}>Sin movimientos en este periodo.</p>
                              ) : (
                                <div>
                                  <table className="w-full text-sm">
                                    <tbody>
                                      {txFiltradas.map(t => {
                                        let label = t.tipo;
                                        if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) label = "Préstamo";
                                        
                                        let badgeClass = "bg-[#E2E8F0] text-[#64748B] dark:bg-[#374151] dark:text-[#D1D5DB]";
                                        if (label === 'Ingreso' || label === 'Abono') badgeClass = "bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/20";
                                        if (label === 'Gasto') badgeClass = "bg-[#F43F5E]/10 text-[#F43F5E] dark:bg-[#F43F5E]/20";
                                        if (label === 'Préstamo') badgeClass = "bg-[#6366F1]/10 text-[#6366F1] dark:bg-[#6366F1]/20";

                                        return (
                                          <tr key={t.id} className="border-b border-dashed border-[#E2E8F0] dark:border-[#374151] last:border-0 hover:bg-white/50 dark:hover:bg-[#1F2937]/50 transition-colors">
                                            <td className={`py-4 ${textSecondary} w-32 font-medium`}>{new Date(t.fecha).toLocaleDateString()}</td>
                                            <td className="py-4 w-32">
                                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider ${badgeClass}`}>{label}</span>
                                            </td>
                                            <td className={`py-4 font-medium ${textSecondary}`}>{t.concepto || "-"}</td>
                                            <td className="py-4 font-semibold text-right text-[#1E293B] dark:text-[#F9FAFB]">{formatMoney(t.monto)}</td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                  {!filterMonth && txFiltradas.length > 0 && (
                                    <button onClick={() => loadMoreTransactions(cuenta.id, cuenta.transacciones.length)} disabled={loadingMore} className={`mt-4 px-5 py-2 text-xs font-medium uppercase tracking-wider rounded-xl bg-white dark:bg-[#1F2937] border border-[#E2E8F0] dark:border-[#374151] ${textSecondary} hover:text-[#6366F1] transition-colors disabled:opacity-50`}>
                                      {loadingMore ? 'Cargando...' : 'Cargar historial anterior'}
                                    </button>
                                  )}
                                </div>
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

      {isModalOpen && <MovementModal token={token} cuentas={cuentas} isDarkMode={isDarkMode} onClose={() => setIsModalOpen(false)} onSuccess={(refundData) => { setIsModalOpen(false); fetchDashboard(); if (refundData) { setRefundModal({ isOpen: true, targetId: refundData.targetId, targetName: refundData.targetName, options: cuentas.filter(c => c.id !== refundData.targetId), selectedId: '', monto: refundData.monto, fecha: refundData.fecha }); } }} showToast={showToast} />}

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

      {/* MODAL REEMBOLSO */}
      {refundModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-md">
          <form onSubmit={handleRefundSubmit} className={`w-full max-w-md p-8 rounded-[32px] shadow-2xl border ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
            <h3 className="text-xl font-semibold mb-2 text-center">Devolver capital</h3>
            <p className={`text-sm font-medium ${textSecondary} mb-8 text-center`}>Elige la cuenta destino para retornar el pago de <strong>{refundModal.targetName}</strong>.</p>
            <select required value={refundModal.selectedId} onChange={(e) => setRefundModal(prev => ({ ...prev, selectedId: e.target.value }))} className={`w-full px-5 py-4 rounded-[20px] mb-8 outline-none border font-medium cursor-pointer ${isDarkMode ? 'bg-[#111827] border-[#374151] text-[#F9FAFB]' : 'bg-[#F4F7FB] border-[#E2E8F0]'}`}>
              <option value="" disabled>-- Elige destino --</option>
              {refundModal.options.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
            </select>
            <div className="flex flex-col gap-3">
              <button type="submit" className="w-full py-3.5 rounded-[16px] font-medium bg-[#10B981] text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition-colors">Confirmar devolución</button>
              <button type="button" onClick={() => setRefundModal(prev => ({ ...prev, isOpen: false }))} className={`w-full py-3.5 rounded-[16px] font-medium ${textSecondary} hover:bg-[#F4F7FB] dark:hover:bg-[#111827] transition-colors`}>Dejar como efectivo (Saltar)</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SOLUCIÓN: MOVEMENT MODAL Y ENTRADA DE TEXTO
// ==========================================
function MovementModal({ token, cuentas, isDarkMode, onClose, onSuccess, showToast }) {
  const [tipo, setTipo] = useState('Ingreso');
  const [modo, setModo] = useState('EXISTING');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [cuentaId, setCuentaId] = useState('');
  const [origenId, setOrigenId] = useState('');
  
  // Aquí se maneja el formato en tiempo real
  const [monto, setMonto] = useState('');
  
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [categoria, setCategoria] = useState('General');
  const [concepto, setConcepto] = useState('');
  const [loading, setLoading] = useState(false);

  // Formateador en vivo
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
    const finalMonto = parseFloat(monto.replace(/[^0-9]/g, ''));
    if (!finalMonto || isNaN(finalMonto)) return showToast("Monto inválido", "error");

    setLoading(true);

    try {
      // ==== FLUJO TRANSFERENCIA Pura ====
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

        onSuccess(null);
        return;
      }

      // ==== FLUJO: INGRESO, GASTO, PRÉSTAMO ====
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

      const conceptoFinal = tipo === "Préstamo" ? concepto : (categoria !== "General" ? `[${categoria}] ${concepto}`.trim() : concepto);
      
      // Registro el movimiento principal
      await fetch(`${API}/movimientos`, { 
        method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
        body: JSON.stringify({ cuentaId: Number(targetId), tipo, monto: finalMonto, concepto: conceptoFinal, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
      });

      // ¡AQUÍ ESTÁ LA NUEVA LÓGICA EXCLUSIVA PARA GASTO Y PRÉSTAMO!
      // Si elegiste una cuenta de origen para que se descuente...
      if ((tipo === 'Préstamo' || tipo === 'Gasto') && origenId) {
        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
          body: JSON.stringify({ cuentaId: Number(origenId), tipo: "Gasto", monto: finalMonto, concepto: tipo === "Préstamo" ? `[Préstamo Otorgado] a ${targetName}` : `[Pago de] ${targetName}`, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
        });
      }

      // Si fue un abono a una cuenta de préstamo, activamos el reembolso hacia nuestro banco
      let refundObject = null;
      if (tipo === "Ingreso") {
        const targetCuenta = cuentas.find(c => c.id === Number(targetId));
        if (targetCuenta?.transacciones?.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")))) {
          refundObject = { targetId, targetName, monto: finalMonto, fecha };
        }
      }
      
      onSuccess(refundObject);
    } catch (error) { 
      showToast("Error al registrar movimiento", "error"); 
    } finally { 
      setLoading(false); 
    }
  };

  const inputClass = `w-full px-5 py-4 rounded-[20px] outline-none border font-medium transition-all ${isDarkMode ? 'bg-[#111827] border-[#374151] text-[#F9FAFB] focus:border-[#6366F1]' : 'bg-white border-[#E2E8F0] focus:border-[#6366F1] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]'}`;
  const textMuted = isDarkMode ? 'text-[#9CA3AF]' : 'text-[#64748B]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-md p-8 rounded-[32px] shadow-2xl my-8 border animate-in zoom-in-95 ${isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-[#F7F9FC] border-[#E2E8F0]'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Registro</h2>
          <button onClick={onClose} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${textMuted} hover:bg-[#E2E8F0] dark:hover:bg-[#374151] transition-colors`}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`flex gap-1 p-1.5 rounded-[20px] border overflow-x-auto ${isDarkMode ? 'bg-[#111827] border-[#374151]' : 'bg-[#E2E8F0]/50 border-transparent'}`}>
            {['Ingreso', 'Gasto', 'Transferencia', 'Préstamo'].map(t => (
              <button 
                key={t} type="button" onClick={() => setTipo(t)} 
                className={`flex-1 min-w-[70px] py-3 text-[11px] font-medium uppercase tracking-wider rounded-[16px] transition-all ${tipo === t ? 'bg-white dark:bg-[#1F2937] text-[#1E293B] dark:text-white shadow-sm' : `${textMuted} hover:text-[#1E293B] dark:hover:text-white`}`}
              >
                {t === 'Transferencia' ? 'Transf.' : t}
              </button>
            ))}
          </div>

          {tipo === 'Transferencia' ? (
            <div className={`p-5 rounded-[20px] border mb-4 ${isDarkMode ? 'bg-[#111827] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
              <label className={`block text-xs font-medium ${textMuted} uppercase tracking-widest mb-2`}>Cuenta Origen (Descuento)</label>
              <select required value={origenId} onChange={e => setOrigenId(e.target.value)} className={`${inputClass} mb-4`}>
                <option value="" disabled>-- Selecciona de dónde sale --</option>
                {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <label className={`block text-xs font-medium ${textMuted} uppercase tracking-widest mb-2`}>Cuenta Destino (Ingreso)</label>
              <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
                <option value="" disabled>-- Selecciona a dónde llega --</option>
                {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
          ) : (
            <>
              <select value={modo} onChange={(e) => setModo(e.target.value)} className={inputClass}>
                <option value="EXISTING">Seleccionar cuenta existente</option>
                <option value="NEW">Crear nueva cuenta/persona</option>
              </select>

              {modo === "NEW" ? (
                <input type="text" placeholder="Nombre" required value={nombreNuevo} onChange={e => setNombreNuevo(e.target.value)} className={inputClass} />
              ) : (
                <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
                  <option value="" disabled>-- Selecciona el registro --</option>
                  {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              )}
            </>
          )}

          <div className="flex gap-4">
            {/* Input monetario con máscara en tiempo real */}
            <input type="text" placeholder="$0" required value={monto} onChange={handleMontoChange} className={inputClass} />
            <input type="date" required value={fecha} onChange={e => setFecha(e.target.value)} className={inputClass} />
          </div>

          {/* SÓLO VISIBLE EN PRÉSTAMO Y GASTO */}
          {(tipo === 'Préstamo' || tipo === 'Gasto') && (
            <div className={`p-5 rounded-[20px] border mt-2 ${isDarkMode ? 'bg-[#111827] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
              <label className={`block text-[11px] font-medium ${textMuted} uppercase tracking-widest mb-2`}>¿Descontar de alguna cuenta tuya?</label>
              <select value={origenId} onChange={e => setOrigenId(e.target.value)} className={`${inputClass} !py-3`}>
                <option value="">No descontar (Solo registrar {tipo === 'Préstamo' ? 'la deuda' : 'el gasto'})</option>
                {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
          )}

          {(tipo === 'Gasto' || tipo === 'Ingreso') && (
            <select value={categoria} onChange={e => setCategoria(e.target.value)} className={inputClass}>
              <option value="General">Categoría: General</option>
              <option value="Comida">Comida y Despensa</option>
              <option value="Transporte">Transporte / Gasolina</option>
              <option value="Vivienda">Vivienda y Servicios</option>
              <option value="Entretenimiento">Ocio y Entretenimiento</option>
              <option value="Pago Tarjeta/Deuda">Pago de Deuda</option>
              <option value="Nómina/Salario">Nómina / Salario</option>
            </select>
          )}

          <input type="text" placeholder="Concepto o descripción (opcional)" value={concepto} onChange={e => setConcepto(e.target.value)} className={inputClass} />

          <button type="submit" disabled={loading} className={`w-full mt-4 py-4 rounded-[20px] font-medium tracking-wide text-white transition-all active:scale-[0.98] ${loading ? 'opacity-50' : 'bg-[#6366F1] hover:bg-indigo-500 shadow-[0_8px_20px_rgba(99,102,241,0.25)]'}`}>
            {loading ? 'Procesando...' : (tipo === 'Transferencia' ? 'Realizar Transferencia' : 'Confirmar Movimiento')}
          </button>
        </form>
      </div>
    </div>
  );
}
