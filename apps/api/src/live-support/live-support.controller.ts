import { Body, Controller, Get, Post } from '@nestjs/common';
import { LiveSupportService } from './live-support.service';

@Controller('live-support')
export class LiveSupportController {
  constructor(private readonly liveSupportService: LiveSupportService) {}

  @Get('conversations')
  listConversations() {
    return this.liveSupportService.listConversations();
  }

  @Post('conversations')
  openConversation(
    @Body()
    payload: {
      tripId?: string;
      channel: 'chat' | 'voice' | 'whatsapp';
      priority: 'low' | 'medium' | 'high';
    },
  ) {
    return this.liveSupportService.openConversation(payload);
  }
}
