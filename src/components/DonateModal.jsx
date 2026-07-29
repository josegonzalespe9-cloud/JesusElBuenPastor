import React from 'react';
import { X, Heart, CreditCard, Gift, ShieldCheck } from 'lucide-react';
import { churchInfo } from '../data/churchData';

export default function DonateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Gift size={24} color="var(--primary-gold)" />
            <h3 className="modal-title">Donar y Apoyar al Ministerio</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <Heart size={30} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--bg-dark)' }}>
              Siembra en la Obra de Dios
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Cada contribución permite seguir extendiendo la predicación del Evangelio, sosteniendo los estudios bíblicos gratuitos y ayudando a los necesitados.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', backgroundColor: '#FAF7F2' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--bg-dark)', marginBottom: '4px' }}>
                Transferencia Bancaria Directa
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Cuenta Corriente: 1234-5678-9012-3456<br />
                Titular: Ministerio {churchInfo.name}<br />
                RUT / RUC: 901.234.567-8
              </div>
            </div>

            <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', backgroundColor: '#FAF7F2' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--bg-dark)', marginBottom: '4px' }}>
                Diezmos y Ofrendas Online (Tarjetas de Crédito / Débito)
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => alert("Simulación de donación realizada con éxito. ¡Dios bendiga tu ofrenda!")} className="btn-primary-gold" style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <CreditCard size={18} /> Donar $10 USD
                </button>
                <button onClick={() => alert("Simulación de donación realizada con éxito. ¡Dios bendiga tu ofrenda!")} className="btn-primary-gold" style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <CreditCard size={18} /> Donar $25 USD
                </button>
                <button onClick={() => alert("Simulación de donación realizada con éxito. ¡Dios bendiga tu ofrenda!")} className="btn-primary-gold" style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <CreditCard size={18} /> Donar $50 USD
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)', justifyContent: 'center', marginTop: '8px' }}>
              <ShieldCheck size={16} color="#10B981" /> Donación 100% Segura y Transparente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
