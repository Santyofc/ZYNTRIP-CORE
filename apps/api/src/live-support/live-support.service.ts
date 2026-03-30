import { Injectable } from '@nestjs/common';

interface SupportConversation {
  id: string;
  tripId?: string;
  channel: 'chat' | 'voice' | 'whatsapp';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'active' | 'resolved';
  openedAt: string;
}

@Injectable()
export class LiveSupportService {
  private readonly conversations: SupportConversation[] = [
    {
      id: 'support-1',
      tripId: 'seed-1',
      channel: 'chat',
      priority: 'medium',
      status: 'open',
      openedAt: new Date().toISOString(),
    },
  ];

  listConversations() {
    return this.conversations;
  }

  openConversation(payload: Omit<SupportConversation, 'id' | 'openedAt' | 'status'>) {
    const conversation: SupportConversation = {
      id: crypto.randomUUID(),
      openedAt: new Date().toISOString(),
      status: 'open',
      ...payload,
    };

    this.conversations.unshift(conversation);
    return conversation;
  }
}
