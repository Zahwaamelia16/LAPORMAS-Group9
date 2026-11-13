import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT || '/api/auth/login';

function BrandMark() {
  return (
    <div className="brand" aria-label="LAPORMAS">
      <svg className="brand__icon" viewBox="0 0 58 48" role="img" aria-hidden="true">
        <path d="M5 35.5c8-7.2 15.6-10.2 23.3-9.1 7.2 1 13.5 5 24.7 3.1v7.2c-10.8 2-17.2-1.8-24.7-2.6-8.3-.9-15.7 2.6-23.3 8.2v-6.8Z" fill="currentColor" />
        <path d="M6 27.8c7.3-6.1 15.3-8.2 22.4-6.8 7.6 1.5 13.5 5.6 24.6 3.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M34 5.8c0-4 3.1-6.3 6.2-6.3s6.2 2.3 6.2 6.3c0 5.4-6.2 12.2-6.2 12.2S34 11.2 34 5.8Z" fill="currentColor" />
        <circle cx="40.2" cy="5.9" r="2.1" fill="#1d603b" />
        <path d="M13 23.5 20 12l5.5 8.4 4.3-5.7 7.8 9.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="brand__copy">
        <strong>LAPORMAS</strong>
        <small>Layanan Pelaporan &amp; Resolusi</small>
        <small>Masalah Area</small>
      </span>
    </div>
  );
}

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M7.2 3.8 9.4 3c.8-.3 1.6.1 1.9.9l1.1 2.7c.2.6.1 1.2-.4 1.6l-1.5 1.2a14.2 14.2 0 0 0 4.1 4.1l1.2-1.5c.4-.5 1-.6 1.6-.4l2.7 1.1c.8.3 1.2 1.1.9 1.9l-.8 2.2c-.3.8-1.1 1.3-2 1.2C10.8 17.2 6.8 13.2 6 5.8c-.1-.9.4-1.7 1.2-2Z" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /><path d="M12 14v3" /></>,
    eye: <><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    eyeOff: <><path d="m3 3 18 18" /><path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.1 0 9.5 6 9.5 6a16 16 0 0 1-3 3.5M6.2 6.8C3.8 8.3 2.5 12 2.5 12s3.4 6 9.5 6c1.3 0 2.5-.3 3.5-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
    arrow: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.2a4 4 0 0 1 0 7.6" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

function HeroPanel() {
  return (
    <section className="hero-panel">
      <div className="hero-panel__shade" />
      <div className="hero-panel__content">
        <BrandMark />
        <div className="hero-copy">
          <h1>Lingkungan sehat<br />dimulai dari sini</h1>
          <p>
            Platform pelaporan masalah lingkungan yang memudahkan warga dan pengelola
            bekerja sama menjaga kenyamanan bersama.
          </p>
        </div>
        <div className="hero-stats" aria-label="Statistik LAPORMAS">
          <div className="stat-card"><strong>124</strong><span>Laporan Masuk</span></div>
          <div className="stat-card"><strong>98</strong><span>Terselesaikan</span></div>
          <div className="stat-card"><strong>2.400</strong><span>Warga Terbantu</span></div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [role, setRole] = useState('warga');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const isManager = role === 'pengelola';

  function changeRole(nextRole) {
    setRole(nextRole);
    setMessage('');
    setIdentifier('');
    setPassword('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!identifier.trim() || !password) {
      setMessageType('error');
      setMessage('Email/nomor telepon dan kata sandi wajib diisi.');
      return;
    }

    if (!API_BASE_URL) {
      setMessageType('info');
      setMessage('Tampilan login sudah siap. Hubungkan API dengan mengisi VITE_API_BASE_URL di file .env sebelum proses login diaktifkan.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Sesuaikan nama properti payload dan endpoint ini dengan kontrak REST API LAPORMAS.
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
          role: isManager ? 'petugas' : 'warga',
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || 'Login gagal. Periksa kembali data akun Anda.');
      }

      setMessageType('success');
      setMessage(result.message || 'Permintaan login berhasil dikirim ke server.');
      // Token dan redirect belum disimpan karena format respons autentikasi backend belum ditentukan.
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    setMessageType('info');
    setMessage('Fitur lupa kata sandi akan dihubungkan setelah endpoint reset password tersedia.');
  }

  return (
    <main className="page-shell">
      <div className="login-card">
        <HeroPanel />

        <section className="form-panel">
          <a className="back-link" href="/" onClick={(event) => event.preventDefault()}>
            <Icon name="arrow" size={16} />
            <span>Kembali</span>
          </a>

          <div className="form-content">
            <header className="form-heading">
              <h2>Selamat Datang</h2>
              <p>Laporkan masalah di lingkunganmu dan pantau penyelesaiannya.</p>
            </header>

            <div className="role-switch" role="tablist" aria-label="Pilih jenis akun">
              <button
                type="button"
                role="tab"
                aria-selected={!isManager}
                className={`role-switch__button ${!isManager ? 'is-active' : ''}`}
                onClick={() => changeRole('warga')}
              >
                Warga
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isManager}
                className={`role-switch__button ${isManager ? 'is-active' : ''}`}
                onClick={() => changeRole('pengelola')}
              >
                Pengelola
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="identifier">{isManager ? 'Email Dinas / No. Telepon' : 'Email / No. Telepon'}</label>
                <div className="input-wrap">
                  <Icon name={isManager ? 'mail' : 'mail'} />
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    placeholder={isManager ? 'pengelola@lapormas.id' : 'Masukkan email atau nomor telepon'}
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="password">Kata Sandi</label>
                <div className="input-wrap">
                  <Icon name="lock" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={17} />
                  </button>
                </div>
              </div>

              <div className="forgot-row">
                <a href="#lupa-password" onClick={handleForgotPassword}>Lupa kata sandi?</a>
              </div>

              {message && <div className={`form-message form-message--${messageType}`} role="status">{message}</div>}

              <button className="submit-button" type="submit" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <p className="signup-prompt">
              Belum punya akun?{' '}
              <a href={`/register?role=${isManager ? 'petugas' : 'warga'}`}>Silahkan Sign Up</a>
            </p>

            {isManager && (
              <p className="manager-note">
                <Icon name="shield" size={14} />
                Akun pengelola harus melalui proses verifikasi admin.
              </p>
            )}
          </div>
        </section>
      </div>
      <footer className="page-footer">© {new Date().getFullYear()} LAPORMAS · Layanan Pelaporan &amp; Resolusi Masalah Area</footer>
    </main>
  );
}
