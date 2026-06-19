import { Conversation } from './types';
import './styles.css';

interface DetailsPanelProps {
  conversation: Conversation | null;
}

export function DetailsPanel({ conversation }: DetailsPanelProps) {
  if (!conversation) {
    return <div className="details-panel empty" />;
  }

  const info = conversation.collectedInfo;

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return 'Not provided';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const isReady = conversation.applicationReadiness === 'READY';

  return (
    <div className="details-panel">
      {/* Overview Header */}
      <div className="overview-header">
        <div className="header-item">
          <span className="header-item-label">Application Readiness</span>
          <span className={`header-item-value ${conversation.applicationReadiness.toLowerCase()}`}>
            {conversation.applicationReadiness}
          </span>
        </div>
        <div className="header-item">
          {isReady && (
            <div className="ready-for-handoff">
              ✓ Ready For Handoff
            </div>
          )}
        </div>
      </div>

      {/* Overview Section */}
      <div className="section">
        <h3 className="section-title">Overview</h3>
        <div className="info-grid">
          <div className="info-row">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{conversation.phoneNumber}</span>
          </div>
          <div className="info-row">
            <span className="info-label">WhatsApp Name</span>
            <span className="info-value">{conversation.whatsappFullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Last Updated</span>
            <span className="info-value">{formatTime(conversation.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Collected Information Section */}
      <div className="section">
        <h3 className="section-title">Collected Information</h3>
        <div className="info-grid">
          <div className="info-row">
            <span className="info-label">Customer Name</span>
            <span className={`info-value ${!info.customerName ? 'empty' : ''}`}>
              {info.customerName || 'Not provided'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">RFC</span>
            <span className={`info-value ${!info.rfc ? 'empty' : ''}`}>
              {info.rfc || 'Not provided'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">CURP</span>
            <span className={`info-value ${!info.curp ? 'empty' : ''}`}>
              {info.curp || 'Not provided'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Monthly Income</span>
            <span className={`info-value ${!info.monthlyIncome ? 'empty' : ''}`}>
              {info.monthlyIncome ? formatCurrency(info.monthlyIncome) : 'Not provided'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Loan Amount Requested</span>
            <span className={`info-value ${!info.loanAmountRequested ? 'empty' : ''}`}>
              {info.loanAmountRequested ? formatCurrency(info.loanAmountRequested) : 'Not provided'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Estimated Interest Rate</span>
            <span className={`info-value ${!info.estimatedInterestRate ? 'empty' : ''}`}>
              {info.estimatedInterestRate ? `${info.estimatedInterestRate}%` : 'Not provided'}
            </span>
          </div>
        </div>

        <div style={{ gridColumn: '1 / -1' }} className="info-row">
          <span className="info-label">Residential Address</span>
          <span className={`info-value ${!info.residentialAddress ? 'empty' : ''}`}>
            {info.residentialAddress || 'Not provided'}
          </span>
        </div>

        <div style={{ marginTop: 'var(--spacing-20)' }} className="info-row">
          <span className="info-label">Credit Bureau Authorization</span>
          <span className={`info-value ${info.creditBureauAuthorization === false ? 'false' : ''} ${info.creditBureauAuthorization === undefined ? 'empty' : ''}`}>
            {info.creditBureauAuthorization === true && '✓ Yes'}
            {info.creditBureauAuthorization === false && '✗ No'}
            {info.creditBureauAuthorization === undefined && 'Not provided'}
          </span>
        </div>
      </div>

      {/* Documents Section */}
      {(info.documentsReceived === undefined || info.documentsReceived.length > 0) && (
        <div className="section">
          <h3 className="section-title">Documents Received</h3>
          {info.documentsReceived && info.documentsReceived.length > 0 ? (
            <div className="documents-grid">
              {info.documentsReceived.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className={`document-thumbnail ${doc.thumbnail || doc.url ? '' : 'empty'}`}>
                    {doc.thumbnail || doc.url ? (
                      <img src={doc.thumbnail || doc.url} alt={doc.name} />
                    ) : (
                      'No document'
                    )}
                  </div>
                  <span className="document-name">{doc.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="info-row">
              <span className="info-value empty">No documents received</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
