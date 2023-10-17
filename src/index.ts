/**
 * Copyright (c) 2023 Ryuichiro Semba Co., Ltd. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import dayjs from 'dayjs';
import { assertIsHoliday } from './application/validator/validator';
import {
  fetchBacklogIssuesByDueDate,
  fetchBacklogIssuesByStartDate,
} from './domain/client/fetchBacklogIssuesClient';
import { Issue } from 'backlog-js/dist/types/entity';
import { createTextBlocks } from './application/usecase/textBlockFactory';
import { postSlackMessage } from './domain/client/postSlackMessageClient';

/**
 * エントリーポイント.
 */
const main = async () => {
  console.info('*** Start Function ***');

  const now: dayjs.Dayjs = dayjs();
  console.info(`now: ${now}`);

  if (assertIsHoliday(now)) {
    console.info('休日のため処理を終了します。');
    return;
  }

  const yesterday: dayjs.Dayjs = now.subtract(1, 'd');

  const dueDateIssues: Issue.Issue[] = fetchBacklogIssuesByDueDate(
    [1, 2, 3], // 完了以外
    yesterday
  );

  if (dueDateIssues.length) {
    console.info('完了期限切れタスクがあります。', dueDateIssues);
  } else {
    console.info('完了期限切れタスクはありません。');
  }

  const startDateIssues = fetchBacklogIssuesByStartDate([1], yesterday);
  if (startDateIssues.length) {
    console.info('開始期限切れタスクがあります。', startDateIssues);
  } else {
    console.info('開始期限切れタスクはありません');
  }

  if (!dueDateIssues.length && !startDateIssues.length) {
    console.info('通知対象のタスクはありません。');
    return;
  }

  const blocks = createTextBlocks(dueDateIssues, startDateIssues);
  console.log(JSON.stringify(blocks));

  postSlackMessage(blocks);

  console.info('*** End Function ***');
};
