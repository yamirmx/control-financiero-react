import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================
// CONFIGURACIÓN
// ============================================================
const API = "https://control-backend-ndpz.onrender.com";

const loadScript = (url) =>
  new Promise((resolve) => {
    if (document.querySelector(`script[src="${url}"]`)) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = url; s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

// ============================================================
// ANIMATED COUNTER — con inertia easing
// ============================================================
function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = display;
    if (start === value) return;
    const dur = 800;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setDisplay(Math.round(start + (value - start) * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display.toLocaleString('es-MX')}</>;
}

// ============================================================
// ICON SYSTEM — SVG inline optimizados
// ============================================================
const Icon = {
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Logout: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  PDF: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  CSV: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Wallet: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [token, setToken]       = useState(localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isDark, setIsDark]     = useState(localStorage.getItem('darkMode') !== 'false');
  const [toast, setToast]       = useState({ show: false, msg: '', type: 'info' });

  // Aplicar clase dark al <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  // Pre-cargar libs PDF
  useEffect(() => {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js");
  }, []);

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 3500);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(''); setUserEmail(''); localStorage.clear();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      transition: 'background-color 0.25s ease, color 0.25s ease',
    }}>
      {/* Toast */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-msg">{toast.msg}</span>
        </div>
      )}

      {!token
        ? <AuthScreen setToken={setToken} setUserEmail={setUserEmail} showToast={showToast} isDark={isDark} />
        : <Dashboard token={token} userEmail={userEmail} handleLogout={handleLogout} isDark={isDark} toggleTheme={() => setIsDark(d => !d)} showToast={showToast} />
      }
    </div>
  );
}

// ============================================================
// AUTH SCREEN
// ============================================================
function AuthScreen({ setToken, setUserEmail, showToast, isDark }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [showPass, setShowPass]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isRegister ? '/api/auth/signup' : '/api/auth/login';
    try {
      const res  = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error de autenticación');
      setToken(data.token);
      setUserEmail(data.user.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        animation: 'fade-in 0.4s ease forwards',
      }}>
        {/* Logotipo / wordmark */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48, height: 48,
            borderRadius: 14,
            background: 'var(--accent-primary)',
            marginBottom: 20,
            boxShadow: '0 4px 20px var(--accent-primary-glow)',
          }}>
            <Icon.Wallet />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}>
            {isRegister ? 'Crear cuenta' : 'Bienvenido'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 400 }}>
            {isRegister ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
            <button
              type="button"
              onClick={() => setIsRegister(r => !r)}
              style={{
                background: 'none', border: 'none', padding: 0,
                color: 'var(--accent-primary)', fontWeight: 600,
                fontSize: 13, cursor: 'pointer',
              }}
            >
              {isRegister ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email" placeholder="Correo electrónico" required
            value={email} onChange={e => setEmail(e.target.value)}
            className="input-premium"
          />

          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Contraseña" required
              value={password} onChange={e => setPassword(e.target.value)}
              className="input-premium"
              style={{ paddingRight: 48 }}
            />
            <button
              type="button"
              onClick={() => setShowPass(s => !s)}
              style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', padding: 4,
                cursor: 'pointer', color: 'var(--text-tertiary)',
                display: 'flex', alignItems: 'center',
              }}
            >
              {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="btn-primary"
            style={{ marginTop: 8, padding: '15px 24px', fontSize: 14 }}
          >
            {loading ? 'Verificando...' : (isRegister ? 'Crear cuenta' : 'Ingresar')}
          </button>
        </form>

        <p style={{
          textAlign: 'center', marginTop: 24,
          fontSize: 11, color: 'var(--text-tertiary)',
          letterSpacing: '0.02em',
        }}>
          Control Financiero Pro — Datos cifrados y privados
        </p>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ token, userEmail, handleLogout, isDark, toggleTheme, showToast }) {
  const [cuentas, setCuentas]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm]   = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingMore, setLoadingMore] = useState(null); // stores cuentaId or null

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [editModal, setEditModal]     = useState({ isOpen: false, id: null, name: '', newName: '' });
  const [refundModal, setRefundModal] = useState({ isOpen: false, targetId: null, targetName: '', options: [], selectedId: '', monto: 0, fecha: '' });

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      if (Array.isArray(data)) {
        setCuentas([...data].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })));
      }
    } catch {
      showToast('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, handleLogout, showToast]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const loadMoreTransactions = async (cuentaId, currentCount) => {
    setLoadingMore(cuentaId);
    try {
      const res = await fetch(`${API}/api/cuentas/${cuentaId}/transacciones?skip=${currentCount}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const nuevas = await res.json();
      if (nuevas.length === 0) { showToast('No hay más movimientos', 'info'); return; }
      setCuentas(prev =>
        prev.map(c => c.id === cuentaId ? { ...c, transacciones: [...c.transacciones, ...nuevas] } : c)
      );
    } catch {
      showToast('Error al cargar historial', 'error');
    } finally {
      setLoadingMore(null);
    }
  };

  // Métricas del mes actual
  const metricas = useMemo(() => {
    const mes = new Date().getMonth();
    const año = new Date().getFullYear();
    let ingresos = 0, gastos = 0, deuda = 0;

    cuentas.forEach(u => {
      const txs = u.transacciones || [];
      const esPrestamo = txs.some(t => t.tipo === 'Préstamo' && (!t.concepto || !t.concepto.includes('[Préstamo Otorgado]')));
      if (esPrestamo) deuda += Math.abs(u.monto);

      txs.forEach(t => {
        const f = new Date(t.fecha);
        if (f.getMonth() !== mes || f.getFullYear() !== año) return;
        const esPago    = t.concepto?.includes('[Pago de Gasto]');
        const esOtorgado = t.concepto?.includes('[Préstamo Otorgado]');
        const esDevolucion = t.concepto?.includes('[Capital Devuelto]');
        if (t.tipo === 'Gasto' && !esPago && !esOtorgado) gastos += t.monto;
        if ((t.tipo === 'Ingreso' || t.tipo === 'Abono') && !esPrestamo && !esDevolucion) ingresos += t.monto;
      });
    });
    return { ingresos, gastos, deuda };
  }, [cuentas]);

  const toggleRow = (id) => setExpandedRows(p => ({ ...p, [id]: !p[id] }));

  const confirmDelete = async () => {
    try {
      await fetch(`${API}/cuentas/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModal({ isOpen: false, id: null, name: '' });
      fetchDashboard();
    } catch { showToast('Error al eliminar', 'error'); }
  };

  const confirmEdit = async () => {
    if (!editModal.newName.trim()) return;
    try {
      await fetch(`${API}/cuentas/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nombre: editModal.newName }),
      });
      setEditModal({ isOpen: false, id: null, name: '', newName: '' });
      fetchDashboard();
    } catch { showToast('Error al actualizar', 'error'); }
  };

  const generarCSV = (cuenta) => {
    const rows = [['Fecha', 'Tipo', 'Monto', 'Concepto']];
    (cuenta.transacciones || []).forEach(t => {
      const tipo = t.concepto?.includes('[Préstamo Otorgado]') ? 'Préstamo' : t.tipo;
      rows.push([new Date(t.fecha).toLocaleDateString('es-MX'), tipo, t.monto, (t.concepto || '-').replace(/,/g, ' ')]);
    });
    const csv  = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Historial_${cuenta.nombre}.csv`;
    a.click();
  };

  const generarPDF = (cuenta) => {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) return showToast('Generando PDF…', 'info');
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('Estado de Cuenta', 14, 18);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
    doc.text(`Registro: ${cuenta.nombre}`, 14, 26);
    doc.text(`Balance: $${Math.abs(cuenta.monto).toLocaleString('es-MX')}`, 14, 32);
    const rows = (cuenta.transacciones || []).map(t => {
      const tipo = t.concepto?.includes('[Préstamo Otorgado]') ? 'Préstamo' : t.tipo;
      return [tipo, `$${t.monto.toLocaleString('es-MX')}`, new Date(t.fecha).toLocaleDateString('es-MX'), t.concepto || '-'];
    });
    doc.autoTable({
      startY: 38,
      head: [['Tipo', 'Monto', 'Fecha', 'Concepto']],
      body: rows,
      headStyles: { fillColor: [26, 86, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      styles: { fontSize: 9 },
    });
    doc.save(`Estado_Cuenta_${cuenta.nombre}.pdf`);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    if (!refundModal.selectedId) return setRefundModal(p => ({ ...p, isOpen: false }));
    try {
      await fetch(`${API}/movimientos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          cuentaId: Number(refundModal.selectedId),
          tipo: 'Ingreso',
          monto: refundModal.monto,
          concepto: `[Capital Devuelto] Abono de ${refundModal.targetName}`,
          fecha: refundModal.fecha ? new Date(`${refundModal.fecha}T12:00:00`).toISOString() : new Date().toISOString(),
        }),
      });
      setRefundModal(p => ({ ...p, isOpen: false }));
      fetchDashboard();
    } catch {}
  };

  // Donut chart data
  const chartData = useMemo(() => {
    const total = metricas.ingresos + metricas.gastos + metricas.deuda;
    if (total === 0) return null;
    const r = 52, circ = 2 * Math.PI * r;
    const pI = metricas.ingresos / total;
    const pG = metricas.gastos / total;
    const pD = metricas.deuda / total;
    return {
      r, circ,
      segments: [
        { color: '#00B37E', dash: `${pI * circ} ${circ}`, offset: 0,                              pct: (pI * 100).toFixed(1), label: 'Ingresos' },
        { color: '#E53E3E', dash: `${pG * circ} ${circ}`, offset: -(pI * circ),                   pct: (pG * 100).toFixed(1), label: 'Gastos' },
        { color: 'var(--accent-primary)', dash: `${pD * circ} ${circ}`, offset: -((pI + pG) * circ), pct: (pD * 100).toFixed(1), label: 'Deuda' },
      ],
    };
  }, [metricas]);

  const filteredCuentas = useMemo(() =>
    cuentas.filter(c => {
      if (!c.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filterMonth) {
        const txs = (c.transacciones || []).filter(t => t.fecha.startsWith(filterMonth));
        if (txs.length === 0) return false;
      }
      return true;
    }), [cuentas, searchTerm, filterMonth]
  );

  // ---- RENDER ----
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 24px 120px', animation: 'fade-in 0.3s ease' }}>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 40, gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--accent-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 2px 12px var(--accent-primary-glow)',
            flexShrink: 0,
          }}>
            <Icon.Wallet />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
              letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              Finanzas Pro
            </h1>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, fontWeight: 400 }}>
              {userEmail}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggleTheme} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {isDark ? <><Icon.Sun /> Claro</> : <><Icon.Moon /> Oscuro</>}
          </button>
          <button onClick={handleLogout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-danger)' }}>
            <Icon.Logout /> Salir
          </button>
        </div>
      </header>

      {/* ── METRIC CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        <MetricCard
          label="Ingresos del mes"
          value={metricas.ingresos}
          color="var(--accent-success)"
          variant="income"
          badge="+Mes"
        />
        <MetricCard
          label="Gastos del mes"
          value={metricas.gastos}
          color="var(--accent-danger)"
          variant="expense"
          badge="-Mes"
        />
        <MetricCard
          label="Deuda activa"
          value={metricas.deuda}
          color="var(--accent-primary)"
          variant="debt"
          badge="Pendiente"
        />
      </div>

      {/* ── CHART CARD ── */}
      <div className="card" style={{ marginBottom: 24, padding: '32px 40px' }}>
        {chartData ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 48, flexWrap: 'wrap',
          }}>
            {/* Donut */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <svg
                width="160" height="160" viewBox="0 0 120 120"
                className="chart-ring"
                style={{ transform: 'rotate(-90deg)' }}
              >
                {/* Track */}
                <circle cx="60" cy="60" r={chartData.r} fill="transparent"
                  stroke="var(--bg-surface-2)" strokeWidth="10" />
                {/* Segments */}
                {chartData.segments.map((seg, i) => (
                  <circle key={i} cx="60" cy="60" r={chartData.r}
                    fill="transparent" stroke={seg.color} strokeWidth="10"
                    strokeDasharray={seg.dash} strokeDashoffset={seg.offset}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              {/* Center label */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transform: 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>
                  TOTAL
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                  color: 'var(--text-primary)', letterSpacing: '-0.02em',
                }}>
                  ${(metricas.ingresos + metricas.gastos + metricas.deuda).toLocaleString('es-MX')}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {chartData.segments.map((seg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="legend-dot" style={{ background: seg.color }} />
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {seg.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                      {seg.pct}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <Icon.TrendUp />
            <span>Registra movimientos para visualizar tu actividad financiera</span>
          </div>
        )}
      </div>

      {/* ── CUENTAS TABLE ── */}
      <div className="card" style={{ overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, flexWrap: 'wrap',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            Registros
          </h2>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="month" value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="input-premium"
              style={{ width: 'auto', padding: '9px 14px', fontSize: 13 }}
            />
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 12, top: '50%',
                transform: 'translateY(-50%)', color: 'var(--text-tertiary)',
                pointerEvents: 'none',
              }}>
                <Icon.Search />
              </span>
              <input
                type="text" placeholder="Buscar registro…"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="input-premium"
                style={{ paddingLeft: 36, width: 200, padding: '9px 14px 9px 34px', fontSize: 13 }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <SkeletonLoader />
          ) : filteredCuentas.length === 0 ? (
            <div className="empty-state">
              <Icon.Search />
              <span>Sin resultados para tu búsqueda</span>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 24 }}>Registro</th>
                  <th>Balance</th>
                  <th style={{ textAlign: 'right', paddingRight: 24 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCuentas.map(cuenta => {
                  const txs     = cuenta.transacciones || [];
                  const isLoan  = txs.some(t => t.tipo === 'Préstamo' && (!t.concepto || !t.concepto.includes('[Préstamo Otorgado]')));
                  const isExpense = txs[0]?.tipo === 'Gasto' && !(txs[0]?.concepto?.includes('[Pago de]'));
                  const amtColor = cuenta.monto === 0 ? 'var(--accent-success)'
                    : isLoan    ? 'var(--accent-primary)'
                    : isExpense ? 'var(--accent-danger)'
                    : 'var(--accent-success)';

                  const txFiltradas = filterMonth
                    ? txs.filter(t => t.fecha.startsWith(filterMonth))
                    : txs;

                  return (
                    <React.Fragment key={cuenta.id}>
                      <tr>
                        <td style={{ paddingLeft: 24 }}>
                          <div className="label-eyebrow" style={{ marginBottom: 3 }}>ID {cuenta.id}</div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                            {cuenta.nombre}
                          </div>
                        </td>
                        <td>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500,
                            color: amtColor, letterSpacing: '-0.02em',
                          }}>
                            ${Math.abs(cuenta.monto).toLocaleString('es-MX')}
                          </span>
                          {isLoan && <span className="badge badge-primary" style={{ marginLeft: 8 }}>Préstamo</span>}
                        </td>
                        <td style={{ paddingRight: 24 }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                            <button onClick={() => toggleRow(cuenta.id)} className="icon-btn" title={expandedRows[cuenta.id] ? 'Ocultar' : 'Ver historial'}>
                              {expandedRows[cuenta.id] ? <Icon.EyeOff /> : <Icon.Eye />}
                            </button>
                            <button onClick={() => generarPDF(cuenta)} className="icon-btn" title="Exportar PDF"><Icon.PDF /></button>
                            <button onClick={() => generarCSV(cuenta)} className="icon-btn success" title="Exportar CSV"><Icon.CSV /></button>
                            <button
                              onClick={() => setEditModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre, newName: cuenta.nombre })}
                              className="icon-btn warning" title="Renombrar"
                            >
                              <Icon.Edit />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, id: cuenta.id, name: cuenta.nombre })}
                              className="icon-btn danger" title="Eliminar"
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded history */}
                      {expandedRows[cuenta.id] && (
                        <tr className="history-row">
                          <td colSpan={3} style={{ padding: '20px 24px' }}>
                            {txFiltradas.length === 0 ? (
                              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                                Sin movimientos en este período.
                              </p>
                            ) : (
                              <>
                                <table style={{ width: '100%' }} className="history-table">
                                  <tbody>
                                    {txFiltradas.map(t => {
                                      const label = t.concepto?.includes('[Préstamo]') ? 'Préstamo' : t.tipo;
                                      const isIncome = t.tipo === 'Ingreso' || t.tipo === 'Abono';
                                      return (
                                        <tr key={t.id}>
                                          <td style={{ color: 'var(--text-tertiary)', width: 100 }}>
                                            {new Date(t.fecha).toLocaleDateString('es-MX')}
                                          </td>
                                          <td style={{ width: 120 }}>
                                            <span className={`badge ${isIncome ? 'badge-success' : t.tipo === 'Préstamo' ? 'badge-primary' : 'badge-danger'}`}>
                                              {label}
                                            </span>
                                          </td>
                                          <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                                            {t.concepto || '—'}
                                          </td>
                                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                            ${t.monto.toLocaleString('es-MX')}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>

                                {!filterMonth && (
                                  <button
                                    onClick={() => loadMoreTransactions(cuenta.id, cuenta.transacciones.length)}
                                    disabled={loadingMore === cuenta.id}
                                    className="btn-ghost"
                                    style={{ marginTop: 14, fontSize: 12 }}
                                  >
                                    {loadingMore === cuenta.id ? 'Cargando…' : 'Cargar historial anterior'}
                                  </button>
                                )}
                              </>
                            )}
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

      {/* ── FAB ── */}
      <button onClick={() => setIsModalOpen(true)} className="fab" aria-label="Nuevo movimiento">
        <Icon.Plus />
      </button>

      {/* ── MOVEMENT MODAL ── */}
      {isModalOpen && (
        <MovementModal
          token={token} cuentas={cuentas} isDark={isDark}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(refundData) => {
            setIsModalOpen(false);
            fetchDashboard();
            if (refundData) {
              setRefundModal({
                isOpen: true, targetId: refundData.targetId, targetName: refundData.targetName,
                options: cuentas.filter(c => c.id !== refundData.targetId),
                selectedId: '', monto: refundData.monto, fecha: refundData.fecha,
              });
            }
          }}
          showToast={showToast}
        />
      )}

      {/* ── MODAL: ELIMINAR ── */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-panel" style={{ textAlign: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, margin: '0 auto 16px',
              background: 'var(--accent-danger-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-danger)',
            }}>
              <Icon.Trash />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Eliminar registro
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>
              ¿Confirmas eliminar <strong style={{ color: 'var(--text-primary)' }}>{deleteModal.name}</strong> y todo su historial?
              <br />Esta acción no puede deshacerse.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
                className="btn-ghost" style={{ flex: 1, padding: '12px 20px' }}
              >
                Cancelar
              </button>
              <button onClick={confirmDelete} className="btn-primary"
                style={{ flex: 1, background: 'var(--accent-danger)', boxShadow: '0 4px 12px var(--accent-danger-glow)' }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: EDITAR ── */}
      {editModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-panel">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.02em' }}>
              Renombrar registro
            </h3>
            <input
              type="text" value={editModal.newName}
              onChange={e => setEditModal(p => ({ ...p, newName: e.target.value }))}
              className="input-premium"
              style={{ marginBottom: 20 }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setEditModal({ isOpen: false, id: null, name: '', newName: '' })}
                className="btn-ghost" style={{ flex: 1, padding: '12px 20px' }}>
                Cancelar
              </button>
              <button onClick={confirmEdit} className="btn-primary" style={{ flex: 1 }}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: REEMBOLSO ── */}
      {refundModal.isOpen && (
        <div className="modal-overlay">
          <form onSubmit={handleRefundSubmit} className="modal-panel">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Devolver capital
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              Elige la cuenta destino para retornar el pago de{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{refundModal.targetName}</strong>.
            </p>
            <select
              required value={refundModal.selectedId}
              onChange={e => setRefundModal(p => ({ ...p, selectedId: e.target.value }))}
              className="input-premium"
              style={{ marginBottom: 20 }}
            >
              <option value="" disabled>— Elige destino —</option>
              {refundModal.options.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
            </select>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="submit" className="btn-primary"
                style={{ background: 'var(--accent-success)', boxShadow: '0 4px 12px var(--accent-success-glow)' }}>
                Confirmar devolución
              </button>
              <button type="button"
                onClick={() => setRefundModal(p => ({ ...p, isOpen: false }))}
                className="btn-ghost" style={{ textAlign: 'center' }}>
                Dejar como efectivo (omitir)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ============================================================
// METRIC CARD COMPONENT
// ============================================================
function MetricCard({ label, value, color, variant, badge }) {
  return (
    <div className={`card metric-card ${variant}`} style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <p className="label-eyebrow">{label}</p>
        {badge && (
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
            padding: '3px 8px', borderRadius: 99,
            background: color + '18', color,
          }}>
            {badge}
          </span>
        )}
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 28, fontWeight: 500,
        color, letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>
        $<AnimatedCounter value={value} />
      </p>
    </div>
  );
}

// ============================================================
// SKELETON LOADER
// ============================================================
function SkeletonLoader() {
  return (
    <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div className="skeleton" style={{ width: '30%', height: 36 }} />
          <div className="skeleton" style={{ width: '20%', height: 24 }} />
          <div className="skeleton" style={{ width: '15%', height: 24, marginLeft: 'auto' }} />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MOVEMENT MODAL
// ============================================================
function MovementModal({ token, cuentas, isDark, onClose, onSuccess, showToast }) {
  const [tipo, setTipo]               = useState('Ingreso');
  const [modo, setModo]               = useState('EXISTING');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [cuentaId, setCuentaId]       = useState('');
  const [monto, setMonto]             = useState('');
  const [fecha, setFecha]             = useState(new Date().toISOString().split('T')[0]);
  const [categoria, setCategoria]     = useState('General');
  const [concepto, setConcepto]       = useState('');
  const [isTransfer, setIsTransfer]   = useState(false);
  const [origenId, setOrigenId]       = useState('');
  const [loading, setLoading]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalMonto = parseFloat(monto);
    if (!finalMonto || isNaN(finalMonto)) return showToast('Monto inválido', 'error');
    if (isTransfer && !origenId && tipo !== 'Ingreso') return showToast('Selecciona cuenta origen', 'error');

    setLoading(true);
    let targetId = cuentaId, targetName = '';

    try {
      if (modo === 'NEW') {
        const res  = await fetch(`${API}/cuentas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ nombre: nombreNuevo, monto: 0 }),
        });
        const data = await res.json();
        targetId = data.id; targetName = data.nombre;
      } else {
        targetName = cuentas.find(c => c.id === Number(cuentaId))?.nombre || 'Cuenta';
      }

      const conceptoFinal = tipo === 'Préstamo'
        ? concepto
        : (categoria !== 'General' ? `[${categoria}] ${concepto}`.trim() : concepto);

      await fetch(`${API}/movimientos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          cuentaId: Number(targetId), tipo, monto: finalMonto,
          concepto: conceptoFinal,
          fecha: fecha ? new Date(`${fecha}T12:00:00`).toISOString() : new Date().toISOString(),
        }),
      });

      if (isTransfer && origenId && tipo !== 'Ingreso') {
        await fetch(`${API}/movimientos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            cuentaId: Number(origenId),
            tipo: 'Gasto', monto: finalMonto,
            concepto: tipo === 'Préstamo'
              ? `[Préstamo Otorgado] a ${targetName}`
              : `[Pago de] ${targetName}`,
            fecha: fecha ? new Date(`${fecha}T12:00:00`).toISOString() : new Date().toISOString(),
          }),
        });
      }

      let refundObject = null;
      if (tipo === 'Ingreso') {
        const target = cuentas.find(c => c.id === Number(targetId));
        if (target?.transacciones?.some(t => t.tipo === 'Préstamo' && (!t.concepto || !t.concepto.includes('[Préstamo Otorgado]')))) {
          refundObject = { targetId, targetName, monto: finalMonto, fecha };
        }
      }
      onSuccess(refundObject);
    } catch {
      showToast('Error al guardar', 'error');
    } finally {
      setLoading(false);
    }
  };

  const TIPOS    = ['Ingreso', 'Gasto', 'Préstamo'];
  const CATS     = ['General', 'Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Pago Tarjeta/Deuda', 'Nómina/Salario'];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ maxWidth: 440 }}>
        {/* Header modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
          }}>
            Nuevo movimiento
          </h2>
          <button onClick={onClose} className="icon-btn" style={{ borderRadius: '50%' }}>
            <Icon.X />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Tab selector de tipo */}
          <div className="tab-selector">
            {TIPOS.map(t => (
              <button key={t} type="button" onClick={() => setTipo(t)}
                className={`tab-btn ${tipo === t ? 'active' : ''}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Modo: existente / nuevo */}
          <select value={modo} onChange={e => setModo(e.target.value)} className="input-premium">
            <option value="EXISTING">Registro existente</option>
            <option value="NEW">Crear nuevo registro</option>
          </select>

          {modo === 'NEW'
            ? <input type="text" placeholder="Nombre del registro" required value={nombreNuevo}
                onChange={e => setNombreNuevo(e.target.value)} className="input-premium" />
            : <select required value={cuentaId} onChange={e => setCuentaId(e.target.value)} className="input-premium">
                <option value="" disabled>— Seleccionar registro —</option>
                {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
          }

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input
              type="text" placeholder="$ Monto" required value={monto}
              onChange={e => setMonto(e.target.value.replace(/[^0-9.]/g, ''))}
              className="input-premium"
            />
            <input
              type="date" required value={fecha}
              onChange={e => setFecha(e.target.value)}
              className="input-premium"
            />
          </div>

          {tipo !== 'Préstamo' && (
            <select value={categoria} onChange={e => setCategoria(e.target.value)} className="input-premium">
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          <input
            type="text" placeholder="Concepto (opcional)" value={concepto}
            onChange={e => setConcepto(e.target.value)}
            className="input-premium"
          />

          {tipo !== 'Ingreso' && (
            <div style={{
              padding: '16px', borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-default)',
            }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 13, fontWeight: 500, color: 'var(--text-primary)',
                cursor: 'pointer', userSelect: 'none',
              }}>
                <input type="checkbox" checked={isTransfer}
                  onChange={e => setIsTransfer(e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                Descontar de otra cuenta
              </label>
              {isTransfer && (
                <select required value={origenId}
                  onChange={e => setOrigenId(e.target.value)}
                  className="input-premium"
                  style={{ marginTop: 12 }}>
                  <option value="" disabled>— Cuenta origen —</option>
                  {cuentas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary"
            style={{ marginTop: 4, padding: '15px 24px' }}>
            {loading ? 'Guardando…' : 'Confirmar movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
}
