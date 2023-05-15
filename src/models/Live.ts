import {
  Model,
  PartitionKey,
  GSIPartitionKey,
  GSISortKey,
  SortKey,
} from '@shiftcoders/dynamo-easy';

const difficultyIndex = 'difficulty_index';

@Model({ tableName: `202305-portofolio-lives-table` })
export class Live {
  @PartitionKey()
  liveId: string;

  url!: string;
  bandName!: string;
  createdAt!: string;
  updatedAt!: string;
}
