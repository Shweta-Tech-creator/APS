import React from 'react';
import './ui.css';

/**
 * SeverityBadge — Critical | High | Medium | Low
 * Props: severity ('critical' | 'high' | 'medium' | 'low'), size ('sm' | 'md')
 */
export const SeverityBadge = ({ severity, size = 'md', count }) => {
    const label = severity.charAt(0).toUpperCase() + severity.slice(1);
    return (
        <span
            className={`ui-severity-badge ${severity} ${size}`}
            role="img"
            aria-label={`${label} severity${count !== undefined ? `: ${count}` : ''}`}
        >
            {count !== undefined ? count : label}
        </span>
    );
};

/**
 * StatusChip — Completed | Scheduled | Failed
 * Props: status ('completed' | 'scheduled' | 'failed')
 */
export const StatusChip = ({ status }) => {
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return (
        <span
            className={`ui-status-chip ${status.toLowerCase()}`}
            role="status"
            aria-label={`Status: ${label}`}
        >
            <span className="ui-status-dot" aria-hidden="true" />
            {label}
        </span>
    );
};

/**
 * Button — Primary | Outline | Danger | Ghost | Toolbar
 * Props: variant, size, icon, loading, disabled, onClick, children, ...rest (aria props etc.)
 */
export const Button = ({
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
    disabled = false,
    children,
    onClick,
    ariaLabel,
    ...rest
}) => {
    return (
        <button
            className={`ui-btn ${variant} ${size} ${loading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel || undefined}
            aria-busy={loading}
            aria-disabled={disabled || loading}
            {...rest}
        >
            {loading && <span className="ui-btn-spinner" aria-hidden="true" />}
            {icon && !loading && <span className="ui-btn-icon" aria-hidden="true">{icon}</span>}
            {children && <span>{children}</span>}
        </button>
    );
};

/**
 * SkeletonLine — animated shimmer placeholder
 * Props: width, height, borderRadius
 */
export const SkeletonLine = ({ width = '100%', height = '1rem', borderRadius = '6px', style = {} }) => (
    <span
        className="ui-skeleton"
        aria-hidden="true"
        style={{ width, height, borderRadius, display: 'block', ...style }}
    />
);

/**
 * SkeletonCard — generic skeleton card
 */
export const SkeletonCard = ({ lines = 3, style = {} }) => (
    <div className="ui-skeleton-card" aria-hidden="true" role="presentation" style={style}>
        <SkeletonLine width="40%" height="0.75rem" style={{ marginBottom: '0.75rem' }} />
        <SkeletonLine width="60%" height="2rem" style={{ marginBottom: '0.5rem' }} />
        {Array.from({ length: lines - 2 }).map((_, i) => (
            <SkeletonLine key={i} width={`${70 + i * 5}%`} height="0.7rem" style={{ marginTop: '0.4rem' }} />
        ))}
    </div>
);

/**
 * TableRowSkeleton — shimmer row for tables
 */
export const TableRowSkeleton = ({ cols = 7 }) => (
    <tr className="ui-skeleton-row" aria-hidden="true" role="presentation">
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} style={{ padding: '1.25rem 1rem' }}>
                <SkeletonLine width={i === 0 ? '80%' : i === 3 ? '120px' : '60%'} height="0.75rem" />
            </td>
        ))}
    </tr>
);
