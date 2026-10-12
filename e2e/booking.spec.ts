import { expect, test } from '@playwright/test'

const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

test('Гость бронирует Слот, глобальный конфликт отклоняется, Владелец видит Бронирование', async ({
  page,
  request,
}) => {
  const suffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  const shortPublicId = `short-${suffix}`
  const longPublicId = `long-${suffix}`
  const shortName = `Знакомство ${suffix}`
  const email = `anna-${suffix}@example.com`
  const tomorrow = new Date()
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
  const tomorrowWeekday = weekdays[(tomorrow.getUTCDay() + 6) % 7]

  for (const eventType of [
    { publicId: shortPublicId, name: shortName, durationMinutes: 30 },
    {
      publicId: longPublicId,
      name: `Консультация ${suffix}`,
      durationMinutes: 60,
    },
  ]) {
    const response = await request.post('/api/manage/event-types', {
      data: eventType,
    })
    expect(response.status()).toBe(201)
  }

  const availabilityResponse = await request.put('/api/manage/availability', {
    data: {
      timeZone: 'Europe/Moscow',
      week: weekdays.map((weekday) => ({
        weekday,
        enabled: weekday === tomorrowWeekday,
        intervals:
          weekday === tomorrowWeekday ? [{ start: '09:00', end: '12:00' }] : [],
      })),
    },
  })
  expect(availabilityResponse.status()).toBe(200)

  const slotsResponse = await request.get(
    `/api/event-types/${shortPublicId}/slots?guestTimeZone=Europe%2FMoscow`,
  )
  expect(slotsResponse.status()).toBe(200)
  const slots = (await slotsResponse.json()) as {
    days: Array<{
      slots: Array<{
        guestLocalDate: string
        guestLocalStart: string
        startAt: string
      }>
    }>
  }
  const selected = slots.days
    .flatMap((day) => day.slots)
    .find((slot) => slot.guestLocalStart === '09:00')
  expect(selected).toBeDefined()

  if (selected === undefined) {
    throw new Error('Test setup did not produce the expected 09:00 slot')
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/book')
  await page.getByRole('link', { name: new RegExp(shortName) }).click()
  await page.getByLabel('Часовой пояс гостя').fill('Europe/Moscow')
  await page.getByRole('button', { name: 'Показать время в этой зоне' }).click()
  const selectedDay = page.locator('section').filter({
    has: page.getByRole('heading', { name: selected.guestLocalDate }),
  })
  const slotButton = selectedDay.getByRole('button', { name: /^09:00 / })
  await slotButton.focus()
  await slotButton.press('Enter')
  await page.getByLabel(/Имя/).fill('Анна')
  await page.getByLabel(/Email/).fill(email)
  await expect(page.getByText('Учебное демо без авторизации')).toBeVisible()
  await page.getByRole('button', { name: 'Подтвердить' }).click()

  await expect(
    page.getByRole('heading', { name: 'Бронирование подтверждено' }),
  ).toBeVisible()
  await expect(page).not.toHaveURL(/anna|example\.com/i)

  await page.goto(`/book/${shortPublicId}`)
  await page.getByLabel('Часовой пояс гостя').fill('Europe/Moscow')
  await page.getByRole('button', { name: 'Показать время в этой зоне' }).click()
  const refreshedDay = page.locator('section').filter({
    has: page.getByRole('heading', { name: selected.guestLocalDate }),
  })
  await expect(
    refreshedDay.getByRole('button', { name: /^09:00 / }),
  ).toHaveCount(0)

  const conflictResponse = await request.post('/api/bookings', {
    data: {
      eventTypePublicId: longPublicId,
      startAt: selected.startAt,
      guestName: 'Борис',
      guestEmail: `boris-${suffix}@example.com`,
      guestTimeZone: 'Europe/Moscow',
    },
    headers: { 'Idempotency-Key': crypto.randomUUID() },
  })
  expect(conflictResponse.status()).toBe(409)
  await expect(conflictResponse.json()).resolves.toMatchObject({
    code: 'slot_unavailable',
  })

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/manage/bookings')
  await expect(page.getByRole('heading', { name: shortName })).toBeVisible()
  await expect(page.getByText(email)).toBeVisible()
})
