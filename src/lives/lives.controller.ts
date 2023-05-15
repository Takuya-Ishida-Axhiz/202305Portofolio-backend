import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Live } from 'src/models/Live';
import {
  BatchGetLiveDto,
  CreateLiveDto,
  DeleteLiveDto,
  UpdateLiveDto,
} from './dto/lives.dto';

import { LivesService } from './lives.service';

@Controller('lives')
export class LivesController {
  constructor(private readonly livesService: LivesService) {}
  @Get('/get-all-ids')
  async getLivesAllIds(): Promise<string[]> {
    return await this.livesService.getLivesAllIds();
  }

  @Post('/batch-get')
  async batchGet(@Body() batchGetLivesDto: BatchGetLiveDto): Promise<Live[]> {
    return await this.livesService.batchGetLivesByLiveIds(batchGetLivesDto);
  }

  @Post('/new')
  async create(@Body() createLiveDto: CreateLiveDto): Promise<void> {
    await this.livesService.createLive(createLiveDto);
    return;
  }

  @Post('/update')
  async update(@Body() updateLiveDto: UpdateLiveDto): Promise<void> {
    await this.livesService.updateLive(updateLiveDto);
    return;
  }

  @Post('/delete')
  async delete(@Body() deleteLiveDto: DeleteLiveDto): Promise<void> {
    await this.livesService.deleteLive(deleteLiveDto);
    return;
  }
}
