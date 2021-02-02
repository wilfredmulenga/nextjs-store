import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Select, MenuItem } from '@material-ui/core'
import {  METALLIC_SUNBURST } from '../src/colors'

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '50px',
    boxShadow: 'none'
  },
  title: {
    flexGrow: 1,
    color: METALLIC_SUNBURST
  }
 }))

const Navbar = ({ dispatch, baseCurrency }) => {
const classes = useStyles()
  
return(
    <AppBar position="static" className={classes.root} color='transparent'>
  <Toolbar variant="dense">
    <Typography className={classes.title} variant="h6">
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
}

export default connect(state => state)(Navbar)
