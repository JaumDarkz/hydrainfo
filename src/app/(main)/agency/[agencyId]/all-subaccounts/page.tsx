import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { getAuthUserDetails } from '@/lib/queries'
import { SubAccount } from '@prisma/client'
import { AlertDialog } from '@radix-ui/react-alert-dialog'
import { CommandEmpty, CommandList } from 'cmdk'
import Link from 'next/link'

type Props = {
  params: { agencyId: string }
}

const AllSubAccountPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails()
  if (!user) return

  return (
    <AlertDialog>
      <div className="flex dlex-col">
        <Button>Create</Button>
        <Command className='rounded-lg bg-transparent'>
          <CommandInput placeholder='Search Account...' />
          <CommandList>
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandGroup heading='Sub Accoubts'>
              {!!user.Agency?.SubAccount.length ? user.Agency.SubAccount.map((subaccount: SubAccount) => (
                <CommandItem key={subaccount.id} className='h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all'>
                  <Link href={`/subaccount/${subaccount.id}`} className='rounded-md object-container bg-muted/50 p-4'>
                    <div className='relative w-32'>
                  
                    </div>
                  </Link>
                </CommandItem>
              ))
            : ''}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  )
}

export default AllSubAccountPage
