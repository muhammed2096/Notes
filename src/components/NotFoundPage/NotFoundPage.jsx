import React from 'react'
import notFountImg from '../../Images/404-error.jpg'

function NotFoundPage() {
  return (
    <div className="notFound d-flex justify-content-center align-items-center pt-2">
      <img src={notFountImg} alt="404Error" />
    </div>
  )
}

export default NotFoundPage;