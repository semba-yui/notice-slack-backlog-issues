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
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * GAS に登録した Script Properties を読み込むクラス.
 */
export class Environments {
  // ----------
  // Slack
  // ----------

  /**
   * Slack Bot Token.
   */
  static readonly SLACK_BOT_TOKEN: string = process.env.SLACK_BOT_TOKEN || '';

  /**
   * Slack Channel URL.
   */
  static readonly SLACK_CHANNEL_ID: string = process.env.SLACK_CHANNEL_ID || '';

  // ----------
  // Backlog
  // ----------

  /**
   * Backlog API Key
   */
  static readonly BACKLOG_API_KEY: string = process.env.BACKLOG_API_KEY || '';

  /**
   * Backlog Project ID.
   */
  static readonly BACKLOG_PROJECT_ID: string =
    process.env.BACKLOG_PROJECT_ID || '';

  /**
   * Backlog Project URL.
   */
  static readonly BACKLOG_PROJECT_HOST: string =
    process.env.BACKLOG_PROJECT_HOST || '';
}
