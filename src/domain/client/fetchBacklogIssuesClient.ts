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
import * as backlogjs from 'backlog-js';
import { Environments } from '../../config/environments';
import { Issue } from 'backlog-js/dist/types/entity';

/**
 * Backlog の Issue List を取得する.
 * backlog-js のライブラリを利用すると node の一部機能読み込みエラーとなるため利用しない。
 *
 * @param statusIdList 課題のステータス
 * @param startDate 開始日
 */
export function fetchBacklogIssuesByStartDate(
  statusIdList: number[],
  startDate: dayjs.Dayjs
): Issue.Issue[] {
  let url: string = createBacklogUrl(statusIdList);
  url += `&startDateUntil=${startDate.format('YYYY-MM-DD')}`;

  return fetchIssues(url);
}

/**
 * Backlog の Issue List を取得する.
 * backlog-js のライブラリを利用すると node の一部機能読み込みエラーとなるため利用しない。
 *
 * @param statusIdList 課題のステータス
 * @param dueDate 期限日
 */
export function fetchBacklogIssuesByDueDate(
  statusIdList: number[],
  dueDate: dayjs.Dayjs
): Issue.Issue[] {
  let url: string = createBacklogUrl(statusIdList);
  url += `&dueDateUntil=${dueDate.format('YYYY-MM-DD')}`;

  return fetchIssues(url);
}

/**
 * Backlog の URL を生成する.
 *
 * @param statusIdList Status ID list
 * @returns Backlog の URL
 */
const createBacklogUrl = (statusIdList: number[]): string => {
  let urlText: string = `https://${Environments.BACKLOG_PROJECT_HOST}/api/v2/issues`;
  urlText += `?apiKey=${Environments.BACKLOG_API_KEY}`;
  urlText += `&projectId[]=${Environments.BACKLOG_PROJECT_ID}`;
  urlText += `&parentChild=${backlogjs.Option.Issue.ParentChildType.All.toString()}`;
  urlText += '&sort=assignee';
  statusIdList.forEach(
    statusId => (urlText += `&statusId[]=${statusId.toString()}`)
  );

  return urlText;
};

/**
 * backlog の課題一覧を取得する.
 *
 * @param url backlog URL to fetch
 * @returns 課題リスト
 */
const fetchIssues = (url: string): Issue.Issue[] => {
  console.info(`Endpoint: ${url}`);
  const response: GoogleAppsScript.URL_Fetch.HTTPResponse =
    UrlFetchApp.fetch(url);
  console.info(JSON.stringify(response.getContentText()));

  if (!response) {
    const msg: string = 'レスポンスが空です。';
    console.error(msg);
    throw new Error('ネットワークアクセス失敗');
  }

  return JSON.parse(response.getContentText());
};
