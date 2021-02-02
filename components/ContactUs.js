import { makeStyles } from '@material-ui/core/styles'
import { PLATINUM_GREY, SILVER_CHALICE } from '../src/colors'

const useStyles = makeStyles(() => ({
  root: { 
    display: 'flex',
     justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: SILVER_CHALICE
     },
     contactDetailsWrapper: {
       margin: '20px',
        width: '400px'
     },
     title: {
      color: PLATINUM_GREY,
       marginTop: 0,
       marginBottom: '10px',
       fontSize: '1.75rem'
     },
     subtitle: {
       fontSize: '1rem',
       color: PLATINUM_GREY
     },
     contact: {
      fontSize: '1.2rem',
      fontWeight: '400',
      margin: '10px',
      color: PLATINUM_GREY
     }
 }))

const ContactUs = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
   <div className={classes.contactDetailsWrapper}>
   <p className={classes.title}>Contact Us</p>
    <p className={classes.subtitle}>We would like to here from you </p>
    <p className={classes.contact}>Email: contact@musas.collection</p>
    <p className={classes.contact}>Phone: +260950003928</p>
   </div>
  </div>
  )
}

export default ContactUs