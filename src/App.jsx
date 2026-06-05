import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================
const API = "https://control-backend-ndpz.onrender.com";

// Cargador dinámico de scripts externos para evitar errores de compilación
const loadScript = (url) => {
return new Promise((resolve) => {
if (document.querySelector(script[src="${url}"])) {
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
const IconSun = () => ;
const IconMoon = () => ;
const IconLogout = () => ;
const IconTrash = () => ;

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

// Carga dinámica de librerías PDF
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
<div className={min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}}>

  {/* Sistema de Toasts */}
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
// PANTALLA DE AUTENTICACIÓN
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

<div className={w-full max-w-md p-8 rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}}>


💰

{isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'}

{isRegisterMode ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
<button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="ml-1 text-indigo-500 font-semibold hover:underline">
{isRegisterMode ? 'Ingresa aquí' : 'Regístrate gratis'}




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
// DASHBOARD PRINCIPAL
// ==========================================
function Dashboard({ token, userEmail, handleLogout, isDarkMode, toggleTheme, showToast }) {
const [cuentas, setCuentas] = useState([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [filterMonth, setFilterMonth] = useState('');
const [expandedRows, setExpandedRows] = useState({});
const [loadingMore, setLoadingMore] = useState(false);

// Modales UI
const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
const [editModal, setEditModal] = useState({ isOpen: false, id: null, name: '', newName: '' });
const [refundModal, setRefundModal] = useState({ isOpen: false, targetId: null, targetName: '', options: [], selectedId: '', monto: 0, fecha: '' });

const fetchDashboard = async () => {
try {
const res = await fetch(${API}/dashboard, { headers: { 'Authorization': Bearer ${token} } });
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

const loadMoreTransactions = async (cuentaId, currentCount) => {
setLoadingMore(true);
try {
const res = await fetch(${API}/api/cuentas/${cuentaId}/transacciones?skip=${currentCount}, {
headers: { 'Authorization': Bearer ${token} }
});
if (!res.ok) throw new Error("Error en petición");
const nuevasTx = await res.json();

  if(nuevasTx.length === 0) {
    showToast("No hay más movimientos", "info");
  }

  setCuentas(prevCuentas => prevCuentas.map(c => 
      c.id === cuentaId ? { ...c, transacciones: [...c.transacciones, ...nuevasTx] } : c
  ));
} catch (e) {
  showToast("Error al cargar historial", "error");
} finally {
  setLoadingMore(false);
}


};

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
await fetch(${API}/cuentas/${deleteModal.id}, { method: 'DELETE', headers: { 'Authorization': Bearer ${token} } });
showToast("Cuenta eliminada", "success");
setDeleteModal({ isOpen: false, id: null, name: '' });
fetchDashboard();
} catch (e) {
showToast("Error al eliminar", "error");
}
};

const confirmEdit = async () => {
if (!editModal.newName.trim()) return showToast("El nombre no puede estar vacío", "error");
try {
await fetch(${API}/cuentas/${editModal.id}, {
method: 'PUT',
headers: { 'Content-Type': 'application/json', 'Authorization': Bearer ${token} },
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
document.body.appendChild(link); link.click(); document.body.removeChild(link);


};

const generarPDF = (cuenta) => {
if (!cuenta || !cuenta.transacciones) return showToast("No hay historial", "error");
const windowJsPDF = window.jspdf?.jsPDF;
if (!windowJsPDF) return showToast("Cargando creador de PDF...", "info");

const esPrestamo = cuenta.transacciones.some(t => t.tipo === "Préstamo" && (!t.concepto || !t.concepto.includes("[Préstamo Otorgado]")));
const deudaInicial = cuenta.transacciones.filter(t => t.tipo === "Préstamo" || t.tipo === "Gasto").reduce((acc, t) => acc + t.monto, 0);
const totalAbonos = cuenta.transacciones.filter(t => t.tipo === "Abono" || t.tipo === "Ingreso").reduce((acc, t) => acc + t.monto, 0);

const doc = new windowJsPDF();
doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.text("Estado de Cuenta", 14, 20); 
doc.setFont("helvetica", "normal"); doc.setFontSize(16); doc.text(`Registro: ${cuenta.nombre}`, 14, 30);

const saldoFinal = Math.abs(deudaInicial - totalAbonos); doc.setFontSize(12);

if (esPrestamo) {
  doc.text(`Total Prestado: $${deudaInicial.toLocaleString('en-US')}`, 14, 45); doc.text(`Abonos Realizados: $${totalAbonos.toLocaleString('en-US')}`, 14, 52);
  if (saldoFinal === 0 || (deudaInicial - totalAbonos) <= 0) { 
    doc.setTextColor(16, 185, 129); doc.setFont("helvetica", "bold"); doc.text(`ESTADO: ¡Préstamo Pagado!`, 14, 62); 
  } else { 
    doc.setTextColor(244, 63, 94); doc.setFont("helvetica", "bold"); doc.text(`Balance Pendiente: $${saldoFinal.toLocaleString('en-US')}`, 14, 62); 
  }
} else {
  doc.text(`Cargos / Gastos: $${deudaInicial.toLocaleString('en-US')}`, 14, 45); doc.text(`Abonos / Ingresos: $${totalAbonos.toLocaleString('en-US')}`, 14, 52);
  doc.setTextColor(244, 63, 94); doc.setFont("helvetica", "bold"); doc.text(`Balance Final: $${saldoFinal.toLocaleString('en-US')}`, 14, 62);
}

doc.setTextColor(0, 0, 0); doc.setFont("helvetica", "normal");
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
if (!refundModal.selectedId) return setRefundModal(prev => ({ ...prev, isOpen: false }));
try {
await fetch(${API}/movimientos, {
method: 'POST',
headers: {'Content-Type': 'application/json', 'Authorization': Bearer ${token}},
body: JSON.stringify({
cuentaId: Number(refundModal.selectedId), tipo: "Ingreso", monto: refundModal.monto,
concepto: [Capital Devuelto] Abono de ${refundModal.targetName},
fecha: refundModal.fecha ? new Date(refundModal.fecha + "T12:00:00").toISOString() : new Date().toISOString()
})
});
showToast("Fondos devueltos con éxito", "success");
setRefundModal(prev => ({ ...prev, isOpen: false }));
fetchDashboard();
} catch (error) { showToast("Error al devolver capital", "error"); }
};

const chartData = useMemo(() => {
const total = metricas.ingresos + metricas.gastos + metricas.deuda;
if (total === 0) return null;
const ingPct = metricas.ingresos / total;
const gasPct = metricas.gastos / total;
const deuPct = metricas.deuda / total;

const r = 50; const circ = 2 * Math.PI * r;
const ingOffset = 0; const gasOffset = ingPct * circ; const deuOffset = (ingPct + gasPct) * circ;

return {
  r, circ, ingDash: `${ingPct * circ} ${circ}`, gasDash: `${gasPct * circ} ${circ}`, deuDash: `${deuPct * circ} ${circ}`,
  ingOffset: -ingOffset, gasOffset: -gasOffset, deuOffset: -deuOffset
};


}, [metricas]);

return (



💰
Control Financiero Pro


{userEmail}
<button onClick={toggleTheme} className={flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:shadow-md'}}>
{isDarkMode ? <> Claro</> : <> Oscuro</>}

<button onClick={handleLogout} className={flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all text-rose-500 border ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}}>
 Salir




  {/* Tarjetas de Métricas Soft UI */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100 backdrop-blur-xl'}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Ingresos (Mes)</h3>
      <p className="text-4xl font-extrabold text-emerald-500">$<AnimatedCounter value={metricas.ingresos} /></p>
    </div>
    <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100 backdrop-blur-xl'}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Gastos (Mes)</h3>
      <p className="text-4xl font-extrabold text-rose-500">$<AnimatedCounter value={metricas.gastos} /></p>
    </div>
    <div className={`p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100 backdrop-blur-xl'}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Deuda Activa</h3>
      <p className="text-4xl font-extrabold text-slate-600 dark:text-slate-300">$<AnimatedCounter value={metricas.deuda} /></p>
    </div>
  </div>

  {/* Gráfico de Torta */}
  <div className={`rounded-3xl border shadow-sm mb-10 flex flex-col justify-center items-center h-[350px] p-6 transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100 backdrop-blur-xl'}`}>
    {chartData ? (
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center w-full">
        <svg width="220" height="220" viewBox="0 0 120 120" className="transform -rotate-90">
          <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="14" />
          <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#10b981" strokeWidth="14" strokeDasharray={chartData.ingDash} strokeDashoffset={chartData.ingOffset} />
          <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke="#f43f5e" strokeWidth="14" strokeDasharray={chartData.gasDash} strokeDashoffset={chartData.gasOffset} />
          <circle cx="60" cy="60" r={chartData.r} fill="transparent" stroke={isDarkMode ? '#94a3b8' : '#334155'} strokeWidth="14" strokeDasharray={chartData.deuDash} strokeDashoffset={chartData.deuOffset} />
        </svg>
        <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-emerald-500 shadow-sm"></span> Ingresos: {((metricas.ingresos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-rose-500 shadow-sm"></span> Gastos: {((metricas.gastos / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</div>
          <div className="flex items-center gap-2"><span className={`w-4 h-4 rounded shadow-sm ${isDarkMode ? 'bg-slate-400' : 'bg-slate-700'}`}></span> Deuda: {((metricas.deuda / (metricas.ingresos + metricas.gastos + metricas.deuda)) * 100).toFixed(1)}%</div>
        </div>
      </div>
    ) : (
      <p className="text-slate-400 font-medium">Sin datos para graficar en este periodo</p>
    )}
  </div>

  {/* Tabla de Cuentas */}
  <div className={`rounded-3xl border shadow-sm overflow-hidden transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100 backdrop-blur-xl'}`}>
    <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-wrap justify-between items-center gap-4">
      <h2 className="text-lg font-bold">Historial de Cuentas</h2>
      <div className="flex gap-4 w-full md:w-auto">
        <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className={`px-5 py-3 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border border-transparent focus:border-indigo-400'}`} />
        <input type="text" placeholder="🔍 Buscar registro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`flex-1 px-5 py-3 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border border-transparent focus:border-indigo-400'}`} />
      </div>
    </div>
    
    <div className="overflow-x-auto p-4 md:p-0">
      {loading ? (
        <div className="p-10 text-center text-slate-500 font-medium">Cargando datos...</div>
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
                      <div className="text-xs text-slate-400 font-semibold mb-1">ID #{cuenta.id}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">{cuenta.nombre}</div>
                    </td>
                    <td className={`p-5 font-extrabold ${colorSaldo}`}>
                      ${Math.abs(cuenta.monto).toLocaleString('en-US')}
                    </td>
                    <td className="p-5 flex justify-end gap-2">
                      <button onClick={() => toggleRow(cuenta.id)} className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-sm hover:shadow-md">👁️</button>
                      <button onClick={() => generarPDF(cuenta)} className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors shadow-sm hover:shadow-md">📄</button>
                      <button onClick={() => generarCSV(cuenta)} className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md">📗</button>
                      <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors shadow-sm hover:shadow-md">✏️</button>
                      <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shadow-sm hover:shadow-md"><IconTrash /></button>
                    </td>
                  </tr>
                  {expandedRows[cuenta.id] && (
                    <tr>
                      <td colSpan="3" className="p-0">
                        {/* CAJA INTERNA DE DETALLES - SOFT UI LÍNEAS TENUES */}
                        <div className={`p-5 m-3 rounded-2xl ${isDarkMode ? 'bg-slate-800/80' : 'bg-slate-50 border border-slate-100'}`}>
                          {txFiltradas.length === 0 ? (
                            <p className="text-center text-sm text-slate-500 font-medium">Sin movimientos en este periodo</p>
                          ) : (
                            <>
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-slate-300 dark:border-slate-600 text-slate-500 text-left">
                                    <th className="pb-3 font-semibold">Fecha</th>
                                    <th className="pb-3 font-semibold">Tipo</th>
                                    <th className="pb-3 font-semibold">Monto</th>
                                    <th className="pb-3 font-semibold">Concepto</th>
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
                                      // LINEAS PUNTEADAS SUAVES (border-dashed)
                                      <tr key={t.id} className="border-b border-slate-200 dark:border-slate-700 border-dashed last:border-0 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                        <td className="py-4 text-slate-500 font-medium">{new Date(t.fecha).toLocaleDateString()}</td>
                                        <td className="py-4 font-semibold text-slate-600 dark:text-slate-300">{tipoEtiqueta}</td>
                                        <td className="py-4 font-bold text-slate-800 dark:text-slate-100">${t.monto.toLocaleString('en-US')}</td>
                                        <td className="py-4 text-slate-500">{t.concepto || "-"}</td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                              {!filterMonth && txFiltradas.length > 0 && (
                                <div className="mt-5 flex justify-center">
                                  <button onClick={() => loadMoreTransactions(cuenta.id, cuenta.transacciones.length)} disabled={loadingMore} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors disabled:opacity-50">
                                    {loadingMore ? 'Cargando...' : 'Cargar más movimientos'}
                                  </button>
                                </div>
                              )}
                            </>
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
             <div key={`mob-${cuenta.id}`} className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-4 border-b border-dashed border-slate-200 dark:border-slate-700 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1">ID #{cuenta.id}</div>
                    <div className="font-bold text-lg text-slate-800 dark:text-slate-100">{cuenta.nombre}</div>
                  </div>
                  <div className={`font-extrabold text-xl ${colorSaldo}`}>${Math.abs(cuenta.monto).toLocaleString('en-US')}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 justify-end">
                  <button onClick={() => toggleRow(`mob-${cuenta.id}`)} className="px-4 py-2 text-sm rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 font-semibold flex-1 transition-colors">Detalles</button>
                  <button onClick={() => generarPDF(cuenta)} className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/40 flex items-center justify-center transition-colors">📄</button>
                  <button onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })} className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/40 flex items-center justify-center transition-colors">✏️</button>
                  <button onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })} className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/40 flex items-center justify-center transition-colors"><IconTrash /></button>
                </div>
                
                {expandedRows[`mob-${cuenta.id}`] && (
                   <div className="mt-4 flex flex-col gap-3">
                     {txFiltradas.length === 0 ? <p className="text-center text-sm font-medium text-slate-500">Sin movimientos</p> : 
                      <>
                        {txFiltradas.map(t => {
                          let tipoEtiqueta = t.tipo;
                          if (esPrestamoHistorial) {
                            if (t.tipo === "Gasto" || t.tipo === "Préstamo") tipoEtiqueta = "Préstamo";
                            if (t.tipo === "Ingreso" || t.tipo === "Abono") tipoEtiqueta = "Abono";
                          }
                          if (t.concepto && t.concepto.includes("[Préstamo Otorgado]")) tipoEtiqueta = "Préstamo";
                          return (
                            <div key={`tx-${t.id}`} className={`p-4 rounded-2xl flex flex-col gap-1.5 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50 border border-slate-100'}`}>
                              <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>{new Date(t.fecha).toLocaleDateString()}</span>
                                <span className="font-bold text-slate-600 dark:text-slate-300">{tipoEtiqueta}</span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm font-medium line-clamp-1 flex-1 pr-3 text-slate-600 dark:text-slate-300">{t.concepto || "-"}</span>
                                <span className="font-bold text-base text-slate-800 dark:text-slate-100">${t.monto.toLocaleString('en-US')}</span>
                              </div>
                            </div>
                          )
                        })}
                        {!filterMonth && txFiltradas.length > 0 && (
                          <button onClick={() => loadMoreTransactions(cuenta.id, cuenta.transacciones.length)} disabled={loadingMore} className="mt-2 w-full py-3 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 disabled:opacity-50 transition-colors">
                            {loadingMore ? 'Cargando...' : 'Cargar más antiguos'}
                          </button>
                        )}
                      </>
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
    <MovementModal token={token} cuentas={cuentas} isDarkMode={isDarkMode} onClose={() => setIsModalOpen(false)} onSuccess={(refundData) => { setIsModalOpen(false); fetchDashboard(); if (refundData) { setRefundModal({ isOpen: true, targetId: refundData.targetId, targetName: refundData.targetName, options: cuentas.filter(c => c.id !== refundData.targetId), selectedId: '', monto: refundData.monto, fecha: refundData.fecha }); } else { showToast("Registro exitoso", "success"); } }} showToast={showToast} />
  )}

  {/* FAB Botón Flotante */}
  <button onClick={() => setIsModalOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-3xl shadow-[0_10px_25px_rgba(99,102,241,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] transition-all z-40">
    +
  </button>

  {/* MODALES CUSTOM SOFT UI */}
  
  {deleteModal.isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className={`w-full max-w-md p-8 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-100 text-slate-800'}`}>
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center text-2xl mb-6 mx-auto"><IconTrash /></div>
        <h3 className="text-xl font-bold mb-2 text-center">¿Eliminar registro?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center px-4">Esta acción eliminará la cuenta <strong>{deleteModal.name}</strong> y todo su historial. No se puede deshacer.</p>
        <div className="flex flex-col gap-3">
          <button onClick={confirmDelete} className="w-full py-3.5 text-sm rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/30">Sí, eliminar todo</button>
          <button onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })} className="w-full py-3.5 text-sm rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  )}

  {editModal.isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className={`w-full max-w-md p-8 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-100 text-slate-800'}`}>
        <h3 className="text-xl font-bold mb-6 text-center">Editar Nombre</h3>
        <input 
          type="text" 
          value={editModal.newName} 
          onChange={(e) => setEditModal(prev => ({ ...prev, newName: e.target.value }))}
          className={`w-full px-5 py-4 rounded-2xl mb-8 outline-none border font-medium ${isDarkMode ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border-slate-200 focus:border-indigo-400 focus:bg-white'}`}
        />
        <div className="flex gap-3">
          <button onClick={() => setEditModal({ isOpen: false, id: null, name: '', newName: '' })} className="flex-1 py-3.5 text-sm rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancelar</button>
          <button onClick={confirmEdit} className="flex-1 py-3.5 text-sm rounded-xl font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30">Guardar</button>
        </div>
      </div>
    </div>
  )}

  {refundModal.isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <form onSubmit={handleRefundSubmit} className={`w-full max-w-md p-8 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-100 text-slate-800'}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center text-2xl mb-6 mx-auto">💸</div>
        <h3 className="text-xl font-bold mb-2 text-center">¿Devolver el capital?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center">Si le prestaste a <strong>{refundModal.targetName}</strong> desde otra cuenta, elige a cuál regresar el dinero.</p>
        <select 
          required
          value={refundModal.selectedId} 
          onChange={(e) => setRefundModal(prev => ({ ...prev, selectedId: e.target.value }))}
          className={`w-full px-5 py-4 rounded-2xl mb-8 outline-none border font-medium cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border-slate-200 focus:border-indigo-400'}`}
        >
          <option value="" disabled>-- Elige cuenta destino --</option>
          {refundModal.options.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
        </select>
        <div className="flex flex-col gap-3">
          <button type="submit" className="w-full py-3.5 text-sm rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">Devolver fondos</button>
          <button type="button" onClick={() => setRefundModal(prev => ({ ...prev, isOpen: false }))} className="w-full py-3.5 text-sm rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancelar (Dejar efectivo)</button>
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
      refundObject = { targetId, targetName, monto: finalMonto, fecha };
    }
  }

  onSuccess(refundObject);
} catch (error) {
  showToast("Error al guardar", "error");
} finally {
  setLoading(false);
}


};

const inputClass = w-full px-5 py-4 rounded-2xl outline-none border font-medium transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-400 focus:bg-white'};

return (

<div className={w-full max-w-md p-8 rounded-[2rem] shadow-2xl my-8 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}}>

Nuevo Movimiento
✕


    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900">
        {['Ingreso', 'Gasto', 'Préstamo'].map(t => (
          <button 
            key={t} type="button" onClick={() => setTipo(t)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tipo === t ? (t === 'Ingreso' ? 'bg-emerald-500 text-white shadow-md' : t === 'Gasto' ? 'bg-rose-500 text-white shadow-md' : 'bg-indigo-500 text-white shadow-md') : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
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
        <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={isTransfer} onChange={(e) => setIsTransfer(e.target.checked)} className="w-5 h-5 accent-indigo-500 rounded" />
            💳 Descontar fondos de otra cuenta
          </label>
          {isTransfer && (
            <select required value={origenId} onChange={e => setOrigenId(e.target.value)} className={`${inputClass} mt-4`}>
              <option value="" disabled>-- Elige cuenta origen --</option>
              {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          )}
        </div>
      )}

      <button type="submit" disabled={loading} className={`w-full mt-2 py-4 rounded-2xl font-bold text-lg text-white transition-all shadow-lg hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : tipo === 'Ingreso' ? 'bg-emerald-500 shadow-emerald-500/30 hover:bg-emerald-600' : tipo === 'Gasto' ? 'bg-rose-500 shadow-rose-500/30 hover:bg-rose-600' : 'bg-indigo-500 shadow-indigo-500/30 hover:bg-indigo-600'}`}>
        {loading ? 'Guardando...' : 'Guardar Movimiento'}
      </button>
    </form>
  </div>
</div>


);
}
