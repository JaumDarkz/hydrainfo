'use client'
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import { Sheet, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

type Props = {
  defaultOpen?: boolean,
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[],
  sidebarLogo: string,
  details: any,
  user: any,
  id: string
}

const MenuOptions = ({
  defaultOpen,
  subAccounts,
  sidebarOpt,
  sidebarLogo, 
  user,
  id
}: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const openState = useMemo(() => (
    defaultOpen ? {open: true} : {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) return

  return (
    <Sheet
      modal={false}
      {...openState}
    >
      <SheetTrigger asChild className='absolute left-4 top-4 z-[100] md:!hidden flex'>
        <Button variant='outline' size={'icon'}><Menu /></Button>
      </SheetTrigger>
    </Sheet>
  )
}

export default MenuOptions