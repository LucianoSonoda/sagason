import React from 'react';

export function ChileanHamburger({ isOpen, onClick, size = 28 }) {
    const lineHeight = Math.max(2, Math.floor(size / 8));
    const spacing = size / 4;

    return (
        <button 
            onClick={onClick}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
                padding: 0,
                position: 'relative'
            }}
            aria-label="Menu"
        >
            {isOpen ? (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing}px`, width: '100%' }}>
                    <div style={{ width: '100%', height: `${lineHeight}px`, backgroundColor: '#0039a6', borderRadius: '2px' }} />
                    <div style={{ width: '100%', height: `${lineHeight}px`, backgroundColor: '#ffffff', borderRadius: '2px' }} />
                    <div style={{ width: '100%', height: `${lineHeight}px`, backgroundColor: '#d52b1e', borderRadius: '2px' }} />
                </div>
            )}
        </button>
    );
}
