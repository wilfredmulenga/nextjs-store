import {connect} from 'react-redux';

const Navbar = ({ dispatch, baseCurrency }) => {
  return (
    <div>
      <p>Nav</p>
      <select defaultValue={baseCurrency} name="currency" onChange={(event) => dispatch({ type: "UPDATE_BASE_CURRENCY", payload: event.target.value })}>
        <option selected value="USD">USD</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  )
}

export default connect(state => state)(Navbar)
