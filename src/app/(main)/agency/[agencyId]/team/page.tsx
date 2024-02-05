import { db } from "@/lib/db"

type Props = {
  params: {
    agencyId: string
  }
}

const TeamPage = async ({params}: Props) => {
  const authUser = await db.user.findMany({
    where: {Agency:{
      id:params.agencyId
    }},
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } }
    }
  })

  if (!authUser) return nullconst agencyDetails = await db.agency

  return (
    <div className=''>
      Team Page
    </div>
  )
}

export default TeamPage