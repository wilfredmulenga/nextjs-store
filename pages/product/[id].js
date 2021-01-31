import { useRouter } from 'next/router'
import {connect} from 'react-redux';
import Navbar from '../../components/Navbar'
import { convertPrice } from '../../helpers'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  imageWrapper: {
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'fill',
      borderRadius: '4px',
      boxShadow: '0px 18.025px 43.775px rgba(0, 0, 0, 0.25)'
    }
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 'bold'
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  description: {
    fontSize: '0.9rem'
  }
}))


const Product = ({ posts, currencyRates, baseCurrency }) => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()

  const selectedProduct =  posts && posts.find(product => product.id === Number(id))

  if(!selectedProduct) return(
    <div>
      <Navbar/>
      <p>Product not found.</p>
    </div>
  )
      const { image: imageUrl, description, price, title, category} = selectedProduct
  return(
    <div>
      <Navbar />
      <Grid container  style={{ width: '100%', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center', paddingBottom: '2%' }}>
        <Grid item sm={6} className={classes.imageWrapper}>
      <img src={imageUrl} alt={title} style={{ width: '400px', height: '300px' }}/>
        </Grid>
     <Grid item sm={5} className={classes.textWrapper}>
    <div>
    <p className={classes.title}>{title}</p>
     <p className={classes.description}>{description}</p>
    </div>
      <p className={classes.price}>{convertPrice({price, currencyRates, baseCurrency})}</p>
     </Grid>
    </Grid>
    </div>
  )
}

export default connect(state => state)(Product)