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
import { Environments } from '../../config/environments';

import { UsersLookupByEmailResponse } from '@slack/web-api';

/**
 * Slack User をメールアドレスで検索して取得する.
 *
 * 外部API への アクセス時にライブラリ（Bolt等） は利用しない。
 * @param email Slack 登録しているメールアドレス
 * @returns メールアドレスでヒットするユーザー
 */
export function fetchSlackUserByEmail(
  email: string
): UsersLookupByEmailResponse {
  const url: string = `https://slack.com/api/users.lookupByEmail?email=${email}`;
  const options = {
    headers: {
      Authorization: `Bearer ${Environments.SLACK_BOT_TOKEN}`,
    },
  };

  console.info(`Endpoint: ${url}`);
  const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(
    url,
    options
  );
  console.info(JSON.stringify(response.getContentText()));

  if (!response) {
    const msg: string = 'レスポンスが空です。';
    console.error(msg);
    throw new Error('ネットワークアクセス失敗');
  }

  return JSON.parse(response.getContentText());
}
