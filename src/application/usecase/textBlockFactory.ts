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
import { fetchSlackUserByEmail } from '../../domain/client/fetchSlackUserClient';
import { Issue } from 'backlog-js/dist/types/entity';
import { Environments } from '../../config/environments';
import { UsersLookupByEmailResponse } from '@slack/web-api';

export function createTextBlocks(
  dueDateIssues: Issue.Issue[],
  startDateIssues: Issue.Issue[]
): object[] {
  const blocks: object[] = [];

  const title: object = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*期限切れタスク一覧*\nチケットの進捗更新をお願いします:pray:',
    },
  };

  const divider: object = {
    type: 'divider',
  };

  blocks.push(title);
  blocks.push(divider);

  dueDateIssues.forEach(issue => {
    const dueDate: string = dayjs(issue.dueDate)
      .locale('ja')
      .format('MM/DD (ddd)');

    // FIXME: API 呼び出しはループの外で1回だけに留めたい
    const slackUser: UsersLookupByEmailResponse = fetchSlackUserByEmail(
      issue.assignee?.mailAddress || ''
    );
    console.log(
      `担当者: Backlog : ${issue.assignee?.name} / Slack : ${slackUser.user?.real_name}`
    );
    console.log(`チケット: ${issue.issueKey} ${issue.summary}`);
    console.log(
      `URL: https://${Environments.BACKLOG_PROJECT_HOST}/view/${issue.issueKey}`
    );

    const section: object = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<https://${Environments.BACKLOG_PROJECT_HOST}/view/${issue.issueKey}|${issue.issueKey} ${issue.summary}>*\n担当者: ${issue.assignee?.name} <@${slackUser.user?.id}>\n期限日: ${dueDate}\nステータス: ${issue.status.name}`,
      },
    };
    blocks.push(section);
  });

  const title2: object = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*未開始タスク一覧*\nチケットの対応を開始してください。:pray:',
    },
  };

  blocks.push(divider);
  blocks.push(title2);
  blocks.push(divider);

  startDateIssues.forEach(issue => {
    const startDate: string = dayjs(issue.startDate)
      .locale('ja')
      .format('MM/DD (ddd)');

    const slackUser: UsersLookupByEmailResponse = fetchSlackUserByEmail(
      issue.assignee?.mailAddress || ''
    );
    console.log(
      `担当者: Backlog : ${issue.assignee?.name} / Slack : ${slackUser.user?.real_name}`
    );
    console.log(`チケット: ${issue.issueKey} ${issue.summary}`);
    console.log(
      `URL: https://${Environments.BACKLOG_PROJECT_HOST}/view/${issue.issueKey}`
    );

    const section: object = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<https://${Environments.BACKLOG_PROJECT_HOST}/view/${issue.issueKey}|${issue.issueKey} ${issue.summary}>*\n担当者: ${issue.assignee?.name} <@${slackUser.user?.id}>\n開始予定日: ${startDate}\nステータス: ${issue.status.name}`,
      },
    };
    blocks.push(section);
  });

  return blocks;
}
