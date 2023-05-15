import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivesController } from './lives/lives.controller';
import { LivesService } from './lives/lives.service';

@Module({
  imports: [],
  controllers: [AppController, LivesController],
  providers: [AppService, LivesService],
})
export class AppModule {}
