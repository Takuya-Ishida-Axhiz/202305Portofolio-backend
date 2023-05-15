export class BatchGetLiveDto {
  liveIds: string[];
}

export class CreateLiveDto {
  url: string;
  bandName: string;
}

export class UpdateLiveDto {
  liveId: string;
  url: string;
  bandName: string;
}

export class DeleteLiveDto {
  liveId: string;
}
