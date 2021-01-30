import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
 }))

const Navbar = ({ dispatch, baseCurrency }) => {
const classes = useStyles()
  
return(
    <AppBar position="static">
  <Toolbar variant="dense">
    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton> */}
    <Typography className={classes.title} variant="h6" color="inherit">
      Photos
    </Typography>
    <Select defaultValue={baseCurrency} name="currency" onChange={(event) => dispatch({ type: "UPDATE_BASE_CURRENCY", payload: event.target.value })}> 
      <MenuItem value="USD">USD</MenuItem>
      <MenuItem value="JPY">JPY</MenuItem>
      <MenuItem value="GBP">GBP</MenuItem>
      <MenuItem value="EUR">EUR</MenuItem>
    </Select>
  </Toolbar>
</AppBar>
  )

  // return (
  //   <div>
  //     <p>Nav</p>
  //     <select defaultValue={baseCurrency} name="currency" onChange={(event) => dispatch({ type: "UPDATE_BASE_CURRENCY", payload: event.target.value })}>
  //       <option value="USD">USD</option>
  //       <option value="JPY">JPY</option>
  //       <option value="GBP">GBP</option>
  //       <option value="EUR">EUR</option>
  //     </select>
  //   </div>
  // )
}

export default connect(state => state)(Navbar)
