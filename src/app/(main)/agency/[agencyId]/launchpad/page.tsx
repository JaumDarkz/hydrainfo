import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/lib/db'
import { CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: {
    agencyId: string
  }
  searchParams: { code: string }
}

const LaunchpadPage = async ({params}: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId }
  })

  if (!agencyDetails) return

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card>
          <CardHeader>
            <CardTitle>Let&apos;s get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get yout account setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={'/appstore.png'}
                  alt="Image"
                  width={80}
                  height={80}
                  className="rounded"
                />
                <p>Save the website as a shortcut on your mobile device.</p>
              </div>
              <Button>Start</Button>
            </div>
          </CardContent>

          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={'/stripelogo.png'}
                  alt="Image"
                  width={80}
                  height={80}
                  className="rounded"
                />
                <p>Connect your Stripe account to accept payments and see your Dashboard.</p>
              </div>
              <Button>Start</Button>
            </div>
          </CardContent>

          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="Image"
                  width={80}
                  height={80}
                  className="rounded"
                />
                <p>Fill in all your business details.</p>
              </div>
              {allDetailsExist ? ( 
                <CheckCircleIcon size={50}  className='text-primary p-2 flex-shrink-0'/>) : (<Button><Link href={`/agency/${params.agencyId}/settings`}>Start</Link></Button>)
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LaunchpadPage
