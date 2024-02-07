import BlurPage from '@/components/global/blur-page'

import React from 'react'

type Props = {
}

const PipelinesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <BlurPage>{children}</BlurPage>
    </div>
  )
}

export default PipelinesLayout
