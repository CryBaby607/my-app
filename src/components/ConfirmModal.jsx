import '../../styles/components/ConfirmModal.css';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
  variant = 'danger' // 'danger' | 'warning' | 'info'
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="confirm-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="confirm-container">
        <div className={`confirm-content ${variant}`}>
          {/* Icon */}
          <div className="confirm-icon">
            {getIcon()}
          </div>

          {/* Text */}
          <div className="confirm-text">
            <h3>{title}</h3>
            <p>{message}</p>
          </div>

          {/* Actions */}
          <div className="confirm-actions">
            <button
              className="confirm-btn-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              className={`confirm-btn-confirm ${variant}`}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Procesando...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}