import { useState, useMemo } from 'react';
import { Conversation } from './types';
import './styles.css';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter((conv) =>
      conv.wamid.toLowerCase().includes(query) ||
      conv.phoneNumber.toLowerCase().includes(query) ||
      conv.whatsappFullName.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Conversations</h2>
        <input
          type="text"
          className="search-box"
          placeholder="Search by WAMID, phone, or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search conversations"
        />
      </div>

      <ul className="conversations-list">
        {filteredConversations.map((conv) => (
          <li
            key={conv.id}
            className={`conversation-item ${selectedId === conv.id ? 'active' : ''}`}
            onClick={() => onSelect(conv.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelect(conv.id);
              }
            }}
          >
            <div className="conversation-item-header">
              <span className="conversation-item-name">
                {conv.whatsappFullName}
              </span>
              <span className={`readiness-badge ${conv.applicationReadiness.toLowerCase()}`}>
                {conv.applicationReadiness}
              </span>
            </div>

            <div className="conversation-item-details">
              <div className="conversation-item-detail-row">
                <span className="conversation-item-detail-label">WAMID:</span>
                <span className="conversation-item-detail-value">{conv.wamid}</span>
              </div>
              <div className="conversation-item-detail-row">
                <span className="conversation-item-detail-label">Phone:</span>
                <span className="conversation-item-detail-value">{conv.phoneNumber}</span>
              </div>
            </div>

            <div className="conversation-item-time">
              {formatTime(conv.lastUpdated)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
