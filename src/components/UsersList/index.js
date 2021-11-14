import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import FailedView from '../FailedView'
import UsersDetails from '../UsersDetails'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class UsersList extends Component {
  state = {
    detailsList: [],
    apiStatus: apiStatusConstants.initial,
    inputValue: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  clickedDelete = id => {
    const {detailsList} = this.state
    const updatedList = detailsList.filter(eachUser => eachUser.id !== id)
    this.setState({detailsList: updatedList})
  }

  getSearchValue = event => {
    this.setState({inputValue: event.target.value})
    this.renderSuccessView()
  }

  renderSuccessView = () => {
    const {detailsList, inputValue} = this.state
    console.log(detailsList)
    const updatedList = detailsList.filter(
      eachUser =>
        eachUser.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        eachUser.role.toLowerCase().includes(inputValue.toLowerCase()) ||
        eachUser.email.toLowerCase().includes(inputValue.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <h1 className="main-heading">Users</h1>
        <input
          type="search"
          className="search-bar"
          placeholder="Search by Name, Email or Role"
          value={inputValue}
          onChange={this.getSearchValue}
        />
        <ul className="ul-list">
          {updatedList.map(eachItem => (
            <UsersDetails
              key={eachItem.id}
              eachUser={eachItem}
              clickedDelete={this.clickedDelete}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => (
    <div className="loading-view-container">
      <Loader type="TailSpin" color="#11BFFF" height={50} width={50} />
      <p className="loading-text">Loading</p>
    </div>
  )

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url =
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        detailsList: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UsersList
