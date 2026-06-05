import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================
const API = "https://control-backend-ndpz.onrender.com";

// Cargador dinámico de scripts externos para evitar errores de compilación
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

// Componente FinTech Counter para animar números de forma fluida
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

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toLocaleString('en-US')}</>;
}

// Iconos SVG 
const IconSun = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const IconMoon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const IconLogout = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const IconTrash = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;

// ==========================================
// COMPONENTE PRINCIPAL (APP)
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

  // Carga dinámica de librerías PDF en segundo plano al montar la app
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
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Sistema de Toasts Integrado */}
      {toast.show && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-2xl z-50 transform transition-all flex items-center gap-3 animate-bounce
          ${toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white'}`}>
          <span className="font-semibold">{toast.msg}</span>
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
// COMPONENTE: PANTALLA DE AUTENTICACIÓN
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error de autenticación');

      setToken(data.token);
      setUserEmail(data.user.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
      showToast(`¡Bienvenido!`, 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100 dark:bg-slate-950 transition-colors">
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 mb-4 text-3xl">
            💰
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {isRegisterMode ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="ml-1 text-indigo-500 font-semibold hover:underline">
              {isRegisterMode ? 'Ingresa aquí' : 'Regístrate gratis'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-5 py-4 rounded-xl outline-none transition-all ${isDarkMode ? 'bg-slate-950 focus:bg-slate-950 border border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 focus:bg-white border border-transparent focus:border-indigo-400 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] text-slate-800'}`} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-5 py-4 rounded-xl outline-none transition-all ${isDarkMode ? 'bg-slate-950 focus:bg-slate-950 border border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 focus:bg-white border border-transparent focus:border-indigo-400 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] text-slate-800'}`} 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : (isRegisterMode ? 'Registrarme' : 'Ingresar')}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: DASHBOARD PRINCIPAL
// ==========================================
function Dashboard({ token, userEmail, handleLogout, isDarkMode, toggleTheme, showToast }) {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  // Estados para Modals de Confirmación de UI Reemplazando SweetAlert2
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

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Cálculos Automáticos Reactivos de Métricas
  const metricas = useMemo(() => {
    let ingresos = 0;
    let gastos = 0;
    let deuda = 0;
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();

    cuentas.forEach(u => {
      const transacciones = u.transacciones || [];
      const esPrestamoHistorial = transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
      
      if (esPrestamoHistorial) deuda += Math.abs(u.monto);

      transacciones.forEach(t => {
        const fechaTx = new Date(t.fecha);
        if (fechaTx.getMonth() === mesActual && fechaTx.getFullYear() === anioActual) {
          const esDescuentoGasto = t.concepto && t.concepto.includes("[Pago de Gasto]");
          const esOtorgamientoPrestamo = t.concepto && t.concepto.includes("[Préstamo Otorgado]");
          const esDevolucionCapital = t.concepto && t.concepto.includes("[Capital Devuelto]");

          if (t.tipo === "Gasto" && !esDescuentoGasto && !esOtorgamientoPrestamo) gastos += t.monto;
          if ((t.tipo === "Ingreso" || t.tipo === "Abono") && !esPrestamoHistorial && !esDevolucionCapital) ingresos += t.monto;
        }
      });
    });

    return { ingresos, gastos, deuda };
  }, [cuentas]);

  const toggleRow = (id) => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const confirmDelete = async () => {
    try {
      await fetch(`${API}/cuentas/${deleteModal.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      showToast("Cuenta eliminada", "success");
      setDeleteModal({ isOpen: false, id: null, name: '' });
      fetchDashboard();
    } catch (e) { 
      showToast("Error al eliminar", "error"); 
    }
  };

  const confirmEdit = async () => {
    if (!editModal.newName.trim()) {
      showToast("El nombre no puede estar vacío", "error");
      return;
    }
    try {
      await fetch(`${API}/cuentas/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nombre: editModal.newName })
      });
      showToast("Actualizado correctamente", "success");
      setEditModal({ isOpen: false, id: null, name: '', newName: '' });
      fetchDashboard();
    } catch (e) { 
      showToast("Error al actualizar", "error"); 
    }
  };

  const generarCSV = (cuenta) => {
    const esPrestamo = cuenta.transacciones && cuenta.transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
    let csvContent = "Fecha,Tipo,Monto,Concepto\n";

    if (cuenta.transacciones) {
      cuenta.transacciones.forEach(t => {
        let tipoEtiqueta = t.tipo;
        if (esPrestamo) {
          if (t.tipo === "Gasto" || t.tipo === "Préstamo") tipoEtiqueta = "Préstamo";
          if (t.tipo === "Ingreso" || t.tipo === "Abono") tipoEtiqueta = "Abono";
        }
        if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipoEtiqueta = "Préstamo";
        
        const conceptoLimpio = (t.concepto || "-").replace(/,/g, " "); 
        const fecha = new Date(t.fecha).toLocaleDateString();
        csvContent += `${fecha},${tipoEtiqueta},${t.monto},${conceptoLimpio}\n`;
      });
    }

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url); 
    link.setAttribute("download", `Historial_${cuenta.nombre}.csv`);
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link);
  };

  const generarPDF = (cuenta) => {
    if (!cuenta || !cuenta.transacciones) return showToast("No hay historial", "error");
    const windowJsPDF = window.jspdf?.jsPDF;
    if (!windowJsPDF) {
      showToast("Las librerías de PDF se están cargando. Intenta de nuevo.", "error");
      return;
    }

    const esPrestamo = cuenta.transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
    const deudaInicial = cuenta.transacciones.filter(t => t.tipo === "Préstamo" || t.tipo === "Gasto").reduce((acc, t) => acc + t.monto, 0);
    const totalAbonos = cuenta.transacciones.filter(t => t.tipo === "Abono" || t.tipo === "Ingreso").reduce((acc, t) => acc + t.monto, 0);

    const doc = new windowJsPDF();
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(22); 
    doc.text("Estado de Cuenta", 14, 20); 
    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(16); 
    doc.text(`Registro: ${cuenta.nombre}`, 14, 30);
    
    const saldoFinal = Math.abs(deudaInicial - totalAbonos); 
    doc.setFontSize(12);
    
    if (esPrestamo) {
      doc.text(`Total Prestado: $${deudaInicial.toLocaleString('en-US')}`, 14, 45); 
      doc.text(`Abonos Realizados: $${totalAbonos.toLocaleString('en-US')}`, 14, 52);
      if (saldoFinal === 0 || (deudaInicial - totalAbonos) <= 0) { 
        doc.setTextColor(16, 185, 129); 
        doc.setFont("helvetica", "bold"); 
        doc.text(`ESTADO: ¡Préstamo Pagado!`, 14, 62); 
      } else { 
        doc.setTextColor(244, 63, 94); 
        doc.setFont("helvetica", "bold"); 
        doc.text(`Balance Pendiente: $${saldoFinal.toLocaleString('en-US')}`, 14, 62); 
      }
    } else {
      doc.text(`Cargos / Gastos: $${deudaInicial.toLocaleString('en-US')}`, 14, 45); 
      doc.text(`Abonos / Ingresos: $${totalAbonos.toLocaleString('en-US')}`, 14, 52);
      doc.setTextColor(244, 63, 94); 
      doc.setFont("helvetica", "bold"); 
      doc.text(`Balance Final: $${saldoFinal.toLocaleString('en-US')}`, 14, 62);
    }
    
    doc.setTextColor(0, 0, 0); 
    doc.setFont("helvetica", "normal");
    const tablaDatos = cuenta.transacciones.map(t => {
      let tipoEtiqueta = t.tipo;
      if (esPrestamo) { 
        if (t.tipo === "Gasto" || t.tipo === "Préstamo") tipoEtiqueta = "Préstamo"; 
        if (t.tipo === "Ingreso" || t.tipo === "Abono") tipoEtiqueta = "Abono"; 
      }
      if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipoEtiqueta = "Préstamo";
      return [ tipoEtiqueta, `$${t.monto.toLocaleString('en-US')}`, new Date(t.fecha).toLocaleDateString(), t.concepto || "-" ];
    });

    doc.autoTable({ startY: 70, head: [['Tipo', 'Monto', 'Fecha', 'Concepto']], body: tablaDatos, headStyles: { fillColor: [99, 102, 241] } });
    doc.save(`Estado_Cuenta_${cuenta.nombre}.pdf`);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    if (!refundModal.selectedId) {
      setRefundModal(prev => ({ ...prev, isOpen: false }));
      return;
    }
    try {
      await fetch(`${API}/movimientos`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
        body: JSON.stringify({ 
          cuentaId: Number(refundModal.selectedId), 
          tipo: "Ingreso", 
          monto: refundModal.monto, 
          concepto: `[Capital Devuelto] Abono de ${refundModal.targetName}`, 
          fecha: refundModal.fecha ? new Date(refundModal.fecha + "T12:00:00").toISOString() : new Date().toISOString() 
        }) 
      });
      showToast("Fondos devueltos con éxito", "success");
      setRefundModal(prev => ({ ...prev, isOpen: false }));
      fetchDashboard();
    } catch (error) {
      showToast("Error al devolver capital", "error");
    }
  };

  // Cálculo de parámetros para Gráfico de Dona SVG (Sin dependencias externas)
  const chartData = useMemo(() => {
    const total = metricas.ingresos + metricas.gastos + metricas.deuda;
    if (total === 0) return null;
    const ingPct = metricas.ingresos / total;
    const gasPct = metricas.gastos / total;
    const deuPct = metricas.deuda / total;

    const r = 50;
    const circ = 2 * Math.PI * r;

    const ingOffset = 0;
    const gasOffset = ingPct * circ;
    const deuOffset = (ingPct + gasPct) * circ;

    return {
      r,
      circ,
      ingDash: `${ingPct * circ} ${circ}`,
      gasDash: `${gasPct * circ} ${circ}`,
      deuDash: `${deuPct * circ} ${circ}`,
      ingOffset: -ingOffset,
      gasOffset: -gasOffset,
      deuOffset: -deuOffset
    };
  }, [metricas]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
      <header className="flex flex-wrap justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💰</span>
          <h1 className="text-2xl font-bold tracking-tight">Control Financiero <span className="text-indigo-500">Pro</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold opacity-75 hidden sm:inline">{userEmail}</span>
          <button onClick={toggleTheme} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
            {isDarkMode ? <><IconSun /> Claro</> : <><IconMoon /> Oscuro</>}
          </button>
          <button onClick={handleLogout} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all text-rose-500 border ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
            <IconLogout /> Salir
          </button>
        </div>
      </header>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 backdrop-blur-lg'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Ingresos (Mes)</h3>
          <p className="text-4xl font-extrabold text-emerald-500">$<AnimatedCounter value={metricas.ingresos} /></p>
        </div>
        <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 backdrop-blur-lg'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Gastos (Mes)</h3>
          <p className="text-4xl font-extrabold text-rose-500">$<AnimatedCounter value={metricas.gastos} /></p>
        </div>
        <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 backdrop-blur-lg'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Deuda Activa</h3>
          <p className="text-4xl font-extrabold text-slate-600 dark:text-slate-300">$<AnimatedCounter value={metricas.deuda} /></p>
        </div>
      </div>

      {/* Gráfico de Torta SVG Autocontenido */}
      <div className={`rounded-3xl border shadow-sm mb-10 flex flex-col justify-center items-center h-80 p-6 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 backdrop-blur-lg'}`}>
        {chartData ? (
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center w-full">
            <svg width="180" height="180" viewBox="0 0 120 120" className="transform -rotate-90">
              <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="12" />
              <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray={chartData.ingDash} strokeDashoffset={chartData.ingOffset} />
              <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray={chartData.gasDash} strokeDashoffset={chartData.gasOffset} />
              <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#cbd5e1' : '#334155'} strokeWidth="12" strokeDasharray={chartData.deuDash} strokeDashoffset={chartData.deuOffset} />
            </svg>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-emerald-500"></span> <span>Ingresos: {((metricas.ingresos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-rose-500"></span> <span>Gastos: {((metricas.gastos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
              <div className="flex items-center gap-2"><span className={`w-4 h-4 rounded ${isDarkMode ? 'bg-slate-300' : 'bg-slate-700'}`}></span> <span>Deuda: {((metricas.deuda / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</span></div>
            </div>
          </div>
        ) : (
          <p className="text-slate-400">Sin datos para graficar en el mes actual</p>
        )}
      </div>

      {/* Tabla de Cuentas */}
      <div className={`rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 backdrop-blur-lg'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-lg font-bold">Historial de Cuentas</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className={`px-5 py-3 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-700 focus:border-indigo-500' : 'bg-slate-100 border border-transparent focus:border-indigo-400'}`} />
            <input type="text" placeholder="🔍 Buscar registro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`flex-1 px-5 py-3 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-700 focus:border-indigo-500' : 'bg-slate-100 border border-transparent focus:border-indigo-400'}`} />
          </div>
        </div>
        
        <div className="overflow-x-auto p-4 md:p-0">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Cargando datos...</div>
          ) : (
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Registro</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Estado Actual</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuentas.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map(cuenta => {
                  const transacciones = cuenta.transacciones || [];
                  const esPrestamoHistorial = transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
                  let colorSaldo = "text-emerald-500";
                  if (cuenta.monto === 0) colorSaldo = "text-emerald-500";
                  else if (esPrestamoHistorial) colorSaldo = isDarkMode ? "text-slate-200" : "text-slate-700";
                  else if (transacciones[0]) {
                    const esDescuento = transacciones[0].concepto && (transacciones[0].concepto.includes("[Pago de Gasto]") || transacciones[0].concepto.includes("[Préstamo Otorgado]"));
                    if (transacciones[0].tipo === "Gasto" && !esDescuento) colorSaldo = "text-rose-500";
                  }

                  const txFiltradas = filterMonth ? transacciones.filter(t => t.fecha.startsWith(filterMonth)) : transacciones;
                  if (filterMonth && txFiltradas.length === 0) return null;

                  return (
                    <React.Fragment key={cuenta.id}>
                      <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-5">
                          <div className="text-xs text-slate-400 mb-1">ID #{cuenta.id}</div>
                          <div className="font-bold">{cuenta.nombre}</div>
                        </td>
                        <td className={`p-5 font-extrabold ${colorSaldo}`}>
                          ${Math.abs(cuenta.monto).toLocaleString('en-US')}
                        </td>
                        <td className="p-5 flex justify-end gap-2">
                          <button onClick={() => toggleRow(cuenta.id)} className="w-9 h-9 rounded-lg bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors">👁️</button>
                          <button onClick={() => generarPDF(cuenta)} className="w-9 h-9 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">📄</button>
                          <button onClick={() => generarCSV(cuenta)} className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors">📗</button>
                          <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors">✏️</button>
                          <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"><IconTrash /></button>
                        </td>
                      </tr>
                      {expandedRows[cuenta.id] && (
                        <tr>
                          <td colSpan="3" className="p-0">
                            <div className={`p-5 m-2 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                              {txFiltradas.length === 0 ? (
                                <p className="text-center text-sm text-slate-500">Sin movimientos en este periodo</p>
                              ) : (
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-500 text-left">
                                      <th className="pb-2 font-semibold">Fecha</th>
                                      <th className="pb-2 font-semibold">Tipo</th>
                                      <th className="pb-2 font-semibold">Monto</th>
                                      <th className="pb-2 font-semibold">Concepto</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {txFiltradas.map(t => {
                                      let tipoEtiqueta = t.tipo;
                                      if (esPrestamoHistorial) {
                                        if (t.tipo === "Gasto" || t.tipo === "Préstamo") tipoEtiqueta = "Préstamo";
                                        if (t.tipo === "Ingreso" || t.tipo === "Abono") tipoEtiqueta = "Abono";
                                      }
                                      if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipoEtiqueta = "Préstamo";
                                      
                                      return (
                                        <tr key={t.id} className="border-b border-slate-200 dark:border-slate-800 border-dashed last:border-0 hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
                                          <td className="py-3 text-slate-500">{new Date(t.fecha).toLocaleDateString()}</td>
                                          <td className="py-3 font-semibold text-slate-700 dark:text-slate-300">{tipoEtiqueta}</td>
                                          <td className="py-3 font-bold text-slate-800 dark:text-slate-100">${t.monto.toLocaleString('en-US')}</td>
                                          <td className="py-3 text-slate-500">{t.concepto || "-"}</td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
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
          
          {/* VISTA MÓVIL (Tarjetas en Celular) */}
          <div className="md:hidden flex flex-col gap-4">
             {cuentas.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map(cuenta => {
               const transacciones = cuenta.transacciones || [];
               const esPrestamoHistorial = transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
               let colorSaldo = "text-emerald-500";
               if (cuenta.monto === 0) colorSaldo = "text-emerald-500";
               else if (esPrestamoHistorial) colorSaldo = isDarkMode ? "text-slate-200" : "text-slate-700";
               else if (transacciones[0]) {
                 const esDescuento = transacciones[0].concepto && (transacciones[0].concepto.includes("[Pago de Gasto]") || transacciones[0].concepto.includes("[Préstamo Otorgado]"));
                 if (transacciones[0].tipo === "Gasto" && !esDescuento) colorSaldo = "text-rose-500";
               }
               const txFiltradas = filterMonth ? transacciones.filter(t => t.fecha.startsWith(filterMonth)) : transacciones;
               if (filterMonth && txFiltradas.length === 0) return null;

               return (
                 <div key={`mob-${cuenta.id}`} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-start mb-4 border-b pb-4 dark:border-slate-700">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">ID #{cuenta.id}</div>
                        <div className="font-bold text-lg">{cuenta.nombre}</div>
                      </div>
                      <div className={`font-extrabold text-xl ${colorSaldo}`}>${Math.abs(cuenta.monto).toLocaleString('en-US')}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 justify-end">
                      <button onClick={() => toggleRow(`mob-${cuenta.id}`)} className="px-3 py-2 text-sm rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold flex-1">Detalles</button>
                      <button onClick={() => generarPDF(cuenta)} className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/50 flex items-center justify-center">📄</button>
                      <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/50 flex items-center justify-center">✏️</button>
                      <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/50 flex items-center justify-center"><IconTrash /></button>
                    </div>
                    
                    {expandedRows[`mob-${cuenta.id}`] && (
                       <div className="mt-4 flex flex-col gap-2">
                         {txFiltradas.length === 0 ? <p className="text-center text-sm text-slate-500">Sin movimientos</p> : 
                          txFiltradas.map(t => {
                            let tipoEtiqueta = t.tipo;
                            if (esPrestamoHistorial) {
                              if (t.tipo === "Gasto" || t.tipo === "Préstamo") tipoEtiqueta = "Préstamo";
                              if (t.tipo === "Ingreso" || t.tipo === "Abono") tipoEtiqueta = "Abono";
                            }
                            if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipoEtiqueta = "Préstamo";
                            return (
                              <div key={`tx-${t.id}`} className={`p-3 rounded-xl flex flex-col gap-1 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                                <div className="flex justify-between text-xs text-slate-500">
                                  <span>{new Date(t.fecha).toLocaleDateString()}</span>
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">{tipoEtiqueta}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-sm font-medium line-clamp-1 flex-1 pr-2">{t.concepto || "-"}</span>
                                  <span className="font-bold">${t.monto.toLocaleString('en-US')}</span>
                                </div>
                              </div>
                            )
                          })
                         }
                       </div>
                    )}
                 </div>
               )
             })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MovementModal 
          token={token} 
          cuentas={cuentas} 
          isDarkMode={isDarkMode} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={(refundData) => { 
            setIsModalOpen(false); 
            fetchDashboard(); 
            if (refundData) {
              setRefundModal({
                isOpen: true,
                targetId: refundData.targetId,
                targetName: refundData.targetName,
                options: cuentas.filter(c => c.id !== refundData.targetId),
                selectedId: '',
                monto: refundData.monto,
                fecha: refundData.fecha
              });
            } else {
              showToast("Registro exitoso", "success");
            }
          }}
          showToast={showToast}
        />
      )}

      {/* FAB Botón de Acción Principal */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-3xl shadow-[0_10px_25px_rgba(99,102,241,0.5)] flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        +
      </button>

      {/* ========================================================
          MODALES REEMPLAZANDO SWEETALERT2 PARA PERFECTA COMPILACIÓN
          ======================================================== */}
      
      {/* Modal de Eliminación */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <h3 className="text-lg font-bold mb-2">¿Eliminar registro?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Esta acción eliminará la cuenta <strong>{deleteModal.name}</strong> y todo su historial de transacciones.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })} className="px-4 py-2 text-sm rounded-xl font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Cancelar</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm rounded-xl font-semibold bg-rose-500 text-white hover:bg-rose-600">🗑️ Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <h3 className="text-lg font-bold mb-4">Editar Nombre</h3>
            <input 
              type="text" 
              value={editModal.newName} 
              onChange={(e) => setEditModal(prev => ({ ...prev, newName: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl mb-6 outline-none border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditModal({ isOpen: false, id: null, name: '', newName: '' })} className="px-4 py-2 text-sm rounded-xl font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Cancelar</button>
              <button onClick={confirmEdit} className="px-4 py-2 text-sm rounded-xl font-semibold bg-indigo-500 text-white hover:bg-indigo-600">💾 Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Devolución de Capital */}
      {refundModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <form onSubmit={handleRefundSubmit} className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <h3 className="text-lg font-bold mb-2">¿A qué cuenta devuelves este capital?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Si le prestaste a <strong>{refundModal.targetName}</strong> desde otra cuenta, elige a cuál regresar el dinero. Si es pago en efectivo, dale a Cancelar.</p>
            <select 
              required
              value={refundModal.selectedId} 
              onChange={(e) => setRefundModal(prev => ({ ...prev, selectedId: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl mb-6 outline-none border bg-white dark:bg-slate-900 ${isDarkMode ? 'border-slate-700 text-white' : 'border-slate-200'}`}
            >
              <option value="">-- Elige una cuenta para regresar el dinero --</option>
              {refundModal.options.map(o => (
                <option key={o.id} value={o.id}>{o.nombre}</option>
              ))}
            </select>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button type="button" onClick={() => setRefundModal(prev => ({ ...prev, isOpen: false }))} className="px-4 py-2 text-sm rounded-xl font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Dejar como efectivo (Cancelar)</button>
              <button type="submit" className="px-4 py-2 text-sm rounded-xl font-semibold bg-indigo-500 text-white hover:bg-indigo-600">Devolver fondos</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE: FORMULARIO DE MOVIMIENTO
// ==========================================
function MovementModal({ token, cuentas, isDarkMode, onClose, onSuccess, showToast }) {
  const [tipo, setTipo] = useState('Ingreso');
  const [modo, setModo] = useState('EXISTING');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [cuentaId, setCuentaId] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [categoria, setCategoria] = useState('General');
  const [concepto, setConcepto] = useState('');
  const [isTransfer, setIsTransfer] = useState(false);
  const [origenId, setOrigenId] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (e) => setMonto(e.target.value.replace(/[^0-9.]/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalMonto = parseFloat(monto);
    if (!finalMonto || isNaN(finalMonto)) return showToast("Monto inválido", "error");
    if (isTransfer && !origenId && tipo !== "Ingreso") return showToast("Selecciona cuenta origen", "error");
    
    setLoading(true);
    let targetId = cuentaId;
    let targetName = "";

    try {
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
      
      await fetch(`${API}/movimientos`, { 
        method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ cuentaId: Number(targetId), tipo, monto: finalMonto, concepto: conceptoFinal, fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString() }) 
      });

      if (isTransfer && origenId && tipo !== "Ingreso") {
        await fetch(`${API}/movimientos`, { 
          method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
          body: JSON.stringify({
            cuentaId: Number(origenId), tipo: "Gasto", monto: finalMonto,
            concepto: tipo === "Préstamo" ? `[Préstamo Otorgado] Dinero prestado a ${targetName}` : `[Pago de Gasto] Pago a ${targetName}`,
            fecha: fecha ? new Date(fecha + "T12:00:00").toISOString() : new Date().toISOString()
          }) 
        });
      }

      let refundObject = null;
      if (tipo === "Ingreso") {
        const targetCuenta = cuentas.find(c => c.id === Number(targetId));
        const transaccionesHist = targetCuenta ? targetCuenta.transacciones : [];
        const isLoan = transaccionesHist && transaccionesHist.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
        
        if (isLoan) {
          refundObject = {
            targetId,
            targetName,
            monto: finalMonto,
            fecha
          };
        }
      }

      onSuccess(refundObject);
    } catch (error) {
      showToast("Error al guardar", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-5 py-3 rounded-xl outline-none transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-700 text-slate-100 focus:border-indigo-500' : 'bg-slate-100 border border-transparent focus:border-indigo-400 focus:bg-white'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl my-8 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Nuevo Movimiento</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900">
            {['Ingreso', 'Gasto', 'Préstamo'].map(t => (
              <button 
                key={t} type="button" onClick={() => setTipo(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${tipo === t ? (t === 'Ingreso' ? 'bg-emerald-500 text-white shadow-md' : t === 'Gasto' ? 'bg-rose-500 text-white shadow-md' : 'bg-indigo-500 text-white shadow-md') : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <select value={modo} onChange={(e) => setModo(e.target.value)} className={inputClass}>
            <option value="EXISTING">👤 Registro Existente</option>
            <option value="NEW">➕ Nuevo Registro</option>
          </select>

          {modo === "NEW" ? (
            <input type="text" placeholder="Nombre del nuevo registro" required value={nombreNuevo} onChange={e => setNombreNuevo(e.target.value)} className={inputClass} />
          ) : (
            <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className={inputClass}>
              <option value="" disabled>-- Elige un registro --</option>
              {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          )}

          <div className="flex gap-4">
            <input type="text" placeholder="Monto $" required value={monto} onChange={formatCurrency} className={inputClass} />
            <input type="date" required value={fecha} onChange={e => setFecha(e.target.value)} className={inputClass} />
          </div>

          {tipo !== 'Préstamo' && (
            <select value={categoria} onChange={e => setCategoria(e.target.value)} className={inputClass}>
              <option value="General">🏷️ General</option>
              <option value="Comida">🍔 Comida</option>
              <option value="Transporte">🚗 Transporte</option>
              <option value="Vivienda">🏠 Vivienda / Servicios</option>
              <option value="Entretenimiento">🍿 Entretenimiento</option>
              <option value="Pago Tarjeta/Deuda">💳 Pago Tarjeta/Deuda</option>
              <option value="Nómina/Salario">💵 Nómina/Salario</option>
              <option value="Abono a préstamo">💸 Abono a préstamo</option>
            </select>
          )}

          <input type="text" placeholder="Concepto (Opcional)" value={concepto} onChange={e => setConcepto(e.target.value)} className={inputClass} />

          {tipo !== 'Ingreso' && (
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                <input type="checkbox" checked={isTransfer} onChange={(e) => setIsTransfer(e.target.checked)} className="w-5 h-5 accent-indigo-500" />
                💳 Descontar fondos de otra cuenta
              </label>
              {isTransfer && (
                <select required value={origenId} onChange={e => setOrigenId(e.target.value)} className={`${inputClass} mt-2`}>
                  <option value="" disabled>-- Elige cuenta origen --</option>
                  {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : tipo === 'Ingreso' ? 'bg-emerald-500 shadow-emerald-500/30 hover:bg-emerald-600' : tipo === 'Gasto' ? 'bg-rose-500 shadow-rose-500/30 hover:bg-rose-600' : 'bg-indigo-500 shadow-indigo-500/30 hover:bg-indigo-600'}`}>
            {loading ? 'Guardando...' : 'Guardar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
}
