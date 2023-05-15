import { Injectable } from '@nestjs/common';
import { DynamoStore } from '@shiftcoders/dynamo-easy';
import { Live } from 'src/models/Live';
import {
  BatchGetLiveDto,
  CreateLiveDto,
  DeleteLiveDto,
  UpdateLiveDto,
} from './dto/lives.dto';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Injectable()
export class LivesService {
  async getLivesAllIds(): Promise<string[]> {
    const livesStore = new DynamoStore(Live);
    const allLive = await livesStore.scan().exec();
    const allLiveIds = allLive.map((live) => live.liveId);
    return allLiveIds;
  }

  async batchGetLivesByLiveIds(
    batchGetLiveDto: BatchGetLiveDto,
  ): Promise<Live[]> {
    const livesStore = new DynamoStore(Live);
    const lives = await Promise.all(
      batchGetLiveDto.liveIds.map((liveId) => {
        return livesStore.query().wherePartitionKey(liveId).execSingle();
      }),
    );
    return lives;
  }

  async createLive(createLiveDto: CreateLiveDto): Promise<void> {
    try {
      const livesStore = new DynamoStore(Live);
      const input: Live = {
        liveId: uuidv4(),
        createdAt: format(new Date(), 'yyyy-MM-dd'),
        updatedAt: format(new Date(), 'yyyy-MM-dd'),
        url: createLiveDto.url,
        bandName: createLiveDto.bandName,
      };

      await livesStore.put(input).ifNotExists().exec();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async updateLive(updateLiveDto: UpdateLiveDto): Promise<void> {
    try {
      const livesStore = new DynamoStore(Live);
      await livesStore
        .update(updateLiveDto.liveId)
        .updateAttribute('bandName')
        .set(updateLiveDto.bandName)
        .updateAttribute('url')
        .set(updateLiveDto.url)
        .updateAttribute('updatedAt')
        .set(format(new Date(), 'yyyy-MM-dd'))
        .exec();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteLive(deleteLiveDto: DeleteLiveDto): Promise<void> {
    try {
      const livesStore = new DynamoStore(Live);
      await livesStore.delete(deleteLiveDto.liveId).exec();
      return;
    } catch (error) {
      console.error(error);
    }
  }
}
