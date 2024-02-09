'use client'
import SubAccountDetails from '@/components/forms/subaccount-details'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { db } from '@/lib/db'
import { getSubaccountButtonVer, getSubscriptionByAgency } from '@/lib/queries'
import { useModal } from '@/providers/modal-provider'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { boolean } from 'zod'

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[]
              SideBarOption: AgencySidebarOption[]
            })
        )
      | null
  }
  id: string
  className: string
}

const CreateSubaccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal()
  const agencyDetails = user.Agency
  const [disabled, setDisabled] = useState<boolean>(false)
  
  useEffect(() => {
    const checkSubaccountLimit = async () => {
      if (!agencyDetails) return;

      const isLimitReached = await getSubaccountButtonVer(agencyDetails.id);
      setDisabled(isLimitReached);
    };

    checkSubaccountLimit();
  }, [agencyDetails]);

  if (!agencyDetails) return

  return (
    <Button
      className={twMerge('w-full flex gap-4', className)}
      onClick={disabled === true ? () => toast({title: 'Upgrade Plan!', description: 'Upgrade to Pro so you can have more than 3 Sub Accounts.', variant:'destructive'}) :() => {
        setOpen(
          <CustomModal
            title="Create a Sub Account"
            subheading=""
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        )
      }}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  )
}

export default CreateSubaccountButton