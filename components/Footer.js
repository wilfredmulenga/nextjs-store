import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: { 
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#07090F',
    height: '80px'
     }
 }))
const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
    <div>
      <p>Musa's collection</p>
    </div>
    <div>
    Facebook | Twitter | Instagram
    </div>
  </div>
  )
}

export default Footer