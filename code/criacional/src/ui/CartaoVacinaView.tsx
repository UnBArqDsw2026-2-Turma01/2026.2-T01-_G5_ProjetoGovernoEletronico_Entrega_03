import React from 'react';
import type { CartaoVacina } from '../padrao/CartaoVacina';

interface Props {
  vacina: CartaoVacina;
}

export const CartaoVacinaView: React.FC<Props> = ({ vacina }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.tag}>{vacina.dose}</div>
        <span style={styles.data}>
          {vacina.dataRegistro.toLocaleDateString('pt-BR')}
        </span>
      </div>

      <h3 style={styles.titulo}>{vacina.imunobiologico}</h3>
      <p style={styles.subtitulo}><strong>Fabricante:</strong> {vacina.fabricante}</p>

      <div style={styles.gridInfo}>
        <div>
          <span style={styles.label}>Lote:</span>
          <span style={styles.valor}>{vacina.lote}</span>
        </div>
        <div>
          <span style={styles.label}>Local:</span>
          <span style={styles.valor}>{vacina.estabelecimento}</span>
        </div>
        {vacina.vacinador && (
          <div style={{ gridColumn: 'span 2' }}>
            <span style={styles.label}>Profissional / Vacinador:</span>
            <span style={styles.valor}>{vacina.vacinador}</span>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <span style={styles.categoriaTag}>✓ RNDS Sincronizada</span>
        <span style={styles.classeInstanciada}>Classe: <code>CartaoVacina</code></span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '18px 20px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e1e8ed',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#e6f4ea',
    color: '#137333',
    fontWeight: '700',
    fontSize: '0.82rem',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  data: {
    fontSize: '0.85rem',
    color: '#5f6368',
    fontWeight: '500',
  },
  titulo: {
    margin: '4px 0 0 0',
    fontSize: '1.25rem',
    color: '#1a73e8',
    fontWeight: '700',
  },
  subtitulo: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#3c4043',
  },
  gridInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.88rem',
  },
  label: {
    display: 'block',
    color: '#70757a',
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  valor: {
    color: '#202124',
    fontWeight: '600',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '8px',
    borderTop: '1px solid #f1f3f4',
    fontSize: '0.8rem',
  },
  categoriaTag: {
    color: '#188038',
    fontWeight: '600',
  },
  classeInstanciada: {
    color: '#80868b',
    fontSize: '0.78rem',
  },
};
