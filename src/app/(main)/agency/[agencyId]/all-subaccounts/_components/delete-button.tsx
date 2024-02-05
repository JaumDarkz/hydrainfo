'use client'

import { deleteSubAccount, getSubaccountDetails, saveActivityLogsNotification } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  subaccountId: string
}

function DeleteButton({subaccountId}: Props) {
  const router = useRouter()

  return (
    <div onClick={async () => {
        const response = await getSubaccountDetails(subaccountId)
        await saveActivityLogsNotification({agencyId: undefined, description:`Deleted a Sub Account | ${response?.name}`, subAccountId: subaccountId})
        await deleteSubAccount(subaccountId)
        router.refresh()
      }}
    >
      Delete Sub Account
    </div>
  )
}

export default DeleteButton