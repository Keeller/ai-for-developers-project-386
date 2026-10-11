import { useEffect, useState } from 'react'

import {
  Badge,
  Center,
  Code,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'

type HealthResponse = {
  status: 'ok'
  service: string
}

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function checkApi() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Backend returned HTTP ${response.status}`)
        }

        setHealth((await response.json()) as HealthResponse)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Не удалось проверить backend',
          )
        }
      }
    }

    void checkApi()

    return () => controller.abort()
  }, [])

  const isLoading = health === null && error === null

  return (
    <Center component="main" className="app-shell">
      <Container size="sm" w="100%">
        <Stack gap="xl">
          <Stack gap="xs">
            <Badge variant="light" color="indigo" w="fit-content">
              Базовый каркас
            </Badge>
            <Title order={1}>Календарь звонков</Title>
            <Text c="dimmed" size="lg">
              Frontend и backend готовы к разработке сценариев встреч и
              бронирования.
            </Text>
          </Stack>

          <Paper withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <div>
                  <Text fw={600}>Состояние backend</Text>
                  <Text c="dimmed" size="sm">
                    <Code>/api/health</Code>
                  </Text>
                </div>

                {isLoading && <Loader size="sm" />}
                {health && (
                  <Badge color="teal" variant="light">
                    Доступен
                  </Badge>
                )}
                {error && (
                  <Badge color="red" variant="light">
                    Недоступен
                  </Badge>
                )}
              </Group>

              {health && (
                <Text size="sm">
                  Сервис <Code>{health.service}</Code> ответил успешно.
                </Text>
              )}
              {error && (
                <Text c="red" size="sm">
                  {error}
                </Text>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Center>
  )
}
