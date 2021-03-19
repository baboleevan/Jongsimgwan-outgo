import Container from '../components/Container'
import OutgoState from '../components/OutgoState'
import OutgoDday from '../components/OutgoDday'
import Footer from '../components/Footer'
import LogoutBtn from '../components/LogoutBtn'
import LoginInfo from '../components/LoginInfo'
import useSWR from 'swr'
import Card from '../components/Card'
import { useRouter } from 'next/router'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(r => r.json())
export default function Home () {
  const router = useRouter()
  const { data, error } = useSWR('/api/status', fetcher)

  if (!data) return <Container><Card>로딩중...</Card></Container>
  if (error) return <Container><span className="text-red">에러: {error}</span></Container>

  const { redirect, dday, reason, canGo, isGo, user, student } = data
  if (redirect) {
    router.push(redirect)
    return <Container><Card>로딩중...</Card></Container>
  }

  return (
    <Container>
      <OutgoDday dday={dday}/>
      <OutgoState reason={reason} canGo={canGo} isGo={isGo} student={student} dday={dday}/>
      <LoginInfo user={user} />
      <LogoutBtn />
      <div className="inline-block px-10 my-5 w-full">
        <Link href="/passwd">
          <button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">비밀번호 변경</button>
        </Link>
      </div>

      <Footer />
    </Container>
  )
}
