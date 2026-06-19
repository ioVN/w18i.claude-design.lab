import { useState, useMemo } from 'react';
import { ConversationList } from './ConversationList';
import { DetailsPanel } from './DetailsPanel';
import { mockConversations } from './data';
import './styles.css';

export function App() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const selectedConversation = useMemo(() => {
    return mockConversations.find((conv) => conv.id === selectedConversationId) || null;
  }, [selectedConversationId]);

  return (
    <div className="container">
      <ConversationList
        conversations={mockConversations}
        selectedId={selectedConversationId}
        onSelect={setSelectedConversationId}
      />
      <DetailsPanel conversation={selectedConversation} />
    </div>
  );
}

export default App;
