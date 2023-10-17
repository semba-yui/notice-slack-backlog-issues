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
/**
 * 固定値クラス.
 */
export class GlobalConstants {
  /**
   * Slack API URL.
   */
  static readonly SLACK_API_URL: string = 'https://slack.com/api/';

  /**
   * Slack API post Message Path.
   *
   * @see https://api.slack.com/methods/chat.postMessage
   */
  static readonly SLACK_API_POST_MESSAGE_PATH: string = 'chat.postMessage';

  /**
   * Slack API lookup By Email Path.
   *
   * @see https://api.slack.com/methods/users.lookupByEmail
   */
  static readonly SLACK_API_LOOKUP_BY_EMAIL_PATH: string =
    'users.lookupByEmail';
}
