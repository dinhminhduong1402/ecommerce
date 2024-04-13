'use client'
import withAuth from "../../components/withAuth"

const ProfilePage = () => {

  return (
    <>
      <h1>Welcome profile page</h1>
      <div>ProfilePage</div>
    </>
  )
}

export default withAuth(ProfilePage)
