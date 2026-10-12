import {
  Badge,
  Button,
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Link, Route, Routes } from 'react-router-dom'

const CALL_FACTS = ['30 минут', 'Без регистрации', 'Без переписки']

function HomePage() {
  return (
    <main className="page-shell">
      <Container className="hero" size="md">
        <Stack align="center" gap="xl">
          <Stack align="center" gap="md" className="hero-copy">
            <Text className="product-name">Запись на звонок</Text>
            <Badge color="indigo" radius="xl" size="lg" variant="light">
              Простая онлайн-запись
            </Badge>
            <Title className="hero-title" order={1} ta="center">
              Выберите удобное время для звонка
            </Title>
            <Text c="dimmed" className="hero-description" size="xl" ta="center">
              Свободные 30-минутные интервалы, запись без регистрации и долгой
              переписки
            </Text>
          </Stack>

          <Button
            className="primary-action"
            component={Link}
            radius="xl"
            size="lg"
            to="/book"
          >
            Записаться
          </Button>

          <SimpleGrid
            className="call-facts"
            cols={{ base: 1, xs: 3 }}
            component="ul"
            spacing="md"
          >
            {CALL_FACTS.map((fact) => (
              <Paper component="li" key={fact} p="md" radius="lg" withBorder>
                <Text fw={600} ta="center">
                  {fact}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </main>
  )
}

type StatusPageProps = Readonly<{
  badge: string
  description: string
  title: string
}>

function StatusPage({ badge, description, title }: StatusPageProps) {
  return (
    <main className="page-shell">
      <Container size="xs" w="100%">
        <Paper className="status-card" p="xl" radius="xl" withBorder>
          <Stack align="center" gap="lg">
            <Text className="product-name">Запись на звонок</Text>
            <Badge color="indigo" radius="xl" variant="light">
              {badge}
            </Badge>
            <Title order={1} ta="center">
              {title}
            </Title>
            <Text c="dimmed" size="lg" ta="center">
              {description}
            </Text>
            <Button
              component={Link}
              radius="xl"
              size="md"
              to="/"
              variant="light"
            >
              На главную
            </Button>
          </Stack>
        </Paper>
      </Container>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route
        element={
          <StatusPage
            badge="Скоро"
            description="Мы готовим выбор свободного времени"
            title="Раздел записи скоро появится"
          />
        }
        path="/book"
      />
      <Route
        element={
          <StatusPage
            badge="404"
            description="Проверьте адрес или вернитесь на главную"
            title="Страница не найдена"
          />
        }
        path="*"
      />
    </Routes>
  )
}
