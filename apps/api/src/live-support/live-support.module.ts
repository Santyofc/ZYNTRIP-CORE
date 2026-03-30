import { Module } from '@nestjs/common';
import { LiveSupportController } from './live-support.controller';
import { LiveSupportService } from './live-support.service';

@Module({
  controllers: [LiveSupportController],
  providers: [LiveSupportService],
  exports: [LiveSupportService],
})
export class LiveSupportModule {}
