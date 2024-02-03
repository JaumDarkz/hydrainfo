const Page = ({params}: {params: { agencyId: string }}) => {
  return (
    <div className=''>
      {params.agencyId}
    </div>
  )
}

export default Page