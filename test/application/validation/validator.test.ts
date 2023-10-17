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
import timezone from 'dayjs/plugin/timezone';
import { assertIsHoliday } from '../../../src/application/validator/validator';

it.each([
  // 日曜日（休日）
  ['2023-10-01', 'Sun', true],
  // 月曜日（平日）
  ['2023-10-02', 'Mon', false],
  // 火曜日（平日）
  ['2023-10-03', 'Tue', false],
  // 水曜日（平日）
  ['2023-10-04', 'Wed', false],
  // 木曜日（平日）
  ['2023-10-05', 'Thu', false],
  // 金曜日（平日）
  ['2023-10-06', 'Fri', false],
  // 土曜日（休日）
  ['2023-10-07', 'Sat', true],
  // 日曜日（休日）
  ['2023-10-08', 'Sun', true],
  // 月曜日（祝日: スポーツの日）
  ['2023-10-09', 'Mon', true],
  // 火曜日（平日）
  ['2023-10-10', 'Tue', false],
])(
  '平日・休日の判定がなされていること',
  (inputTextDate: string, dayOfWeek: string, expected: boolean) => {
    // -------------------
    // Setup
    // -------------------
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Tokyo');
    const date = dayjs(inputTextDate);

    // -------------------
    // Exercise
    // -------------------
    const actual = assertIsHoliday(date);

    // -------------------
    // Verify
    // -------------------
    expect(date.format('ddd')).toBe(dayOfWeek);
    expect(actual).toBe(expected);
  }
);
