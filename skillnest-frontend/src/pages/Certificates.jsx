import {
  Award,
  Download,
  ShieldCheck,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const CertificateTemplate = ({ cert, isDark, forDownload = false }) => {
  if (!cert) return null;

  return (
    <div
      id={forDownload ? `download-template-${cert.id}` : `certificate-${cert.id}`}
      style={{
        width: '800px',
        height: '600px',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
        border: '12px double rgba(30, 58, 138, 0.2)',
        fontFamily: "'Inter', sans-serif",
        opacity: 1,
        visibility: 'visible',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '256px',
          height: '256px',
          backgroundColor: '#eff6ff',
          borderRadius: '9999px',
          marginRight: '-128px',
          marginTop: '-128px',
          opacity: 0.5
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '256px',
          height: '256px',
          backgroundColor: '#eff6ff',
          borderRadius: '9999px',
          marginLeft: '-128px',
          marginBottom: '-128px',
          opacity: 0.5
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          border: '2px solid rgba(30, 58, 138, 0.1)',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
              backgroundColor: '#0066FF',
              color: '#ffffff'
            }}
          >
            S
          </div>
          <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', letterSpacing: '-0.025em' }}>SkillNest</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', marginBottom: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Certificate</h1>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#64748b', marginBottom: '48px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>of Completion</h2>

        <p style={{ fontSize: '18px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '16px' }}>This is to certify that</p>
        <h3 style={{ fontSize: '48px', fontFamily: 'serif', fontStyle: 'italic', color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingLeft: '48px', paddingRight: '48px', paddingBottom: '8px' }}>
          {cert.recipient}
        </h3>

        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '448px', lineHeight: '1.625', marginBottom: '48px' }}>
          has successfully completed the <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{cert.title}</span> at <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{cert.company}</span>.
        </p>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingLeft: '32px', paddingRight: '32px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ width: '192px', borderBottom: '1px solid #cbd5e1', marginBottom: '8px' }} />
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{cert.recipient}</p>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Director, SkillNest</p>
          </div>

          {/* Seal */}
          <div style={{ position: 'relative', width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(37, 99, 235, 0.2)', borderRadius: '9999px' }} />
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '9999px',
                border: '2px solid #2563eb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                margin: 'auto'
              }}
            >
              <CheckCircle2 size={32} style={{ marginBottom: '4px' }} />
              <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>SkillNest Verified</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', margin: 0 }}>Issue Date: {cert.date}</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', margin: 0 }}>ID: {cert.id_code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Certificates({ isDark }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const certificateRef = useRef(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        const internshipId = "69cb8b10dd61d6961a999715"; // test ke liye

        const res = await fetch(`http://localhost:5000/api/certificate?internshipId=${internshipId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // // ✅ USE THIS
        // const blob = await res.blob();
        // // setCertificates(data);

        // const url = window.URL.createObjectURL(blob);
        // // 👉 direct open kar de
        // window.open(url);
        setCertificates([
          {
            id: "1",
            title: "SAMPLE INTERNSHIP",
            company: "SkillNest",
            date: "2026",
            recipient: "User",
            logo: "https://picsum.photos/100",
            verified: true,
            id_code: "SN-001"
          }
        ]);

      } catch (err) {
        console.log(err);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
  
    const res = await fetch(
      `http://localhost:5000/api/certificate?internshipId=69cb8b10dd61d6961a999715`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
  
    window.open(url); // ✅ सही जगह
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            My Certificates
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            View and download your earned internship certificates.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border flex-1 md:w-80 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-400"
            />
          </div>
          <button className={`p-3 rounded-2xl border transition-all ${isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
            }`}>
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-2xl bg-royal-indigo/10 text-royal-indigo`}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Blockchain Verified Certificates</h3>
            <p className="text-sm text-slate-500">All SkillNest certificates are cryptographically signed and can be verified by employers using the unique ID or QR code.</p>
          </div>
          <button className="ml-auto text-sm font-bold text-royal-indigo hover:underline">Learn More</button>
          {/* <button onClick={handleDownload}>
            View Certificate
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-3xl border overflow-hidden transition-all hover:shadow-xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-100'
                }`}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-200">
                {/* Hidden Template for Download - Positioned far off-screen but fully rendered */}
                <div className="fixed" style={{ left: '-9999px', top: '-9999px' }}>
                  <CertificateTemplate cert={cert} isDark={isDark} forDownload={true} />
                </div>

                {/* Preview Image (Simplified version of template) */}
                <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-white">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-2">S</div>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Certificate of Completion</h5>
                  <p className="text-[8px] text-slate-400 mb-1 italic">This is to certify that</p>
                  <h4 className="text-lg font-serif italic text-slate-900 mb-2">{cert.recipient}</h4>
                  <p className="text-[8px] text-slate-500 max-w-[150px]">for successfully completing the {cert.title}</p>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDownload(cert)}
                    className="p-4 rounded-full bg-white text-royal-indigo shadow-lg hover:scale-110 transition-transform"
                  >
                    <Download size={24} />
                  </button>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-4 rounded-full bg-white text-royal-indigo shadow-lg hover:scale-110 transition-transform"
                  >
                    <ExternalLink size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <img src={cert.logo} alt={cert.company} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{cert.title}</h4>
                      <p className={`text-sm font-medium ${isDark ? 'text-royal-indigo' : 'text-primary-blue'}`}>{cert.company}</p>
                    </div>
                  </div>
                  {cert.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">
                      <ShieldCheck size={12} />
                      Verified
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 pt-4 border-t border-inherit">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500">Issued on {cert.date}</p>
                    <button className="text-xs font-bold text-royal-indigo hover:underline">Verify ID: {cert.id_code}</button>
                  </div>
                  <button
                    onClick={() => handleDownload(cert)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${isDark
                      ? 'bg-royal-indigo text-white hover:bg-opacity-90'
                      : 'bg-primary-blue text-white hover:bg-opacity-90'
                      }`}
                  >
                    <Download size={16} />
                    Download Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Full Preview */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 z-10"
              >
                <X size={24} />
              </button>

              <div className="p-12 flex flex-col items-center">
                <CertificateTemplate cert={selectedCert} isDark={false} />

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => handleDownload(selectedCert)}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-royal-indigo text-white font-bold hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    <Download size={20} />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
