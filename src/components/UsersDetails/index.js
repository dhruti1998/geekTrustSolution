import {MdDelete} from 'react-icons/md'
import './index.css'

const UsersDetails = props => {
  const {eachUser, clickedDelete} = props
  const {id, name, email, role} = eachUser

  const onClickDelete = () => {
    clickedDelete(id)
  }

  return (
    <li className="li-element">
      <div className="person-details-container">
        <div className="each-detail">
          <p className="main-heading-style">Name : </p>
          <p className="data-style">{name}</p>
        </div>
        <div className="each-detail">
          <p className="main-heading-style">Email : </p>
          <p className="data-style">{email}</p>
        </div>
        <div className="each-detail">
          <p className="main-heading-style">Role : </p>
          <p className="data-style">{role}</p>
        </div>
      </div>
      <button type="button" className="delete-button">
        <MdDelete className="delete-icon" onClick={onClickDelete} />
      </button>
    </li>
  )
}

export default UsersDetails
